import React, { useState } from "react";

import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";

import CreateProfile from "./CreateProfile";
import CustomerProfile from "./CustomerProfile";
import VehicleOwnerProfile from "./VehicleOwnerProfile";
import AdminProfile from "./AdminProfile";

import CustomerDashboard from "./CustomerDashboard";
import VehicleOwnerDashboard from "./Vehicle_Owner_Details/VehicleOwnerDashboard";

import ViewVehicleDetails from "./ViewVehicleDetails";
import BookingDetails from "./BookingDetails";

function App() {

  const [currentPage, setCurrentPage] =
    useState("landing");

  const [selectedRole, setSelectedRole] =
    useState("customer");

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] =
    useState(false);

  const [isOwnerLoggedIn, setIsOwnerLoggedIn] =
    useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(false);

  const [loggedInCustomer, setLoggedInCustomer] =
    useState(null);

  const [loggedInOwner, setLoggedInOwner] =
    useState(null);

  const [loggedInAdmin, setLoggedInAdmin] =
    useState(null);

  const [profileCreationRole, setProfileCreationRole] =
    useState(null);

  const [profileCreationUser, setProfileCreationUser] =
    useState(null);

  const [pendingBookingRedirect, setPendingBookingRedirect] =
    useState(false);

  const [bookingReferrer, setBookingReferrer] =
    useState(null);

  const [showDashboardVehicleDetails, setShowDashboardVehicleDetails] =
    useState(false);

  const [showLandingInline, setShowLandingInline] =
    useState(false);

  const [selectedVehicle, setSelectedVehicle] =
    useState({
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

  /*
   * Registration success
   *
   * Customer:
   * Register -> Create Profile
   *
   * Owner:
   * Register -> Create Profile
   */
  const handleRegistrationSuccess = (
    role,
    user
  ) => {

    setProfileCreationRole(role);
    setProfileCreationUser(user);

    setSelectedRole(role);

    setCurrentPage("createProfile");
  };

  /*
   * Profile successfully created
   *
   * -> Login
   */
  const handleProfileSaved = () => {

    setProfileCreationRole(null);
    setProfileCreationUser(null);

    setCurrentPage("login");
  };

  /*
   * Login
   */
  const handleLoginSuccess = (
    role,
    loggedUser
  ) => {

    /*
     * CUSTOMER
     */
    if (role === "customer") {

      setLoggedInCustomer(
        loggedUser || null
      );

      setIsCustomerLoggedIn(true);

      setIsOwnerLoggedIn(false);
      setIsAdminLoggedIn(false);

      setLoggedInOwner(null);
      setLoggedInAdmin(null);

      if (pendingBookingRedirect) {

        setPendingBookingRedirect(false);

        setShowDashboardVehicleDetails(true);

        setCurrentPage("dashboard");

      } else {

        setCurrentPage("dashboard");
      }

      return;
    }

    /*
     * VEHICLE OWNER
     */
    if (role === "vehicleOwner") {

      setLoggedInOwner(
        loggedUser || null
      );

      setIsOwnerLoggedIn(true);

      setIsCustomerLoggedIn(false);
      setIsAdminLoggedIn(false);

      setLoggedInCustomer(null);
      setLoggedInAdmin(null);

      setCurrentPage("ownerDashboard");

      return;
    }

    /*
     * ADMIN
     *
     * Login -> Create Profile
     */
    if (role === "admin") {

      setLoggedInAdmin(
        loggedUser || null
      );

      setIsAdminLoggedIn(true);

      setIsCustomerLoggedIn(false);
      setIsOwnerLoggedIn(false);

      setLoggedInCustomer(null);
      setLoggedInOwner(null);

      setProfileCreationRole("admin");

      setProfileCreationUser(
        loggedUser || null
      );

      setCurrentPage("createProfile");

      return;
    }
  };

  /*
   * Logout
   */
  const handleLogout = () => {

    setIsCustomerLoggedIn(false);
    setIsOwnerLoggedIn(false);
    setIsAdminLoggedIn(false);

    setLoggedInCustomer(null);
    setLoggedInOwner(null);
    setLoggedInAdmin(null);

    setPendingBookingRedirect(false);

    setShowDashboardVehicleDetails(false);

    setSelectedRole("customer");

    setProfileCreationRole(null);
    setProfileCreationUser(null);

    setCurrentPage("landing");
  };

  /*
   * Vehicle details
   */
  const handleViewDetails = (
    vehicleData
  ) => {

    if (vehicleData) {
      setSelectedVehicle(vehicleData);
    }

    setCurrentPage("vehicleDetails");
  };

  /*
   * Landing vehicle details
   */
  const handleLandingView = (
    vehicleData
  ) => {

    if (vehicleData) {
      setSelectedVehicle(vehicleData);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setShowLandingInline(true);
  };

  /*
   * Book vehicle
   */
  const handleBookVehicle = () => {

    setShowLandingInline(false);

    setBookingReferrer(
      currentPage
    );

    if (isCustomerLoggedIn) {

      setShowDashboardVehicleDetails(true);

      setCurrentPage("dashboard");

      return;
    }

    setPendingBookingRedirect(true);

    setSelectedRole("customer");

    setCurrentPage("login");
  };

  /*
   * LOGIN PAGE
   */
  if (currentPage === "login") {

    return (
      <div className="app-page-shell">
        <Login
          role={selectedRole}

          onLoginSuccess={
            handleLoginSuccess
          }

          onRoleChange={
            setSelectedRole
          }

          onRegisterClick={() =>
            setCurrentPage("register")
          }

          onForgotPasswordClick={() =>
            setCurrentPage("forgot")
          }

          onLandingClick={() =>
            setCurrentPage("landing")
          }
        />
      </div>
    );
  }

  /*
   * FORGOT PASSWORD
   */
  if (currentPage === "forgot") {

    return (
      <div className="app-page-shell">
        <ForgotPassword
          role={selectedRole}
          onBackToLogin={() =>
            setCurrentPage("login")
          }
        />
      </div>
    );
  }

  /*
   * REGISTER
   */
  if (currentPage === "register") {

    return (
      <div className="app-page-shell">
        <Register
          role={selectedRole}

          onRoleChange={
            setSelectedRole
          }

          onLoginClick={() =>
            setCurrentPage("login")
          }

          onLandingClick={() =>
            setCurrentPage("landing")
          }

          onRegistrationSuccess={
            handleRegistrationSuccess
          }
        />
      </div>
    );
  }

  /*
   * CREATE PROFILE
   *
   * Used by:
   * Customer
   * Vehicle Owner
   * Admin
   */
  if (
    currentPage === "createProfile"
  ) {

    return (
      <div className="app-page-shell">
        <CreateProfile
          role={profileCreationRole}
          user={profileCreationUser}

          onProfileSaved={
            handleProfileSaved
          }
        />
      </div>
    );
  }

  /*
   * CUSTOMER PROFILE
   */
  if (
    currentPage === "customerProfile" &&
    loggedInCustomer
  ) {

    return (
      <div className="app-page-shell">
        <CustomerProfile
          customerId={
            loggedInCustomer.id
          }

          onBack={() =>
            setCurrentPage("dashboard")
          }
        />
      </div>
    );
  }

  /*
   * OWNER PROFILE
   */
  if (
    currentPage === "ownerProfile" &&
    loggedInOwner
  ) {

    return (
      <div className="app-page-shell">
        <VehicleOwnerProfile
          ownerId={
            loggedInOwner.id
          }

          onBack={() =>
            setCurrentPage("ownerDashboard")
          }
        />
      </div>
    );
  }

  /*
   * ADMIN PROFILE
   */
  if (
    currentPage === "adminProfile" &&
    loggedInAdmin
  ) {

    return (
      <div className="app-page-shell">
        <AdminProfile
          adminId={
            loggedInAdmin.id
          }

          onBack={() =>
            setCurrentPage("landing")
          }
        />
      </div>
    );
  }

  /*
   * VEHICLE DETAILS
   */
  if (
    currentPage === "vehicleDetails"
  ) {

    return (
      <div className="app-page-shell">
        <ViewVehicleDetails
          vehicle={selectedVehicle}

          onBack={() =>
            setCurrentPage("landing")
          }

          onBookVehicle={
            handleBookVehicle
          }
        />
      </div>
    );
  }

  /*
   * BOOKING DETAILS
   */
  if (
    currentPage === "bookingDetails"
  ) {

    return (
      <div className="app-page-shell">
        <BookingDetails
          onBack={() => {

            if (
              bookingReferrer ===
              "vehicleDetails"
            ) {

              setCurrentPage(
                "vehicleDetails"
              );

              return;
            }

            if (
              bookingReferrer ===
              "landing"
            ) {

              setCurrentPage(
                "landing"
              );

              setShowLandingInline(true);

              return;
            }

            setCurrentPage(
              "dashboard"
            );
          }}
        />
      </div>
    );
  }

  /*
   * CUSTOMER DASHBOARD
   */
  if (
    currentPage === "dashboard" &&
    isCustomerLoggedIn
  ) {

    return (
      <div className="app-page-shell">
        <CustomerDashboard
          customer={loggedInCustomer}
          onLogout={handleLogout}

          onViewDetails={
            handleViewDetails
          }

          onBookVehicle={
            handleBookVehicle
          }

          initialShowVehicleDetails={
            showDashboardVehicleDetails
          }

          initialVehicle={
            selectedVehicle
          }

          onVehicleDetailsClosed={() =>
            setShowDashboardVehicleDetails(false)
          }
        />
      </div>
    );
  }

  /*
   * OWNER DASHBOARD
   */
  if (
    currentPage === "ownerDashboard" &&
    isOwnerLoggedIn
  ) {

    return (
      <div className="app-page-shell">
        <VehicleOwnerDashboard
          owner={loggedInOwner}
          onLogout={handleLogout}

          onProfileClick={() =>
            setCurrentPage(
              "ownerProfile"
            )
          }
        />
      </div>
    );
  }

  /*
   * LANDING PAGE
   */
  return (
    <div className="app-page-shell landing-page-shell">
      <LandingPage

        onLoginClick={() =>
          setCurrentPage("login")
        }

        onRegisterClick={() => {

          setSelectedRole("customer");

          setCurrentPage(
            "register"
          );
        }}

        onViewDetailsClick={
          handleLandingView
        }

        showVehicleDetails={
          showLandingInline &&
          Boolean(selectedVehicle)
        }

        selectedVehicle={
          selectedVehicle
        }

        onBackFromVehicleDetails={() =>
          setShowLandingInline(false)
        }

        onBookVehicle={
          handleBookVehicle
        }
      />
    </div>
  );
}

export default App;