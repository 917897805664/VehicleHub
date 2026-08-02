import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import CustomerDashboard from "./CustomerDashboard";
import ViewVehicleDetails from "./ViewVehicleDetails";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [selectedVehicle] = useState({
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

  const handleLoginSuccess = (role) => {
    if (role === "customer") {
      setIsCustomerLoggedIn(true);
      setCurrentPage("dashboard");
    }
  };

  const handleLogout = () => {
    setIsCustomerLoggedIn(false);
    setSelectedRole("customer");
    setCurrentPage("landing");
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

  if (currentPage === "vehicleDetails") {
    return (
      <ViewVehicleDetails
        vehicle={selectedVehicle}
        onBack={() => setCurrentPage("landing")}
        onLoginClick={() => setCurrentPage("login")}
        onRegisterClick={() => {
          setSelectedRole("customer");
          setCurrentPage("register");
        }}
      />
    );
  }

  if (currentPage === "dashboard" && isCustomerLoggedIn) {
    return <CustomerDashboard onLogout={handleLogout} onViewDetails={() => setCurrentPage("vehicleDetails")} />;
  }

  return (
    <LandingPage
      onLoginClick={() => setCurrentPage("login")}
      onRegisterClick={() => {
        setSelectedRole("customer");
        setCurrentPage("register");
      }}
      onViewDetailsClick={() => setCurrentPage("vehicleDetails")}
    />
  );
}

export default App;