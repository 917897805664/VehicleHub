import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerNavbar from "./OwnerNavbar";
import AddVehicle from "./AddVehicle";
import "./VehicleOwnerDashboard.css";

const summaryCards = [
  { label: "Total Earnings", value: "₹18,450", detail: "+12.5% vs last month" },
  { label: "Vehicles Listed", value: "15", detail: "All Vehicles" },
  { label: "Available Vehicles", value: "8", detail: "Ready to book" },
  { label: "Active Rentals", value: "6", detail: "Currently running" },
  { label: "Pending Requests", value: "12", detail: "Awaiting approval" },
];

const quickActions = [
  { key: "addVehicle", label: "Add Vehicle", color: "#10b981" },
  { key: "bookingRequests", label: "Booking Requests", color: "#6366f1" },
  { key: "addDriver", label: "Add Driver", color: "#f59e0b" },
  { key: "vehicleReturn", label: "Vehicle Return", color: "#14b8a6" },
  { key: "viewEarnings", label: "View Earnings", color: "#8b5cf6" },
  { key: "reports", label: "Reports", color: "#ef4444" },
];

const bookingRequests = [
  {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",
  },
  {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",
  },
  {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",

  },
   {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",

  },
   {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",

  },
   {
    CustomerName: "Rahul Sharma",
    BookingId: "#RW12345",
    vehicleName: "Hyundai i20",
    pickup: "18 May 2024, 10:00 AM",
    pickupLocation: "Pune",
    dropoff: "19 May 2024, 10:00 AM",
    dropoffLocation: "Mumbai",
    driverRequirements: "Yes",

  },
];



const myVehicles = [
  { name: "Hyundai i20", reg: "KA01AB1234", status: "Available", price: "₹1,499/day", image: "https://picsum.photos/seed/i20/300/200" },
  { name: "Honda Activa 6G", reg: "KA02CD5678", status: "Available", price: "₹299/day", image: "https://picsum.photos/seed/activa/300/200" },
  { name: "Tata Ace", reg: "KA03EF9012", status: "Booked", price: "₹2,999/day", image: "https://picsum.photos/seed/ace/300/200" },
  { name: "Maruti Swift", reg: "KA04GH3456", status: "Maintenance", price: "₹1,299/day", image: "https://picsum.photos/seed/swift/300/200" },
  { name: "Mahindra Thar", reg: "KA05IJ7890", status: "Available", price: "₹2,499/day", image: "https://picsum.photos/seed/thar/300/200" },
];



const notifications = [
  "New booking request for Hyundai i20",
  "Payment received for booking #RW12345",
  "Vehicle returned: Hyundai i20",
  "New review received from Rahul Sharma",
  "Document verification completed",
];



export default function VehicleOwnerDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="owner-dashboard-shell">
      <OwnerSidebar active={activeSection} onSelect={setActiveSection} onLogout={onLogout} />

      <div className="owner-dashboard-panel">
        <OwnerNavbar userName="Rahul Kumar" notificationCount={notifications.length} onAddVehicle={() => setActiveSection("addVehicle")} />

        <div className="owner-dashboard-body">
          {activeSection === "addVehicle" ? (
            <AddVehicle onBack={() => setActiveSection("dashboard")} />
          ) : (
            <>
              <div className="owner-dashboard-header">
                <div>
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
                    <button
                      key={action.key}
                      className="owner-action-pill"
                      style={{ background: action.color + "1a", color: action.color, borderColor: action.color + "33" }}
                      onClick={() => action.key === "addVehicle" && setActiveSection("addVehicle")}
                    >
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
                  <div>Booking ID</div>
                  <div>Customer</div>
                  <div>Vehicle</div>
                  <div>Pickup</div>
                  <div>Pickup Location</div>
                  <div>Dropoff</div>
                  <div>Dropoff Location</div>
                  <div>Driver Req.</div>
                  <div>Customer Profile</div>
                  <div>Action</div>
                </div>
                {bookingRequests.map((request) => (
                  <div key={request.BookingId} className="booking-row">
                    <div>{request.BookingId}</div>
                    <div>
                      <strong>{request.CustomerName}</strong>
                    </div>
                    <div>{request.vehicleName}</div>
                    <div>{request.pickup}</div>
                    <div>{request.pickupLocation}</div>
                    <div>{request.dropoff}</div>
                    <div>{request.dropoffLocation}</div>
                    <div>{request.driverRequirements}</div>
                    <div>
                      <button className="profile-button">View Profile</button>
                    </div>
                    <div className="booking-actions">
                      <button className="approve-button">Accept</button>
                      <button className="reject-button">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="owner-bottom-grid">
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
        </>
          )}
        </div>
      </div>
    </div>
  );
}
