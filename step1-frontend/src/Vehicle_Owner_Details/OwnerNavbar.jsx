import React from "react";
import profilePlaceholder from "../assets/profile_icon.jpg";
export default function OwnerNavbar({ userName, notificationCount = 0, onAddVehicle }) {
  return (
    <header className="owner-navbar">
      <div className="booking-brand">
            <div className="booking-brand-logo">🚗</div>
            <div>
              <div className="booking-brand-name">VehicleHub</div>
              <div className="booking-brand-subtitle">Book your next ride</div>
            </div>
        </div>
       <div className="topbar-search">
                <span>🔍</span>
                <input
                  type="text"
                  aria-label="Search vehicles"
                  placeholder="Search vehicles, bookings, customers..."
                />
        </div>
        <button type="button" className="topbar-search-button">
                Search
        </button>

      <div className="navbar-right">
        <button type="button" className="navbar-action-btn" onClick={onAddVehicle}>Add Vehicle</button>
           <div className="booking-topbar-actions">
                <button type="button" className="topbar-icon-button" aria-label="Notifications">
                      🔔
                </button>
                    <button type="button" className="topbar-avatar-button" aria-label="Profile">
                    <img src={profilePlaceholder} alt="Customer profile" />
                </button>
            </div>       
      </div>
    </header>
  );
}
