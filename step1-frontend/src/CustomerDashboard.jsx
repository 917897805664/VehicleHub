import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewVehicleDetails from "./ViewVehicleDetails";
import BookingDetails from "./BookingDetails";
import CustomerProfile from "./CustomerProfile";
import Sidebar from "./Sidebar";
import CustomerSidebarWishlist from "./CustomerSidebarWishlist";
import carImage from "./assets/car_image.jpg";
import profilePlaceholder from "./assets/profile_placeholder.svg";
import "./index.css";

const API_BASE_URL = "http://localhost:8080/api/vehicle-owners/vehicles";

export default function CustomerDashboard({
  onBack,
  onViewDetails,
  onBookVehicle,
  onLogout,
  initialShowVehicleDetails = false,
  initialVehicle = null,
  onVehicleDetailsClosed,
  customer = null,
  onProfileClick,
}) {
  const [active, setActive] = useState("dashboard");

  const [inlineVehicle, setInlineVehicle] =
    useState(null);

  const [showInlineDetails, setShowInlineDetails] =
    useState(false);

  const [showInlineBooking, setShowInlineBooking] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [customerProfilePhoto, setCustomerProfilePhoto] =
    useState(profilePlaceholder);

  useEffect(() => {
    if (!customer?.id) {
      setCustomerProfilePhoto(profilePlaceholder);
      return;
    }

    axios
      .get(`http://localhost:8080/api/customer-profiles/${customer.id}`)
      .then((response) => {
        const photo = response.data?.data?.profilePhoto;

        if (
          photo &&
          photo !== "DEFAULT_PROFILE_PHOTO" &&
          photo.startsWith("data:image")
        ) {
          setCustomerProfilePhoto(photo);
          return;
        }

        setCustomerProfilePhoto(profilePlaceholder);
      })
      .catch(() => {
        setCustomerProfilePhoto(profilePlaceholder);
      });
  }, [customer?.id]);

  // =========================================================
  // DATABASE VEHICLES
  // =========================================================

  const [vehicles, setVehicles] =
    useState([]);

  const [loadingVehicles, setLoadingVehicles] =
    useState(true);

  const [vehicleError, setVehicleError] =
    useState("");


  // =========================================================
  // WISHLIST
  // =========================================================

  const [likedVehicles, setLikedVehicles] =
    useState([]);


  // =========================================================
  // LOAD VEHICLES FROM DATABASE
  // =========================================================

  const loadVehicles = async () => {

    try {

      setLoadingVehicles(true);
      setVehicleError("");

      const response =
        await fetch(
          `${API_BASE_URL}/catalog`
        );


      if (!response.ok) {

        throw new Error(
          `HTTP error: ${response.status}`
        );
      }


      const result =
        await response.json();


      /*
       * Your ApiResponse is expected to return:
       *
       * {
       *   success: true,
       *   message: "...",
       *   data: [...]
       * }
       */

      if (result.success === false) {

        throw new Error(
          result.message ||
          "Unable to load vehicles."
        );
      }


      setVehicles(
        Array.isArray(result.data)
          ? result.data
          : []
      );

    } catch (error) {

      console.error(
        "Vehicle catalog error:",
        error
      );

      setVehicleError(
        error.message ||
        "Unable to load vehicles."
      );

    } finally {

      setLoadingVehicles(false);
    }
  };


  useEffect(() => {

    loadVehicles();

  }, []);


  // =========================================================
  // INITIAL VEHICLE
  // =========================================================

  useEffect(() => {

    if (
      initialShowVehicleDetails &&
      initialVehicle
    ) {

      setInlineVehicle(
        initialVehicle
      );

      setShowInlineDetails(true);

      setShowInlineBooking(false);

      setShowProfile(false);

      setActive("dashboard");

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

  }, [
    initialShowVehicleDetails,
    initialVehicle,
  ]);


  // =========================================================
  // VIEW VEHICLE DETAILS
  // =========================================================

  const handleInlineView = async (vehicle) => {

    try {

      /*
       * First show the selected vehicle.
       */

      setInlineVehicle(vehicle);

      setShowInlineDetails(true);

      setShowInlineBooking(false);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });


      /*
       * Then retrieve the complete vehicle again.
       *
       * This makes sure features, media,
       * documents and charges are available.
       */

      if (vehicle?.id) {

        const response =
          await fetch(
            `${API_BASE_URL}/catalog/${vehicle.id}`
          );


        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }


        const result =
          await response.json();


        if (
          result.success !== false &&
          result.data
        ) {

          setInlineVehicle(
            result.data
          );
        }
      }

    } catch (error) {

      console.error(
        "Vehicle details error:",
        error
      );
    }
  };


  // =========================================================
  // BACK FROM DETAILS
  // =========================================================

  const handleInlineBack = () => {

    setShowInlineDetails(false);

    setInlineVehicle(null);

    if (
      typeof onVehicleDetailsClosed ===
      "function"
    ) {

      onVehicleDetailsClosed();
    }
  };


  // =========================================================
  // SIDEBAR
  // =========================================================

  const handleSidebarSelect = (key) => {

    if (key === "profile") {
      setActive("profile");
      setShowProfile(true);
      setShowInlineBooking(false);
      setShowInlineDetails(false);
      setInlineVehicle(null);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      return;
    }

    setActive(key);

    setShowInlineBooking(false);

    setShowInlineDetails(false);

    setInlineVehicle(null);

    setShowProfile(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };


  // =========================================================
  // PROFILE
  // =========================================================

  const handleOpenProfile = () => {

    setActive("profile");

    setShowProfile(true);

    setShowInlineBooking(false);

    setShowInlineDetails(false);

    setInlineVehicle(null);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };


  // =========================================================
  // BOOKING
  // =========================================================

  const handleStartBooking = async (vehicle) => {

    let selectedVehicle = vehicle;

    if (vehicle?.id) {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/catalog/${vehicle.id}`
          );

        if (response.ok) {
          const result =
            await response.json();

          if (
            result.success !== false &&
            result.data
          ) {
            selectedVehicle = result.data;
          }
        }
      } catch (error) {
        console.error(
          "Booking vehicle fetch error:",
          error
        );
      }
    }

    setInlineVehicle(selectedVehicle);

    setShowInlineDetails(false);

    setShowInlineBooking(true);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };


  // =========================================================
  // WISHLIST
  // =========================================================

  const handleToggleWishlist = async (vehicle) => {

    if (!vehicle?.id) {
      return;
    }

    let vehicleRecord = vehicle;

    const hasNeededDetails =
      vehicleRecord?.description ||
      vehicleRecord?.features ||
      vehicleRecord?.media ||
      vehicleRecord?.documents;

    if (!hasNeededDetails) {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/catalog/${vehicle.id}`
          );

        if (response.ok) {
          const result =
            await response.json();

          if (
            result.success !== false &&
            result.data
          ) {
            vehicleRecord = result.data;
          }
        }
      } catch (error) {
        console.error(
          "Wishlist vehicle fetch error:",
          error
        );
      }
    }

    setLikedVehicles((previous) => {

      const alreadyLiked = previous.some(
        (item) => item?.id === vehicle.id
      );

      if (alreadyLiked) {
        return previous.filter(
          (item) => item?.id !== vehicle.id
        );
      }

      return [
        ...previous,
        vehicleRecord,
      ];
    });
  };


  // =========================================================
  // OFFERS
  // =========================================================

  const dashboardOffers = [
    {
      tag: "Bike Offer",
      title: "Flash Bike Savings",
      subtitle:
        "Save on premium bike rentals this week.",
      detail:
        "Check available bikes from the vehicle database.",
    },
    {
      tag: "Car Offer",
      title: "Weekend Car Special",
      subtitle:
        "Explore available cars for weekend trips.",
      detail:
        "Choose from vehicles currently registered by owners.",
    },
    {
      tag: "SUV Offer",
      title: "Family SUV Promo",
      subtitle:
        "Find comfortable SUVs for group travel.",
      detail:
        "View complete vehicle information before booking.",
    },
  ];


  const [offerIndex, setOfferIndex] =
    useState(0);


  const handlePrevOffer = () => {

    setOfferIndex(
      (previous) =>
        (
          previous -
          1 +
          dashboardOffers.length
        ) %
        dashboardOffers.length
    );
  };


  const handleNextOffer = () => {

    setOfferIndex(
      (previous) =>
        (
          previous + 1
        ) %
        dashboardOffers.length
    );
  };


  // =========================================================
  // STATS
  // =========================================================

  const dashboardStats = [
    {
      icon: "🚗",
      label: "Available Vehicles",
      value: vehicles.length,
      action: "From Database",
      accent: "#10b981",
    },
    {
      icon: "🏍️",
      label: "Two Wheelers",
      value: vehicles.filter(
        (vehicle) =>
          String(
            vehicle.vehicleType || ""
          ).toLowerCase().includes(
            "bike"
          )
      ).length,
      action: "View Vehicles",
      accent: "#6366f1",
    },
    {
      icon: "🚘",
      label: "Cars / SUVs",
      value: vehicles.filter(
        (vehicle) => {

          const type =
            String(
              vehicle.vehicleType || ""
            ).toLowerCase();

          return (
            type.includes("car") ||
            type.includes("suv")
          );
        }
      ).length,
      action: "View Vehicles",
      accent: "#f59e0b",
    },
    {
      icon: "❤️",
      label: "Wishlist",
      value: likedVehicles.length,
      action: "Saved Vehicles",
      accent: "#8b5cf6",
    },
  ];


  // =========================================================
  // PRICE HELPERS
  // =========================================================

  const formatPrice = (
    amount
  ) => {

    if (
      amount === null ||
      amount === undefined
    ) {

      return "Not available";
    }


    return `₹${Number(
      amount
    ).toLocaleString("en-IN")}`;
  };


  // =========================================================
  // FRONT IMAGE
  // =========================================================

  const getVehicleImage = (
    vehicle
  ) => {

    if (
      vehicle?.frontImage
    ) {

      return vehicle.frontImage;
    }


    if (
      Array.isArray(
        vehicle?.media
      )
    ) {

      const image =
        vehicle.media.find(
          (media) =>
            media?.contentType
              ?.toLowerCase()
              .startsWith(
                "image/"
              )
        );


      if (
        image?.fileData &&
        image?.contentType
      ) {

        return `data:${image.contentType};base64,${image.fileData}`;
      }
    }


    return carImage;
  };


  // =========================================================
  // CARD
  // =========================================================

  const renderVehicleCard = (
    vehicle
  ) => {

    return (
      <div
        key={vehicle.id}
        className="animated-card vehicle-tile-card"
        style={styles.popularCard}
      >

        <button
          type="button"
          style={{
            ...styles.heartButton,

            ...(likedVehicles.some(
              (item) => item?.id === vehicle.id
            )
              ? {
                  background:
                    "#c9c7c7",
                  // color:
                  //   "#ef4444",
                }
              : {}),
          }}
          aria-label="Like vehicle"
          onClick={(event) => {

            event.stopPropagation();

            handleToggleWishlist(
              vehicle
            );
          }}
        >
          ❤
        </button>


        <div
          style={{
            marginBottom: "12px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#f3f4f6",
          }}
        >

          <img
            src={getVehicleImage(
              vehicle
            )}
            alt={
              vehicle.vehicleName
            }
            onError={(event) => {

              event.target.onerror =
                null;

              event.target.src =
                carImage;
            }}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              display: "block",
            }}
          />

        </div>


        <div
          style={
            styles.popularCardContent
          }
        >

          <h4
            style={
              styles.popularCardTitle
            }
          >
            {vehicle.vehicleName}
          </h4>


          <p
            style={
              styles.popularCardSubtitle
            }
          >
            {vehicle.vehicleType ||
              "Vehicle"}
          </p>


          <p
            style={
              styles.popularCardInfo
            }
          >
            {vehicle.brand}{" "}
            {vehicle.model}
          </p>


          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >

            <span
              style={{
                color: "#0f7a34",
                fontWeight: 700,
              }}
            >
              Hourly:{" "}
              {formatPrice(
                vehicle.hourlyRent
              )}
            </span>


            <span
              style={{
                color: "#0f7a34",
                fontWeight: 700,
              }}
            >
              Daily:{" "}
              {formatPrice(
                vehicle.dailyRent
              )}
            </span>

          </div>


          <div
            style={
              styles.popularCardFooter
            }
          >

            <button
              type="button"
              style={
                styles.viewDetailsButton
              }
              onClick={() =>
                handleInlineView(
                  vehicle
                )
              }
            >
              View Details
            </button>

          </div>

        </div>

      </div>
    );
  };


  // =========================================================
  // SECTION CARD
  // =========================================================

  const renderSectionCard = (
    title,
    subtitle,
    accent = "#0f7a34"
  ) => (

    <div
      style={{
        paddingTop: "24px",
      }}
    >

      <section
        style={{
          ...styles.panel,
          ...styles.fullWidthSection,
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8fffb 100%)",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "16px",
              background:
                accent + "22",
              color: accent,
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: "22px",
            }}
          >
            {title.charAt(0)}
          </div>


          <div>

            <h3
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#102a43",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                margin:
                  "6px 0 0",
                color:
                  "#66758c",
              }}
            >
              {subtitle}
            </p>

          </div>

        </div>


        <div
          style={{
            background: "#f8fafc",
            border:
              "1px solid rgba(15, 23, 42, 0.05)",
            borderRadius: "18px",
            padding: "20px",
            color: "#334155",
          }}
        >
          This section is now active in the main dashboard area.
        </div>

      </section>

    </div>
  );


  // =========================================================
  // CONTENT
  // =========================================================

  const renderContent = () => {

    if (showProfile) {

      return (
        <div
          style={{
            paddingTop: "24px",
          }}
        >
          <CustomerProfile
            customerId={customer?.id}
            onBack={() => {
              setShowProfile(false);
              setActive("dashboard");
            }}
          />
        </div>
      );
    }


    if (showInlineBooking) {

      return (
        <div
          className="dashboard-inline-booking"
          style={{
            paddingTop: "24px",
          }}
        >

          <BookingDetails
            vehicle={inlineVehicle}

            onBack={(step) => {

              if (step === 1) {

                setShowInlineBooking(
                  false
                );

                setShowInlineDetails(
                  true
                );

                return;
              }


              if (step === 4) {

                setShowInlineBooking(
                  false
                );

                setActive(
                  "dashboard"
                );

                return;
              }


              setShowInlineBooking(
                false
              );
            }}
          />

        </div>
      );
    }


    if (
      showInlineDetails &&
      inlineVehicle
    ) {

      return (
        <div
          style={{
            paddingTop: "24px",
          }}
        >

          <ViewVehicleDetails
            vehicle={
              inlineVehicle
            }

            onBack={
              handleInlineBack
            }

            onBookVehicle={() =>
              handleStartBooking(
                inlineVehicle
              )
            }

            onViewProfile={
              handleOpenProfile
            }

            showFooter={false}
          />

        </div>
      );
    }


    if (
      active === "wishlist"
    ) {

      return (
        <div
          style={{
            paddingTop: "85px",
          }}
        >

          <CustomerSidebarWishlist
            likedVehicles={
              likedVehicles
            }

            onViewDetails={
              handleInlineView
            }

            onToggleWishlist={
              handleToggleWishlist
            }

            onAddMore={() => {
              setActive("dashboard");
              setShowInlineDetails(false);
              setShowInlineBooking(false);
              setShowProfile(false);
              setInlineVehicle(null);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
              });
            }}
          />

        </div>
      );
    }


    if (active === "search")
      return renderSectionCard(
        "Search Vehicles",
        "Find vehicles by name, city, area, and pincode.",
        "#0ea5e9"
      );


    if (active === "bookings")
      return renderSectionCard(
        "My Bookings",
        "Track your current and upcoming rides.",
        "#8b5cf6"
      );


    if (active === "offers")
      return renderSectionCard(
        "Offers",
        "Explore the latest discounts and special deals.",
        "#f59e0b"
      );


    if (active === "notifications")
      return renderSectionCard(
        "Notifications",
        "Review your latest alerts and reminders.",
        "#ef4444"
      );


    if (active === "messages")
      return renderSectionCard(
        "Messages",
        "Stay connected with owners and support.",
        "#10b981"
      );


    if (active === "payments")
      return renderSectionCard(
        "Payment History",
        "Review past payments and receipts.",
        "#6366f1"
      );


    if (active === "profile")
      return renderSectionCard(
        "Profile",
        "Manage your personal details and preferences.",
        "#ec4899"
      );


    if (active === "help")
      return renderSectionCard(
        "Help Center",
        "Need assistance? Check support and FAQs.",
        "#14b8a6"
      );


    // =======================================================
    // DASHBOARD
    // =======================================================

    return (
      <>

        {/* ==================================================
            STATS
        ================================================== */}

        <section
          style={{
            ...styles.panel,
            ...styles.fullWidthSection,
            ...styles.statsSection,
          }}
        >

          <div
            style={
              styles.statsRow
            }
          >

            {dashboardStats.map(
              (item) => (

                <div
                  key={item.label}
                  className="animated-card dashboard-stat-card"
                  style={
                    styles.statCard
                  }
                >

                  <div
                    style={{
                      ...styles.statIcon,
                      background:
                        item.accent +
                        "22",
                      color:
                        item.accent,
                    }}
                  >
                    {item.icon}
                  </div>


                  <div>

                    <div
                      style={
                        styles.statLabel
                      }
                    >
                      {item.label}
                    </div>


                    <div
                      style={
                        styles.statValue
                      }
                    >
                      {item.value}
                    </div>


                    <div
                      style={
                        styles.statSub
                      }
                    >
                      {item.action}
                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* ==================================================
            OFFERS
        ================================================== */}

        <section
          style={{
            ...styles.panel,
            ...styles.fullWidthSection,
            ...styles.dashboardOfferSection,
          }}
        >

          <div
            style={
              styles.offerHeader
            }
          >

            <h3
              style={
                styles.panelTitle
              }
            >
              Today's Offers
            </h3>

            <p
              style={
                styles.panelText
              }
            >
              Explore vehicles available in the database.
            </p>

          </div>


          <div
            style={
              styles.offersCarousel
            }
          >

            <button
              type="button"
              style={
                styles.carouselArrow
              }
              onClick={
                handlePrevOffer
              }
            >
              &lt;
            </button>


            <div
              style={
                styles.offerSlide
              }
            >

              <span
                style={
                  styles.offerChip
                }
              >
                {
                  dashboardOffers[
                    offerIndex
                  ].tag
                }
              </span>


              <h4
                style={
                  styles.offerTitle
                }
              >
                {
                  dashboardOffers[
                    offerIndex
                  ].title
                }
              </h4>


              <p
                style={
                  styles.offerSubtitle
                }
              >
                {
                  dashboardOffers[
                    offerIndex
                  ].subtitle
                }
              </p>


              <p
                style={
                  styles.offerDetail
                }
              >
                {
                  dashboardOffers[
                    offerIndex
                  ].detail
                }
              </p>

            </div>


            <button
              type="button"
              style={
                styles.carouselArrow
              }
              onClick={
                handleNextOffer
              }
            >
              &gt;
            </button>

          </div>

        </section>


        {/* ==================================================
            DATABASE VEHICLES
        ================================================== */}

        <section
          style={{
            ...styles.panel,
            ...styles.fullWidthSection,
            ...styles.popularSection,
          }}
        >

          <div
            style={
              styles.offerHeader
            }
          >

            <h3
              style={
                styles.panelTitle
              }
            >
              Available Vehicles
            </h3>

            <p
              style={
                styles.panelText
              }
            >
              Vehicles registered by vehicle owners.
            </p>

          </div>


          {loadingVehicles && (

            <div
              style={{
                padding:
                  "40px",
                textAlign:
                  "center",
                color:
                  "#64748b",
              }}
            >
              Loading vehicles from database...
            </div>

          )}


          {!loadingVehicles &&
            vehicleError && (

              <div
                style={{
                  padding:
                    "20px",
                  borderRadius:
                    "16px",
                  background:
                    "#fef2f2",
                  color:
                    "#b91c1c",
                }}
              >
                {vehicleError}

                <button
                  type="button"
                  onClick={
                    loadVehicles
                  }
                  style={{
                    marginLeft:
                      "15px",
                    padding:
                      "8px 14px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Retry
                </button>

              </div>

            )}


          {!loadingVehicles &&
            !vehicleError &&
            vehicles.length === 0 && (

              <div
                style={{
                  padding:
                    "40px",
                  textAlign:
                    "center",
                  color:
                    "#64748b",
                }}
              >
                No vehicles found in database.
              </div>

            )}


          {!loadingVehicles &&
            !vehicleError &&
            vehicles.length > 0 && (

              <div
                style={
                  styles.popularGrid
                }
              >

                {vehicles.map(
                  renderVehicleCard
                )}

              </div>

            )}

        </section>

      </>
    );
  };


  return (
    <div
      className="booking-details-shell dashboard-page-shell"
    >

      <Sidebar
        active={active}
        onSelect={
          handleSidebarSelect
        }
        onLogout={onLogout}
      />


      <div
        className="booking-page-content"
      >

        <header
          className="booking-topbar"
        >

          <div
            className="booking-brand"
          >

            <div
              className="booking-brand-logo"
            >
              🚗
            </div>

            <div>

              <div
                className="booking-brand-name"
              >
                VehicleHub
              </div>

              <div
                className="booking-brand-subtitle"
              >
                Book your next ride
              </div>

            </div>

          </div>


          <div
            className="booking-topbar-search-row"
          >

            <div
              className="booking-search-wrapper"
            >

              <div
                className="topbar-search"
              >

                <span>🔍</span>

                <input
                  type="text"
                  aria-label="Search vehicles"
                  placeholder="Search by vehicle name, city, Area, pincode..."
                />

              </div>


              <button
                type="button"
                className="topbar-search-button"
              >
                Search
              </button>

            </div>

          </div>


          <div
            className="booking-topbar-actions"
          >

            <button
              type="button"
              className="topbar-icon-button"
              aria-label="Notifications"
            >
              🔔
            </button>


            <button
              type="button"
              className="topbar-avatar-button"
              aria-label="Profile"
              onClick={
                handleOpenProfile
              }
            >

              <img
                src={customerProfilePhoto}
                alt="Customer profile"
                onError={(event) => {
                  event.target.onerror = null;
                  event.target.src = profilePlaceholder;
                }}
              />

            </button>

          </div>

        </header>


        {renderContent()}


        <section
          style={{
            ...styles.footerSection,
            ...styles.fullWidthSection,
          }}
        >

          <div
            style={
              styles.footerInner
            }
          >

            <div
              style={
                styles.footerBrand
              }
            >

              <h3
                style={
                  styles.footerBrandTitle
                }
              >
                RentWheels
              </h3>

              <p
                style={
                  styles.footerBrandText
                }
              >
                Convenient vehicle rentals for every journey, powered by smart booking and trusted service.
              </p>

            </div>


            <div
              style={
                styles.footerLinks
              }
            >

              <div
                style={
                  styles.footerColumn
                }
              >

                <h4
                  style={
                    styles.footerHeading
                  }
                >
                  Explore
                </h4>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  Home
                </button>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  Vehicles
                </button>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  Offers
                </button>

              </div>


              <div
                style={
                  styles.footerColumn
                }
              >

                <h4
                  style={
                    styles.footerHeading
                  }
                >
                  Support
                </h4>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  How It Works
                </button>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  About Us
                </button>

                <button
                  type="button"
                  style={
                    styles.footerLink
                  }
                >
                  Contact
                </button>

              </div>

            </div>

          </div>


          <div
            style={
              styles.footerBottom
            }
          >

            <span
              style={
                styles.footerCopyright
              }
            >
              © 2026 RentWheels. All rights reserved.
            </span>

            <span
              style={
                styles.footerContact
              }
            >
              Contact: support@rentwheels.com
            </span>

          </div>

        </section>

      </div>

    </div>
  );
}


// ===========================================================
// STYLES
// ===========================================================

const styles = {

  statsSection: {
    marginTop: "83px",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  statCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow:
      "0 10px 30px rgba(15, 122, 52, 0.05)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    display: "grid",
    placeItems: "center",
    fontSize: "1.35rem",
  },

  statLabel: {
    color: "#6f7c92",
    fontSize: "13px",
    marginBottom: "10px",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: 700,
  },

  statSub: {
    marginTop: "10px",
    color: "#0f7a34",
    fontWeight: 700,
    fontSize: "12px",
  },

  fullWidthSection: {
    gridColumn: "1 / -1",
  },

  panel: {
    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow:
      "0 20px 40px rgba(31, 45, 73, 0.06)",
  },

  panelTitle: {
    margin: 0,
    fontSize: "20px",
  },

  panelText: {
    color: "#6f7c92",
    marginTop: "6px",
    fontSize: "14px",
  },

  dashboardOfferSection: {
    marginTop: "10px",
    paddingBottom: "0",
  },

  offerHeader: {
    marginBottom: "18px",
  },

  offersCarousel: {
    display: "grid",
    gridTemplateColumns:
      "auto 1fr auto",
    alignItems: "center",
    gap: "16px",
  },

  offerSlide: {
    background: "#ecfdf5",
    border:
      "1px solid #d1fae5",
    borderRadius: "20px",
    padding:
      "24px",
    boxShadow:
      "0 18px 32px rgba(15, 23, 42, 0.08)",
    marginBottom: "40px",
  },

  offerChip: {
    display: "inline-flex",
    padding:
      "10px 16px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#0f172a",
    fontWeight: 700,
    marginBottom: "16px",
  },

  offerTitle: {
    margin: 0,
    fontSize: "1.6rem",
  },

  offerSubtitle: {
    margin:
      "12px 0",
    color: "#475569",
    lineHeight: 1.6,
  },

  offerDetail: {
    color: "#334155",
    fontWeight: 600,
  },

  carouselArrow: {
    border: "none",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    boxShadow:
      "0 10px 28px rgba(15, 23, 42, 0.08)",
  },

  popularSection: {
    marginTop: "10px",
  },

  popularGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "18px",
  },

  popularCard: {
    position: "relative",
    background: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow:
      "0 16px 32px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gap: "16px",
  },

  heartButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border:
      "1px solid rgba(15, 23, 42, 0.12)",
    background: "#ffffff",
    color: "#ef4444",
    fontSize: "1rem",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    zIndex: 1,
  },

  popularCardContent: {
    padding:
      "0 20px 20px",
    display: "grid",
    gap: "10px",
  },

  popularCardTitle: {
    margin: 0,
    fontSize: "1.15rem",
    fontWeight: 800,
    color: "#102a43",
  },

  popularCardSubtitle: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#64748b",
  },

  popularCardInfo: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.6,
    fontSize: "0.95rem",
  },

  popularCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
    marginTop: "10px",
  },

  viewDetailsButton: {
    padding:
      "10px 16px",
    borderRadius: "14px",
    border: "none",
    background: "#0f7a34",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },

  footerSection: {
    marginTop: "24px",
    background: "#0c1726",
    padding: "32px",
    color: "#f8fafc",
  },

  footerInner: {
    display: "grid",
    gridTemplateColumns:
      "1.4fr 1fr",
    gap: "24px",
    alignItems:
      "flex-start",
    marginBottom: "28px",
  },

  footerBrand: {
    display: "grid",
    gap: "16px",
  },

  footerBrandTitle: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#ffffff",
  },

  footerBrandText: {
    margin: 0,
    color: "#d1d5db",
    lineHeight: 1.8,
    maxWidth: "560px",
  },

  footerLinks: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "24px",
  },

  footerColumn: {
    display: "grid",
    gap: "14px",
  },

  footerHeading: {
    margin: 0,
    fontSize: "1rem",
    color: "#ffffff",
    fontWeight: 700,
  },

  footerLink: {
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "0.95rem",
  },

  footerBottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent:
      "space-between",
    gap: "12px",
    borderTop:
      "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "18px",
  },

  footerCopyright: {
    color: "#9ca3af",
  },

  footerContact: {
    color: "#9ca3af",
  },
};