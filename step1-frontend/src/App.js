import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import CustomerDashboard from "./CustomerDashboard";
import VehicleOwnerDashboard from "./Vehicle_Owner_Details/VehicleOwnerDashboard";
import ViewVehicleDetails from "./ViewVehicleDetails";
import BookingDetails from "./BookingDetails";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [pendingBookingRedirect, setPendingBookingRedirect] = useState(false);
  const [bookingReferrer, setBookingReferrer] = useState(null);
  const [loggedInOwner, setLoggedInOwner] = useState(null);
  const [showDashboardVehicleDetails, setShowDashboardVehicleDetails] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({
    name: "Hyundai i20",
    fuel: "Petrol",
    transmission: "Manual",
    seats: "5 Seater",
    priceDay: "₹1499",
    priceWeek: "₹8999",
    priceMonth: "₹29999",
    rating: "4.5",
    reviews: 126,
    distance: "1.2 km away",
    owner: {
      name: "Amit Sharma",
      rating: "4.7",
      reviews: 89,
      joined: "Jan 2022",
      phone: "+91 98765 43210",
      email: "amit.sharma@example.com",
    },
  });

  const handleLoginSuccess = (role, loggedUser) => {
    if (role === "customer") {
      setIsCustomerLoggedIn(true);
      setIsOwnerLoggedIn(false);
      setLoggedInOwner(null);

      if (pendingBookingRedirect) {
        setPendingBookingRedirect(false);
        setShowDashboardVehicleDetails(true);
        setCurrentPage("dashboard");
      } else {
        setCurrentPage("dashboard");
      }
      return;
    }

    if (role === "vehicleOwner") {
      setLoggedInOwner(loggedUser || null);
      setIsOwnerLoggedIn(true);
      setIsCustomerLoggedIn(false);
      setCurrentPage("ownerDashboard");
    }
  };

  const handleLogout = () => {
    setIsCustomerLoggedIn(false);
    setIsOwnerLoggedIn(false);
    setLoggedInOwner(null);
    setPendingBookingRedirect(false);
    setShowDashboardVehicleDetails(false);
    setSelectedRole("customer");
    setCurrentPage("landing");
  };

  const handleViewDetails = (vehicleData) => {
    if (vehicleData) {
      setSelectedVehicle(vehicleData);
    }
    setCurrentPage("vehicleDetails");
  };

  const [showLandingInline, setShowLandingInline] = useState(false);

  const handleLandingView = (vehicleData) => {
    if (vehicleData) setSelectedVehicle(vehicleData);
    setShowLandingInline(true);
  };

  if (currentPage === "login") {
    return (
      <Login
        role={selectedRole}
        onLoginSuccess={handleLoginSuccess}
        onRoleChange={setSelectedRole}
        onRegisterClick={() => setCurrentPage("register")}
        onForgotPasswordClick={() => setCurrentPage("forgot")}
        onLandingClick={() => setCurrentPage("landing")}
      />
    );
  }

  if (currentPage === "forgot") {
    return <ForgotPassword role={selectedRole} onBackToLogin={() => setCurrentPage("login")} />;
  }

  if (currentPage === "register") {
    return (
      <Register
        role={selectedRole}
        onRoleChange={setSelectedRole}
        onLoginClick={() => setCurrentPage("login")}
        onLandingClick={() => setCurrentPage("landing")}
      />
    );
  }

  const handleBookVehicle = () => {
    setShowLandingInline(false);
    setBookingReferrer(currentPage);

    if (isCustomerLoggedIn) {
      setShowDashboardVehicleDetails(true);
      setCurrentPage("dashboard");
      return;
    }

    setPendingBookingRedirect(true);
    setCurrentPage("login");
  };

  if (currentPage === "vehicleDetails") {
    return (
      <ViewVehicleDetails
        vehicle={selectedVehicle}
        onBack={() => setCurrentPage("landing")}
        onBookVehicle={handleBookVehicle}
      />
    );
  }

  if (currentPage === "bookingDetails") {
    return (
      <BookingDetails
        onBack={(step) => {
          if (bookingReferrer === "vehicleDetails") {
            setCurrentPage("vehicleDetails");
            return;
          }

          if (bookingReferrer === "landing") {
            setCurrentPage("landing");
            setShowLandingInline(true);
            return;
          }

          setCurrentPage("dashboard");
        }}
      />
    );
  }

  if (currentPage === "dashboard" && isCustomerLoggedIn) {
    return (
      <CustomerDashboard
        onLogout={handleLogout}
        onViewDetails={handleViewDetails}
        onBookVehicle={handleBookVehicle}
        initialShowVehicleDetails={showDashboardVehicleDetails}
        initialVehicle={selectedVehicle}
        onVehicleDetailsClosed={() => setShowDashboardVehicleDetails(false)}
      />
    );
  }

  if (currentPage === "ownerDashboard" && isOwnerLoggedIn) {
    return <VehicleOwnerDashboard owner={loggedInOwner} onLogout={handleLogout} />;
  }

  return (
    <>
      <LandingPage
        onLoginClick={() => setCurrentPage("login")}
        onRegisterClick={() => {
          setSelectedRole("customer");
          setCurrentPage("register");
        }}
        onViewDetailsClick={handleLandingView}
        showVehicleDetails={showLandingInline && Boolean(selectedVehicle)}
        selectedVehicle={selectedVehicle}
        onBackFromVehicleDetails={() => setShowLandingInline(false)}
        onBookVehicle={handleBookVehicle}
      />
    </>
  );
}

export default App;