import React from "react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "myVehicles", label: "My Vehicles", icon: "🚗" },
  { key: "addVehicle", label: "Add Vehicle", icon: "➕" },
  { key: "bookingRequests", label: "Booking Requests", icon: "📥" },
  { key: "activeRentals", label: "Active Rentals", icon: "📝" },
  { key: "driverManagement", label: "Driver Management", icon: "🧑‍✈️" },
  { key: "customers", label: "Customers", icon: "👥" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "paymentHistory", label: "Payment History", icon: "💳" },
  { key: "reviews", label: "Reviews & Ratings", icon: "⭐" },
  { key: "notifications", label: "Notifications", icon: "🔔" },
  { key: "reports", label: "Reports & Analytics", icon: "📊" },
  { key: "settings", label: "Profile & Settings", icon: "⚙️" },
  { key: "help", label: "Help Center", icon: "❓" },
];

export default function OwnerSidebar({ active = "dashboard", onSelect = () => {}, onLogout }) {
  return (
    <aside className="owner-sidebar">
      <div className="owner-sidebar-brand">
        <div className="owner-logo">VH</div>
        <div>
          <div className="owner-brand-title">VehicleHub</div>
          <div className="owner-brand-subtitle">Owner Dashboard</div>
        </div>
      </div>


      <div className="owner-sidebar-nav-wrapper">
        <nav className="owner-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={"owner-sidebar-item" + (item.key === active ? " active" : "")}
              onClick={() => onSelect(item.key)}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="owner-sidebar-footer">
        <div>
          <div className="footer-title">Grow Your Business</div>
          <div className="footer-text">List more vehicles and earn more with RentWheels.</div>
        </div>
        <button className="footer-button" onClick={() => onSelect("addVehicle")}>Add Vehicle Now</button>
      </div>

      <button className="owner-sidebar-logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}
