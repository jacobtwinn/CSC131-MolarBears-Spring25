import React, { useState, useEffect } from "react";
import "/src/CSS/UserInfo.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AccountDetails = () => {
  const { refreshUserInfo, userInfo } = useAuth();
  const [userDetails, setUserDetails] = useState({
    personalInfo: {
      name: 'Elias Employee',
      email: 'employee1.gmail.com',
      phone: '916-787-9582',
      userID: '545498419519',
      DOB: '6/15/1990',
      gender: 'Male',
      profilePicture: ''
    },
    mailingAddress: {
      street: "45 Davis St",
      apartment: "Apt 101",
      city: "Sacramento",
      state: "CA",
      zipCode: "94785",
      country: "United States",
    },
  });

  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    mailingAddress: false,
  });

  const handleEditToggle = (section) => {
    if (isEditing[section]) {
      // Save changes to server
      const payload = { ...userDetails[section] };
      const token = localStorage.getItem("jwtToken");
      axios.put(
        `http://localhost:5001/api/profile/${section === 'personalInfo' ? 'updatePersonal' : 'updateAddress'}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => refreshUserInfo())
      .catch(err => console.error(`Failed to update ${section}:`, err));
    }
    setIsEditing(prev => ({ ...prev, [section]: !prev[section] }));
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
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <input 
                type="text" 
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
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    updatePersonalInfo("profilePicture", imageUrl);

                    const formData = new FormData();
                    formData.append("profilePicture", file);

                    try {
                      const token = localStorage.getItem("jwtToken");
                      await axios.put("http://localhost:5001/api/profile/upload", formData, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });

                      await refreshUserInfo();
                    } catch (error) {
                      console.error("Failed to upload profile picture:", error);
                    }
                  }
                }}
              />
            </div>
          </>
        ) : (
          <>
            <p><strong>Name: </strong>{userDetails.personalInfo.name}</p>
            <p><strong>Email: </strong>{userDetails.personalInfo.email}</p>
            <p><strong>Phone: </strong>{userDetails.personalInfo.phone}</p>
            <p><strong>User ID: </strong>{userDetails.personalInfo.userID}</p>
            <p><strong>Gender: </strong>{userDetails.personalInfo.gender}</p>
            <p><strong>Date of Birth: </strong>{userDetails.personalInfo.DOB}</p>
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
            <p><strong>Street: </strong>{userDetails.mailingAddress.street}</p>
            <p><strong>Apt: </strong>{userDetails.mailingAddress.apartment}</p>
            <p><strong>Address: </strong>{`${userDetails.mailingAddress.city}, ${userDetails.mailingAddress.state} ${userDetails.mailingAddress.zipCode}`}</p>
            <p><strong>Country: </strong>{userDetails.mailingAddress.country}</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="account-details-container">
      <div className="header-with-picture">
        <img
          src={userInfo?.profilePicture || "/default-pfp.jpg"}
          alt="Profile"
          className="small-profile-picture"
        />
        <button
          className="change-photo-btn"
          onClick={() => document.getElementById("profilePicUpload").click()}
        >
          Change Photo
        </button>
        <input
          type="file"
          id="profilePicUpload"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              updatePersonalInfo("profilePicture", imageUrl);

              const formData = new FormData();
              formData.append("profilePicture", file);

              try {
                const token = localStorage.getItem("jwtToken");
                await axios.put(
                  "http://localhost:5001/api/profile/upload",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                await refreshUserInfo();
              } catch (error) {
                console.error("Failed to upload profile picture:", error);
              }
            }
          }}
        />
      </div>

      <h2 className="account-title">Account Details</h2>

      {renderPersonalInfoSection()}
      {renderMailingAddressSection()}
    </div>
  );
};

export default AccountDetails;
