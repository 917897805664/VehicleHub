import React from "react";
import profilePlaceholder from "./assets/profile_placeholder.svg";

export default function CustomerProfile() {
  const accountOverview = [
    { label: "Total Bookings", value: "12", icon: "📅", accent: "#22c55e" },
    { label: "Completed Trips", value: "8", icon: "✅", accent: "#22c55e" },
    { label: "Wishlist Vehicles", value: "5", icon: "❤", accent: "#f43f5e" },
    { label: "Member Since", value: "May 2024", icon: "⭐", accent: "#fbbf24" },
  ];

  const quickActions = [
    { title: "Change Password", subtitle: "Keep your account secure", icon: "🔒" },
    { title: "Notification Preferences", subtitle: "Manage what you receive", icon: "🔔" },
    { title: "Privacy Settings", subtitle: "Control your data", icon: "🛡️" },
  ];

  const personalInfo = [
    { label: "Full Name", value: "Rahul Kumar" },
    { label: "Email Address", value: "rahulkumar@gmail.com" },
    { label: "Phone Number", value: "+91 98765 43210"},
    { label: "Date of Birth", value: "15 May 1998" },
    { label: "City", value: "Bangalore, Karnataka" },
  ];

  const preferences = [
    { label: "Language", value: "English" },

  ];


  return (
    <div className="customer-profile-page">
      
      <div className="customer-profile-header">
        <button type="button" className="back-link ">
              ← Back
        </button>
        <div className="customer-profile-header-text">
          <h1>My Profile</h1>
          <p>View and manage your account information</p>
        </div>

        {/* <button type="button" className="customer-profile-edit-button">
          ✎ Edit Profile
        </button> */}
      </div>
      <hr/>
      <div className="customer-profile-layout">
        <div className="customer-profile-main-panel">
          <div className="customer-profile-summary-card">
            <div className="customer-profile-avatar-wrap">
              <img src={profilePlaceholder} alt="Rahul Kumar" />
            </div>
           
            <div className="customer-profile-identity">
              <div className="customer-profile-name-row">
                <h2>Rahul Kumar</h2>
                <span className="customer-profile-verified-badge">Verified</span>
              </div>

              <div className="customer-profile-contact-row">
                <span className="customer-profile-contact-icon">✉️</span>
                <span>rahulkumar@gmail.com</span>
              </div>

              <div className="customer-profile-contact-row">
                <span className="customer-profile-contact-icon">📞</span>
                <span>+91 98765 43210</span>
              </div>

              <p className="customer-profile-note">Happy to travel, explore and make new memories! 😄</p>
            </div>
          </div>
           
          <div className="customer-profile-section">
            <h3>Personal Information</h3>

            {personalInfo.map((item) => (
              <div key={item.label} className="customer-profile-row">
                <div className="customer-profile-row-label">
                  <span className="customer-profile-row-icon">
                    {item.label === "Full Name" ? "👤" : item.label === "Email Address" ? "✉️" : item.label === "Phone Number" ? "📞" : item.label === "Date of Birth" ? "📅" : "📍"}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="customer-profile-row-value-wrap">
                  <span className="customer-profile-row-value">{item.value}</span>
                  {item.verified && <span className="customer-profile-verified-small">Verified</span>}
                </div>

              </div>
            ))}
          </div>
          <button type="button" className="customer-profile-edit-button">
          ✎ Edit Profile
          </button>
          <div className="customer-profile-section">
            <h3>Preferences</h3>

            {preferences.map((item) => (
              <div key={item.label} className="customer-profile-row">
                <div className="customer-profile-row-label">
                  <span className="customer-profile-row-icon">
                    {item.label === "Language" ? "🌐" : "✉️"}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="customer-profile-row-value-wrap">
                  {item.toggle ? (
                    <>
                      <span className="customer-profile-row-value quiet-text">{item.value}</span>
                      <span className="customer-profile-toggle">
                        <span className="customer-profile-toggle-knob" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="customer-profile-row-value">{item.value}</span>
                      <span className="customer-profile-caret">⌄</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="customer-profile-sidebar-panel">
          <div className="customer-profile-sidebar-card">
            <h3>Account Overview</h3>

            {accountOverview.map((item) => (
              <div key={item.label} className="customer-profile-stat-row">
                <div className="customer-profile-stat-left">
                  <span className="customer-profile-stat-icon" style={{ background: `${item.accent}22`, color: item.accent }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="customer-profile-sidebar-card customer-profile-actions-card">
            <h3>Quick Actions</h3>

            {quickActions.map((item) => (
              <button type="button" key={item.title} className="customer-profile-action-row">
                <span className="customer-profile-action-icon">{item.icon}</span>
                <span className="customer-profile-action-copy">
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <span className="customer-profile-action-arrow">›</span>
              </button>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
