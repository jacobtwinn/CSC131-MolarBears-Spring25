import React, { useState } from 'react';
import '/src/CSS/UserInfo.css';

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(555) 123-4567',
      insurance: 'Allstate',
      userID: '1234567890',
      DOB: '01/01/1980',
      gender: 'Male',
      profilePicture: 'https://p0.pikist.com/photos/675/743/man-smile-portrait-men-adult-one-person-smiling-caucasian-ethnicity-males.jpg'
    },
    mailingAddress: {
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    paymentMethods: [
      {
        id: 1,
        type: 'Credit Card',
        cardType: 'Visa',
        lastFour: '4567',
        cardNumber: '4578124514574567',
        expiryDate: '12/2028',
        PIN: '114',
        isDefault: true
      },
      {
        id: 2,
        type: 'Debit Card',
        cardType: 'Mastercard',
        lastFour: '1234',
        cardNumber: '5123456789011234',
        expiryDate: '06/2026',
        PIN: '123',
        isDefault: false
      }
    ]
  });

  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    mailingAddress: false,
    paymentMethod: null
  });

  const deletePaymentMethod = (id) => {
    setUserDetails(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));
  
    // Reset edit mode if the deleted card was being edited
    if (isEditing.paymentMethod === id) {
      setIsEditing(prev => ({
        ...prev,
        paymentMethod: null
      }));
    }
  };
  
  const handleEditToggle = (section, paymentMethodId = null) => {
    if (section === 'paymentMethod') {
      if (isEditing.paymentMethod === paymentMethodId) {
        // Save mode — exiting edit, update lastFour
        const currentCard = userDetails.paymentMethods.find(m => m.id === paymentMethodId);
        const updatedLastFour = currentCard.cardNumber.slice(-4);
  
        setUserDetails(prev => ({
          ...prev,
          paymentMethods: prev.paymentMethods.map(method => 
            method.id === paymentMethodId 
              ? { ...method, lastFour: updatedLastFour }
              : method
          )
        }));
  
        setIsEditing(prev => ({
          ...prev,
          paymentMethod: null
        }));
      } else {
        // Enter edit mode
        setIsEditing(prev => ({
          ...prev,
          paymentMethod: paymentMethodId
        }));
      }
    } else {
      setIsEditing(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const updatePersonalInfo = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateMailingAddress = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      mailingAddress: {
        ...prev.mailingAddress,
        [field]: value
      }
    }));
  };

  const updatePaymentMethod = (id, field, value) => {
    setUserDetails(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => 
        method.id === id 
          ? { ...method, [field]: value }
          : method
      )
    }));
  };

  const setDefaultPaymentMethod = (id) => {
    setUserDetails(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    }));
  };
  const addNewPaymentMethod = () => {
    const newId = Date.now(); // simple unique ID
    const newCard = {
      id: newId,
      type: 'Credit Card',
      cardType: '',
      lastFour: '',
      cardNumber: '',
      pin: '',
      expiryDate: '',
      isDefault: false
    };
  
    setUserDetails(prev => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, newCard]
    }));
  
    setIsEditing(prev => ({
      ...prev,
      paymentMethod: newId
    }));
  };
  

  const renderPersonalInfoSection = () => (
    <div className="account-section">
      <div className="section-header">
        <h3>Personal Information</h3>
        <button 
          onClick={() => handleEditToggle('personalInfo')}
          className="edit-btn"
        >
          {isEditing.personalInfo ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="section-content">
        {isEditing.personalInfo ? (
          <>
            <div className="input-group">
              <label>Name: First Last</label>
              <input 
                type="text" 
                value={userDetails.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                value={userDetails.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <input 
                type="gender" 
                value={userDetails.personalInfo.gender}
                onChange={(e) => updatePersonalInfo('gender', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input 
                type="tel" 
                value={userDetails.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Insurance</label>
              <input 
                type="text" 
                value={userDetails.personalInfo.insurance}
                onChange={(e) => updatePersonalInfo('insurance', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>User ID</label>
              <input 
                type="text" 
                value={userDetails.personalInfo.userID}
                onChange={(e) => updatePersonalInfo('userID', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Date of Birth</label>
              <input 
                type="text" 
                value={userDetails.personalInfo.DOB}
                onChange={(e) => updatePersonalInfo('DOB', e.target.value)}
              />
            </div>
            <div className="input-group">
            <label>Upload Profile Picture</label>
              <input 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  updatePersonalInfo('profilePicture', imageUrl);
                }
              }}
              />
            </div>
          </>
        ) : (
          <>
            <p><strong>Name: </strong>{userDetails.personalInfo.name}</p>
            <p><strong>E-mail: </strong>{userDetails.personalInfo.email}</p>
            <p><strong>Phone Number: </strong>{userDetails.personalInfo.phone}</p>
            <p><strong>Insurance: </strong> {userDetails.personalInfo.insurance}</p>
            <p><strong>User ID: </strong> {userDetails.personalInfo.userID}</p>
            <p><strong>Gender: </strong> {userDetails.personalInfo.gender}</p>
            <p><strong>Date of Birth: </strong> {userDetails.personalInfo.DOB}</p>
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
          onClick={() => handleEditToggle('mailingAddress')}
          className="edit-btn"
        >
          {isEditing.mailingAddress ? 'Save' : 'Edit'}
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
                onChange={(e) => updateMailingAddress('street', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Apartment</label>
              <input 
                type="text" 
                value={userDetails.mailingAddress.apartment}
                onChange={(e) => updateMailingAddress('apartment', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>City</label>
              <input 
                type="text" 
                value={userDetails.mailingAddress.city}
                onChange={(e) => updateMailingAddress('city', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>State</label>
              <input 
                type="text" 
                value={userDetails.mailingAddress.state}
                onChange={(e) => updateMailingAddress('state', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Zip Code</label>
              <input 
                type="text" 
                value={userDetails.mailingAddress.zipCode}
                onChange={(e) => updateMailingAddress('zipCode', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Country</label>
              <input 
                type="text" 
                value={userDetails.mailingAddress.country}
                onChange={(e) => updateMailingAddress('country', e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p><strong>Street: </strong>{userDetails.mailingAddress.street}</p>
            <p><strong>Apt: </strong>{userDetails.mailingAddress.apartment}</p>
            <p><strong>Address: </strong>{`${userDetails.mailingAddress.city}, ${userDetails.mailingAddress.state} ${userDetails.mailingAddress.zipCode}`}</p>
            <p><strong>Country: </strong>{userDetails.mailingAddress.country}</p>
          </>
        )}
      </div>
    </div>
  );

  const renderPaymentMethodsSection = () => (
    <div className="account-section">
      <div className="section-header">
        <h3>Payment Methods</h3>
        <button className="add-btn" onClick={addNewPaymentMethod}>+ Add New Card</button>
      </div>
      {userDetails.paymentMethods.map(method => (
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
                  onChange={(e) => updatePaymentMethod(method.id, 'cardType', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Expiry Date</label>
                <input 
                  type="text" 
                  value={method.expiryDate}
                  onChange={(e) => updatePaymentMethod(method.id, 'expiryDate', e.target.value)}
                />
              </div>
              <div className="input-group">
              <label>Card Number</label>
                <input 
                  type="text" 
                  value={method.cardNumber}
                  onChange={(e) => updatePaymentMethod(method.id, 'cardNumber', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>PIN</label>
                <input 
                  type="password" 
                  value={method.PIN}
                  onChange={(e) => updatePaymentMethod(method.id, 'pin', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="payment-method-details">
              <p>Card Number: •••• •••• •••• {method.lastFour}</p>
              <p>Expires: {method.expiryDate}</p>
              <p>PIN: •••</p>
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
            <button onClick={() => handleEditToggle('paymentMethod', method.id)}
              className="edit-btn">
              {isEditing.paymentMethod === method.id ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deletePaymentMethod(method.id)}
              className="delete-btn" >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="account-details-container">
      <div className="header-with-picture">
        <img 
          src={userDetails.personalInfo.profilePicture} 
          alt="Profile" 
          className="small-profile-picture"
        />
        <h2>Account Details</h2>
        <title>Account Details</title>
      </div>
      {renderPersonalInfoSection()}
      {renderMailingAddressSection()}
      {renderPaymentMethodsSection()}
    </div>
  );
  
};

export default AccountDetails;