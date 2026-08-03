import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import CustomerDashboard from "./CustomerDashboard";
import ViewVehicleDetails from "./ViewVehicleDetails";
import BookingDetails from "./BookingDetails";

const defaultVehicle = {
  name: "Hyundai i20",
  fuel: "Petrol",
  transmission: "Manual",
  seats: "5 Seater",
  priceHour: "₹149",
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
};

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(defaultVehicle);

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

  const handleViewVehicleDetails = (vehicle) => {
    const nextVehicle = {
      ...defaultVehicle,
      ...vehicle,
      name: vehicle?.name || defaultVehicle.name,
      fuel: vehicle?.type === "Bike" ? "Petrol" : defaultVehicle.fuel,
      transmission: vehicle?.type === "SUV" ? "Automatic" : defaultVehicle.transmission,
      seats: vehicle?.type === "SUV" ? "7 Seater" : defaultVehicle.seats,
      priceDay: vehicle?.price || defaultVehicle.priceDay,
      priceHour: defaultVehicle.priceHour,
      priceWeek: defaultVehicle.priceWeek,
      priceMonth: defaultVehicle.priceMonth,
      rating: defaultVehicle.rating,
      reviews: defaultVehicle.reviews,
      distance: defaultVehicle.distance,
      owner: defaultVehicle.owner,
    };

    setSelectedVehicle(nextVehicle);
    setCurrentPage("vehicleDetails");
  };

  const handleOpenBookingDetails = () => {
    setCurrentPage("bookingDetails");
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
        onBookVehicle={handleOpenBookingDetails}
      />
    );
  }

  if (currentPage === "bookingDetails") {
    return <BookingDetails onBack={() => setCurrentPage("landing")} />;
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
      onViewDetailsClick={handleViewVehicleDetails}
      onHomeClick={() => setCurrentPage("landing")}
      onVehiclesClick={handleOpenBookingDetails}
    />
  );
}

export default App;