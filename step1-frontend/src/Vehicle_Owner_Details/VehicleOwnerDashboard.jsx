import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerNavbar from "./OwnerNavbar";
import "./VehicleOwnerDashboard.css";

const summaryCards = [
  { label: "Total Earnings", value: "₹18,450", detail: "+12.5% vs last month" },
  { label: "Vehicles Listed", value: "15", detail: "All Vehicles" },
  { label: "Available Vehicles", value: "8", detail: "Ready to book" },
  { label: "Active Rentals", value: "6", detail: "Currently running" },
  { label: "Pending Requests", value: "12", detail: "Awaiting approval" },
];

const quickActions = [
  { label: "Add Vehicle", color: "#10b981" },
  { label: "Booking Requests", color: "#6366f1" },
  { label: "Add Driver", color: "#f59e0b" },
  { label: "Vehicle Return", color: "#14b8a6" },
  { label: "View Earnings", color: "#8b5cf6" },
  { label: "Reports", color: "#ef4444" },
];

const bookingRequests = [
  {
    customer: "Rahul Sharma",
    id: "#RW12345",
    vehicle: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    dropoff: "19 May 2024, 10:00 AM",
    amount: "₹1,499",
    status: "Pending",
  },
  {
    customer: "Aman Verma",
    id: "#RW12347",
    vehicle: "Honda Activa 6G",
    pickup: "18 May 2024, 09:00 AM",
    dropoff: "18 May 2024, 07:00 PM",
    amount: "₹299",
    status: "Pending",
  },
  {
    customer: "Sneha Patil",
    id: "#RW12349",
    vehicle: "Tata Ace",
    pickup: "18 May 2024, 11:00 AM",
    dropoff: "20 May 2024, 11:00 AM",
    amount: "₹2,999",
    status: "Pending",
  },
];

const activeRentals = [
  {
    vehicle: "Hyundai i20",
    registration: "KA01AB1234",
    customer: "Rahul Sharma",
    driver: "Mahesh Patil",
    pickup: "18 May 2024, 10:00 AM, Pune",
    dropoff: "19 May 2024, 10:00 AM, Mumbai",
    remaining: "16h 25m",
    amount: "₹1,499",
  },
];

const myVehicles = [
  { name: "Hyundai i20", reg: "KA01AB1234", status: "Available", price: "₹1,499/day", image: "https://picsum.photos/seed/i20/300/200" },
  { name: "Honda Activa 6G", reg: "KA02CD5678", status: "Available", price: "₹299/day", image: "https://picsum.photos/seed/activa/300/200" },
  { name: "Tata Ace", reg: "KA03EF9012", status: "Booked", price: "₹2,999/day", image: "https://picsum.photos/seed/ace/300/200" },
  { name: "Maruti Swift", reg: "KA04GH3456", status: "Maintenance", price: "₹1,299/day", image: "https://picsum.photos/seed/swift/300/200" },
  { name: "Mahindra Thar", reg: "KA05IJ7890", status: "Available", price: "₹2,499/day", image: "https://picsum.photos/seed/thar/300/200" },
];

const earningsBreakdown = [
  { label: "Rental Income", amount: "₹14,850", color: "#10b981" },
  { label: "Driver Charges", amount: "₹2,100", color: "#3b82f6" },
  { label: "Delivery Charges", amount: "₹850", color: "#f59e0b" },
  { label: "Other Charges", amount: "₹650", color: "#ef4444" },
];

const notifications = [
  "New booking request for Hyundai i20",
  "Payment received for booking #RW12345",
  "Vehicle returned: Hyundai i20",
  "New review received from Rahul Sharma",
  "Document verification completed",
];

const reviews = [
  { name: "Rahul Sharma", vehicle: "Hyundai i20", review: "Excellent service and well maintained vehicle.", rating: 5 },
  { name: "Aman Verma", vehicle: "Honda Activa 6G", review: "Good experience. On-time delivery.", rating: 5 },
  { name: "Sneha Patil", vehicle: "Tata Ace", review: "Very helpful owner and nice service.", rating: 5 },
];

export default function VehicleOwnerDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="owner-dashboard-shell">
      <OwnerSidebar active={activeSection} onSelect={setActiveSection} onLogout={onLogout} />

      <div className="owner-dashboard-panel">
        <OwnerNavbar userName="Rahul Kumar" notificationCount={notifications.length} />

        <div className="owner-dashboard-body">
          <div className="owner-dashboard-header">
            <div>
              <p className="owner-dashboard-welcome">Owner Dashboard</p>
              <h2 className="owner-dashboard-title">Welcome back, Rahul.</h2>
              <p className="owner-dashboard-subtitle">Manage vehicles, bookings, earnings, and customer requests from one place.</p>
            </div>
            <div className="owner-dashboard-header-badge">Owner</div>
          </div>

          <div className="owner-summary-grid">
            {summaryCards.map((card) => (
              <div key={card.label} className="owner-summary-card">
                <div className="summary-card-label">{card.label}</div>
                <div className="summary-card-value">{card.value}</div>
                <div className="summary-card-detail">{card.detail}</div>
              </div>
            ))}
          </div>

          <section className="owner-quick-actions-section">
            <h3 className="section-heading">Quick Actions</h3>
            <div className="owner-quick-actions">
              {quickActions.map((action) => (
                <button key={action.label} className="owner-action-pill" style={{ background: action.color + "1a", color: action.color, borderColor: action.color + "33" }}>
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <div className="owner-workspace-grid">
            <section className="owner-booking-panel">
              <div className="panel-header">
                <div>
                  <h3>Booking Requests</h3>
                  <p>Recent booking requests that need your approval.</p>
                </div>
                <button className="owner-primary-button">View All Requests</button>
              </div>

              <div className="booking-table">
                <div className="booking-row booking-row-head">
                  <div>Customer</div>
                  <div>Vehicle</div>
                  <div>Pickup</div>
                  <div>Return</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>
                {bookingRequests.map((request) => (
                  <div key={request.id} className="booking-row">
                    <div>
                      <strong>{request.customer}</strong>
                      <div className="booking-row-id">{request.id}</div>
                    </div>
                    <div>{request.vehicle}</div>
                    <div>{request.pickup}</div>
                    <div>{request.dropoff}</div>
                    <div>{request.amount}</div>
                    <div>
                      <span className="status-pill status-pending">{request.status}</span>
                    </div>
                    <div className="booking-actions">
                      <button className="approve-button">Accept</button>
                      <button className="reject-button">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="owner-right-panel">
              <div className="panel-card earnings-overview-card">
                <div className="panel-card-header">
                  <div>
                    <p className="panel-card-label">Earnings Overview</p>
                    <h3 className="panel-card-title">₹18,450.00</h3>
                  </div>
                  <div className="panel-card-highlight">This Month</div>
                </div>
                <div className="panel-chart-placeholder"> </div>
                <div className="earnings-breakdown">
                  {earningsBreakdown.map((item) => (
                    <div key={item.label} className="earning-row">
                      <span>{item.label}</span>
                      <span className="earning-amount">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-card notifications-card">
                <div className="panel-card-header">
                  <h3>Notifications</h3>
                  <button className="view-all-link">View All</button>
                </div>
                <div className="notification-list">
                  {notifications.map((note, index) => (
                    <div key={index} className="notification-item">
                      <span className="notification-dot"></span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-card reviews-card">
                <div className="panel-card-header">
                  <h3>Recent Reviews</h3>
                  <button className="view-all-link">View All</button>
                </div>
                <div className="review-list">
                  {reviews.map((item) => (
                    <div key={item.name} className="review-item">
                      <div className="review-item-header">
                        <div>
                          <strong>{item.name}</strong>
                          <div className="review-meta">{item.vehicle}</div>
                        </div>
                        <div className="review-rating">{item.rating} ★</div>
                      </div>
                      <p>{item.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="owner-bottom-grid">
            <section className="panel-card active-rentals-card">
              <div className="panel-card-header">
                <h3>Active Rentals</h3>
                <button className="view-all-link">Manage Rentals</button>
              </div>
              {activeRentals.map((rental) => (
                <div key={rental.vehicle} className="active-rental-item">
                  <div className="active-rental-main">
                    <div>
                      <strong>{rental.vehicle}</strong>
                      <p>{rental.registration}</p>
                    </div>
                    <div className="active-rental-status">Remaining {rental.remaining}</div>
                  </div>
                  <div className="active-rental-row">
                    <span>{rental.customer}</span>
                    <span>{rental.driver}</span>
                    <span>{rental.amount}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="panel-card my-vehicles-card">
              <div className="panel-card-header">
                <h3>My Vehicles</h3>
                <button className="view-all-link">View Fleet</button>
              </div>
              <div className="vehicle-grid">
                {myVehicles.map((vehicle) => (
                  <div key={vehicle.name} className="vehicle-card">
                    <img src={vehicle.image} alt={vehicle.name} className="vehicle-card-image" />
                    <div className="vehicle-card-body">
                      <div className="vehicle-card-title">{vehicle.name}</div>
                      <div className="vehicle-card-meta">{vehicle.reg}</div>
                      <div className="vehicle-card-detail">{vehicle.price} · {vehicle.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
