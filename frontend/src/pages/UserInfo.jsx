import React, { useState } from "react";
import "/src/CSS/UserInfo.css";

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    personalInfo: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "(555) 123-4567",
    },
    mailingAddress: {
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "Anytown",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    paymentMethods: [
      {
        id: 1,
        type: "Credit Card",
        cardType: "Visa",
        lastFour: "4567",
        expiryDate: "12/2028",
        isDefault: true,
      },
      {
        id: 2,
        type: "Debit Card",
        cardType: "Mastercard",
        lastFour: "1234",
        expiryDate: "06/2026",
        isDefault: false,
      },
    ],
  });

  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    mailingAddress: false,
    paymentMethod: null,
  });

  const handleEditToggle = (section, paymentMethodId = null) => {
    if (section === "paymentMethod") {
      if (isEditing.paymentMethod === paymentMethodId) {
        setIsEditing((prev) => ({
          ...prev,
          paymentMethod: null,
        }));
      } else {
        setIsEditing((prev) => ({
          ...prev,
          paymentMethod: paymentMethodId,
        }));
      }
    } else {
      setIsEditing((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  const updatePersonalInfo = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateMailingAddress = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      mailingAddress: {
        ...prev.mailingAddress,
        [field]: value,
      },
    }));
  };

  const updatePaymentMethod = (id, field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method) =>
        method.id === id ? { ...method, [field]: value } : method,
      ),
    }));
  };

  const setDefaultPaymentMethod = (id) => {
    setUserDetails((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    }));
  };

  const renderPersonalInfoSection = () => (
    <div className="account-section">
      <div className="section-header">
        <h3>Personal Information</h3>
        <button
          onClick={() => handleEditToggle("personalInfo")}
          className="edit-btn"
        >
          {isEditing.personalInfo ? "Save" : "Edit"}
        </button>
      </div>
      <div className="section-content">
        {isEditing.personalInfo ? (
          <>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={userDetails.personalInfo.name}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={userDetails.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input
                type="tel"
                value={userDetails.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p>{userDetails.personalInfo.name}</p>
            <p>{userDetails.personalInfo.email}</p>
            <p>{userDetails.personalInfo.phone}</p>
          </>
        )}
      </div>
    </div>
  );

  const renderMailingAddressSection = () => (
    <div className="account-section">
      <div className="section-header">
        <h3>Mailing Address</h3>
        <button
          onClick={() => handleEditToggle("mailingAddress")}
          className="edit-btn"
        >
          {isEditing.mailingAddress ? "Save" : "Edit"}
        </button>
      </div>
      <div className="section-content">
        {isEditing.mailingAddress ? (
          <>
            <div className="input-group">
              <label>Street</label>
              <input
                type="text"
                value={userDetails.mailingAddress.street}
                onChange={(e) => updateMailingAddress("street", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Apartment</label>
              <input
                type="text"
                value={userDetails.mailingAddress.apartment}
                onChange={(e) =>
                  updateMailingAddress("apartment", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                value={userDetails.mailingAddress.city}
                onChange={(e) => updateMailingAddress("city", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>State</label>
              <input
                type="text"
                value={userDetails.mailingAddress.state}
                onChange={(e) => updateMailingAddress("state", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Zip Code</label>
              <input
                type="text"
                value={userDetails.mailingAddress.zipCode}
                onChange={(e) =>
                  updateMailingAddress("zipCode", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                value={userDetails.mailingAddress.country}
                onChange={(e) =>
                  updateMailingAddress("country", e.target.value)
                }
              />
            </div>
          </>
        ) : (
          <>
            <p>{userDetails.mailingAddress.street}</p>
            <p>{userDetails.mailingAddress.apartment}</p>
            <p>{`${userDetails.mailingAddress.city}, ${userDetails.mailingAddress.state} ${userDetails.mailingAddress.zipCode}`}</p>
            <p>{userDetails.mailingAddress.country}</p>
          </>
        )}
      </div>
    </div>
  );

  const renderPaymentMethodsSection = () => (
    <div className="account-section">
      <div className="section-header">
        <h3>Payment Methods</h3>
        <button className="add-btn">+ Add New Card</button>
      </div>
      {userDetails.paymentMethods.map((method) => (
        <div key={method.id} className="payment-method">
          <div className="payment-method-header">
            <span className="card-type">{method.cardType}</span>
            {method.isDefault && <span className="default-badge">Default</span>}
          </div>
          {isEditing.paymentMethod === method.id ? (
            <div className="payment-method-edit">
              <div className="input-group">
                <label>Card Type</label>
                <input
                  type="text"
                  value={method.cardType}
                  onChange={(e) =>
                    updatePaymentMethod(method.id, "cardType", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label>Last Four Digits</label>
                <input
                  type="text"
                  value={method.lastFour}
                  onChange={(e) =>
                    updatePaymentMethod(method.id, "lastFour", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  value={method.expiryDate}
                  onChange={(e) =>
                    updatePaymentMethod(method.id, "expiryDate", e.target.value)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="payment-method-details">
              <p>**** **** **** {method.lastFour}</p>
              <p>Expires: {method.expiryDate}</p>
            </div>
          )}
          <div className="payment-method-actions">
            {!method.isDefault && (
              <button
                onClick={() => setDefaultPaymentMethod(method.id)}
                className="set-default-btn"
              >
                Set as Default
              </button>
            )}
            <button
              onClick={() => handleEditToggle("paymentMethod", method.id)}
              className="edit-btn"
            >
              {isEditing.paymentMethod === method.id ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="account-details-container">
      <title>Account Information</title>
      <h2>Account Details</h2>
      {renderPersonalInfoSection()}
      {renderMailingAddressSection()}
      {renderPaymentMethodsSection()}
    </div>
  );
};

export default AccountDetails;
