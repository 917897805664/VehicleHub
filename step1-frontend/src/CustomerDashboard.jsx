import React from "react";
import Sidebar from "./Sidebar";
import CustomerSidebarWishlist from "./CustomerSidebarWishlist";
import carImage from "./assets/car_image.jpg";
import profilePlaceholder from "./assets/profile_placeholder.svg";
import "./index.css";
export default function CustomerDashboard({ onBack ,onViewDetails, onLogout }) {
  const [active, setActive] = React.useState("dashboard");

  const dashboardOffers = [
    {
      tag: "Bike Offer",
      title: "Flash Bike Savings",
      subtitle: "Save 20% on premium bike rentals this week.",
      detail: "Highlight your bike fleet with a fast booking boost and extra visibility.",
    },
    {
      tag: "Car Offer",
      title: "Weekend Car Special",
      subtitle: "Extra cashback on weekend car bookings.",
      detail: "Showcase your best car deals for short trips and road trips alike.",
    },
    {
      tag: "SUV Offer",
      title: "Family SUV Promo",
      subtitle: "Get more family group bookings with special SUV pricing.",
      detail: "Promote comfort and space for longer journeys with this offer.",
    },
  ];

  const dashboardStats = [
    {
      icon: "📅",
      label: "Total Bookings",
      value: "12",
      action: "View All",
      accent: "#10b981",
    },
    {
      icon: "🧳",
      label: "Upcoming Trips",
      value: "2",
      action: "View All",
      accent: "#6366f1",
    },
    {
      icon: "✅",
      label: "Completed Trips",
      value: "8",
      action: "View All",
      accent: "#f59e0b",
    },
    {
      icon: "💰",
      label: "Total Spent",
      value: "₹18,750",
      action: "View Details",
      accent: "#8b5cf6",
    },
  ];

  const [offerIndex, setOfferIndex] = React.useState(0);
  const [likedVehicleNames, setLikedVehicleNames] = React.useState([]);

  const handlePrevOffer = () => {
    setOfferIndex((prev) => (prev - 1 + dashboardOffers.length) % dashboardOffers.length);
  };

  const handleNextOffer = () => {
    setOfferIndex((prev) => (prev + 1) % dashboardOffers.length);
  };

  const handleToggleWishlist = (vehicle) => {
    setLikedVehicleNames((prev) =>
      prev.includes(vehicle.name)
        ? prev.filter((name) => name !== vehicle.name)
        : [...prev, vehicle.name]
    );
  };

  const popularVehicles = [
    {
      name: "Honda Activa 6G",
      type: "Bike",
      description: "Available now · ₹249/day",
      price: "₹249/day",
      imageUrl: "https://picsum.photos/seed/activa/400/260",
    },
    {
      name: "Maruti Swift",
      type: "Car",
      description: "Available in Koramangala · ₹1299/day",
      price: "₹1299/day",
      imageUrl: "https://picsum.photos/seed/swift/400/260",
    },
    {
      name: "Tata Nexon",
      type: "SUV",
      description: "Ready for 1-day trips · ₹1599/day",
      price: "₹1599/day",
      imageUrl: "https://picsum.photos/seed/nexon/400/260",
    },
    {
      name: "Tempo Traveller",
      type: "Bus",
      description: "Seats 12 · ₹2599/day",
      price: "₹2599/day",
      imageUrl: "https://picsum.photos/seed/tempo/400/260",
    },
    {
      name: "Yamaha R15",
      type: "Bike",
      description: "Sporty ride · ₹699/day",
      price: "₹699/day",
      imageUrl: "https://picsum.photos/seed/r15/400/260",
    },
    {
      name: "Mercedes E-Class",
      type: "Car",
      description: "Premium comfort · ₹3999/day",
      price: "₹3999/day",
      imageUrl: "https://picsum.photos/seed/eclass/400/260",
    },
    {
      name: "Mahindra Scorpio",
      type: "SUV",
      description: "Family-ready · ₹2499/day",
      price: "₹2499/day",
      imageUrl: "https://picsum.photos/seed/scorpio/400/260",
    },
    {
      name: "Mini Bus",
      type: "Bus",
      description: "Tour package · ₹1899/day",
      price: "₹1899/day",
      imageUrl: "https://picsum.photos/seed/minibus/400/260",
    },
    {
      name: "Toyota Innova",
      type: "Car",
      description: "Spacious travel · ₹1799/day",
      price: "₹1799/day",
      imageUrl: "https://picsum.photos/seed/innova/400/260",
    },
    {
      name: "Royal Enfield",
      type: "Bike",
      description: "Cruiser available · ₹899/day",
      price: "₹899/day",
      imageUrl: "https://picsum.photos/seed/enfield/400/260",
    },
    {
      name: "Kia Seltos",
      type: "SUV",
      description: "Stylish ride · ₹1699/day",
      price: "₹1699/day",
      imageUrl: "https://picsum.photos/seed/seltos/400/260",
    },
    {
      name: "Ford Endeavour",
      type: "SUV",
      description: "Adventure ready · ₹2799/day",
      price: "₹2799/day",
      imageUrl: "https://picsum.photos/seed/endeavour/400/260",
    },
    {
      name: "Bajaj Pulsar",
      type: "Bike",
      description: "City commute · ₹599/day",
      price: "₹599/day",
      imageUrl: "https://picsum.photos/seed/pulsar/400/260",
    },
    {
      name: "Skoda Octavia",
      type: "Car",
      description: "Executive sedan · ₹2199/day",
      price: "₹2199/day",
      imageUrl: "https://picsum.photos/seed/octavia/400/260",
    },
    {
      name: "Hyundai Creta",
      type: "SUV",
      description: "Comfortable drive · ₹1599/day",
      price: "₹1599/day",
      imageUrl: "https://picsum.photos/seed/creta/400/260",
    },
    {
      name: "Ashok Leyland",
      type: "Bus",
      description: "Group travel · ₹3299/day",
      price: "₹3299/day",
      imageUrl: "https://picsum.photos/seed/leyland/400/260",
    },
  ];

  // const recentBookings = [
  //   {
  //     name: "Maruti Wagon R",
  //     type: "Car",
  //     description: "Booked today · ₹999/day",
  //     price: "₹999/day",
  //     imageUrl: "https://picsum.photos/seed/wagonr/400/260",
  //   },
  //   {
  //     name: "Hero Splendor",
  //     type: "Bike",
  //     description: "Booked yesterday · ₹349/day",
  //     price: "₹349/day",
  //     imageUrl: "https://picsum.photos/seed/splendor/400/260",
  //   },
  //   {
  //     name: "Toyota Fortuner",
  //     type: "SUV",
  //     description: "Booked this morning · ₹3299/day",
  //     price: "₹3299/day",
  //     imageUrl: "https://picsum.photos/seed/fortuner/400/260",
  //   },
  //   {
  //     name: "Volvo Bus",
  //     type: "Bus",
  //     description: "Booked yesterday · ₹4599/day",
  //     price: "₹4599/day",
  //     imageUrl: "https://picsum.photos/seed/volvobus/400/260",
  //   },
  //   {
  //     name: "TVS Apache",
  //     type: "Bike",
  //     description: "Booked today · ₹749/day",
  //     price: "₹749/day",
  //     imageUrl: "https://picsum.photos/seed/apache/400/260",
  //   },
  //   {
  //     name: "Honda City",
  //     type: "Car",
  //     description: "Booked today · ₹1599/day",
  //     price: "₹1599/day",
  //     imageUrl: "https://picsum.photos/seed/hondacity/400/260",
  //   },
  //   {
  //     name: "Ford EcoSport",
  //     type: "SUV",
  //     description: "Booked yesterday · ₹1799/day",
  //     price: "₹1799/day",
  //     imageUrl: "https://picsum.photos/seed/ecosport/400/260",
  //   },
  //   {
  //     name: "Bajaj Avenger",
  //     type: "Bike",
  //     description: "Booked today · ₹599/day",
  //     price: "₹599/day",
  //     imageUrl: "https://picsum.photos/seed/avenger/400/260",
  //   },
  //   {
  //     name: "Hyundai Verna",
  //     type: "Car",
  //     description: "Booked yesterday · ₹1399/day",
  //     price: "₹1399/day",
  //     imageUrl: "https://picsum.photos/seed/verna/400/260",
  //   },
  //   {
  //     name: "MG Hector",
  //     type: "SUV",
  //     description: "Booked today · ₹1899/day",
  //     price: "₹1899/day",
  //     imageUrl: "https://picsum.photos/seed/hector/400/260",
  //   },
  //   {
  //     name: "Tata Super Ace",
  //     type: "Bus",
  //     description: "Booked yesterday · ₹2199/day",
  //     price: "₹2199/day",
  //     imageUrl: "https://picsum.photos/seed/superace/400/260",
  //   },
  //   {
  //     name: "Royal Enfield Classic",
  //     type: "Bike",
  //     description: "Booked today · ₹999/day",
  //     price: "₹999/day",
  //     imageUrl: "https://picsum.photos/seed/classic/400/260",
  //   },
  // ];

  const recommendedVehicles = [
    {
      name: "Suzuki Gixxer",
      type: "Bike",
      description: "Recommended for quick city rides · ₹649/day",
      price: "₹649/day",
      imageUrl: "https://picsum.photos/seed/gixxer/400/260",
    },
    {
      name: "Honda Amaze",
      type: "Car",
      description: "Recommended for comfortable trips · ₹1199/day",
      price: "₹1199/day",
      imageUrl: "https://picsum.photos/seed/amaze/400/260",
    },
    {
      name: "Jeep Compass",
      type: "SUV",
      description: "Recommended for off-road travel · ₹2499/day",
      price: "₹2499/day",
      imageUrl: "https://picsum.photos/seed/compass/400/260",
    },
    {
      name: "Ashok Leyland Minibus",
      type: "Bus",
      description: "Recommended for group tours · ₹2999/day",
      price: "₹2999/day",
      imageUrl: "https://picsum.photos/seed/minibus2/400/260",
    },
    {
      name: "Bajaj Pulsar NS",
      type: "Bike",
      description: "Recommended for sporty rides · ₹799/day",
      price: "₹799/day",
      imageUrl: "https://picsum.photos/seed/pulsarns/400/260",
    },
    {
      name: "Hyundai Aura",
      type: "Car",
      description: "Recommended for daily driving · ₹1099/day",
      price: "₹1099/day",
      imageUrl: "https://picsum.photos/seed/aura/400/260",
    },
    {
      name: "Ford Endeavour",
      type: "SUV",
      description: "Recommended for family trips · ₹2799/day",
      price: "₹2799/day",
      imageUrl: "https://picsum.photos/seed/endeavour2/400/260",
    },
    {
      name: "Tata Yodha",
      type: "Bus",
      description: "Recommended for long journeys · ₹3499/day",
      price: "₹3499/day",
      imageUrl: "https://picsum.photos/seed/yodha/400/260",
    },
    {
      name: "TVS Raider",
      type: "Bike",
      description: "Recommended for easy city runs · ₹679/day",
      price: "₹679/day",
      imageUrl: "https://picsum.photos/seed/raider/400/260",
    },
    {
      name: "Kia Carens",
      type: "Car",
      description: "Recommended for family comfort · ₹1899/day",
      price: "₹1899/day",
      imageUrl: "https://picsum.photos/seed/carens/400/260",
    },
    {
      name: "Mahindra XUV700",
      type: "SUV",
      description: "Recommended for premium comfort · ₹3299/day",
      price: "₹3299/day",
      imageUrl: "https://picsum.photos/seed/xuv700/400/260",
    },
    {
      name: "Bharat Benz",
      type: "Bus",
      description: "Recommended for coach travel · ₹3899/day",
      price: "₹3899/day",
      imageUrl: "https://picsum.photos/seed/bharatbenz/400/260",
    },
  ];


 
  
 

  const allVehicles = [...popularVehicles, ...recommendedVehicles];
  const likedVehicles = allVehicles.filter((vehicle) => likedVehicleNames.includes(vehicle.name));

  const renderContent = () => {
    if (active === "wishlist") {
      return (
        <div style={{ paddingTop: "24px" }}>
          <CustomerSidebarWishlist
            likedVehicles={likedVehicles}
            onViewDetails={onViewDetails}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      );
    }

    return (
      <>
        <section style={{ ...styles.panel, ...styles.fullWidthSection, ...styles.statsSection }}>
          <div style={styles.statsRow}>
            {dashboardStats.map((item) => (
              <div key={item.label} style={styles.statCard}>
                <div style={{ ...styles.statIcon, background: item.accent + "22", color: item.accent }}>
                  {item.icon}
                </div>
                <div>
                  <div style={styles.statLabel}>{item.label}</div>
                  <div style={styles.statValue}>{item.value}</div>
                  <div style={styles.statSub}>{item.action}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ ...styles.panel, ...styles.fullWidthSection, ...styles.dashboardOfferSection }}>
            <div style={styles.offerHeader}>
              <div>
                <h3 style={styles.panelTitle}>Today's Offers</h3>
                <p style={styles.panelText}>Automatic owner-only offers for bike, car, SUV and truck rentals.</p>
              </div>
            </div>
            <div style={styles.offersCarousel}>
              <button type="button" style={styles.carouselArrow} onClick={handlePrevOffer}>
                &lt;
              </button>
              <div style={styles.offerSlide}>
                <span style={styles.offerChip}>{dashboardOffers[offerIndex].tag}</span>
                <h4 style={styles.offerTitle}>{dashboardOffers[offerIndex].title}</h4>
                <p style={styles.offerSubtitle}>{dashboardOffers[offerIndex].subtitle}</p>
                <p style={styles.offerDetail}>{dashboardOffers[offerIndex].detail}</p>
                <div style={styles.offerMeta}>
                  <span>{offerIndex + 1} of {dashboardOffers.length}</span>
                </div>
              </div>
              <button type="button" style={styles.carouselArrow} onClick={handleNextOffer}>
                &gt;
              </button>
            </div>
          </section>
         <section style={{ ...styles.panel, ...styles.fullWidthSection, ...styles.popularSection }}>
            <div style={styles.offerHeader}>
              <div>
                <h3 style={styles.panelTitle}>Popular Vehicles</h3>
                <p style={styles.panelText}>Browse top customer favorites with availability, charges, and quick access.</p>
              </div>
            </div>
            <div style={styles.popularGrid}>
              {popularVehicles.map((vehicle) => (
                <div key={vehicle.name} style={styles.popularCard}>
                  <button
                    type="button"
                    style={{
                      ...styles.heartButton,
                      ...(likedVehicleNames.includes(vehicle.name)
                        ? { background: "#fee2e2", color: "#ef4444" }
                        : {}),
                    }}
                    aria-label="Like vehicle"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleWishlist(vehicle);
                    }}
                  >
                    ❤
                  </button>
                  <div style={{ marginBottom: "12px", borderRadius: "16px", overflow: "hidden", background: "#f3f4f6" }}>
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = carImage;
                      }}
                      style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={styles.popularCardContent}>
                    <h4 style={styles.popularCardTitle}>{vehicle.name}</h4>
                    <p style={styles.popularCardSubtitle}>{vehicle.type}</p>
                    <p style={styles.popularCardInfo}>{vehicle.description}</p>
                    <div style={styles.popularCardFooter}>
                      <button type="button" style={styles.viewDetailsButton} onClick={onViewDetails}>
                        View Details
                      </button>
                      <span style={styles.popularPrice}>{vehicle.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
           <section style={{ ...styles.panel, ...styles.fullWidthSection, ...styles.popularSection }}>
            <div style={styles.offerHeader}>
              <div>
                <h3 style={styles.panelTitle}>Recommended for You</h3>
                <p style={styles.panelText}>Personalized vehicle picks based on your preferences.</p>
              </div>
            </div>
            <div style={styles.popularGrid}>
              {recommendedVehicles.map((vehicle) => (
                <div key={vehicle.name} style={styles.popularCard}>
                  <button
                    type="button"
                    style={{
                      ...styles.heartButton,
                      ...(likedVehicleNames.includes(vehicle.name)
                        ? { background: "#fee2e2", color: "#ef4444" }
                        : {}),
                    }}
                    aria-label="Like vehicle"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleWishlist(vehicle);
                    }}
                  >
                    ❤
                  </button>
                  <div style={{ marginBottom: "12px", borderRadius: "16px", overflow: "hidden", background: "#f3f4f6" }}>
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = carImage;
                      }}
                      style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={styles.popularCardContent}>
                    <h4 style={styles.popularCardTitle}>{vehicle.name}</h4>
                    <p style={styles.popularCardSubtitle}>{vehicle.type}</p>
                    <p style={styles.popularCardInfo}>{vehicle.description}</p>
                    <div style={styles.popularCardFooter}>
                      <button type="button" style={styles.viewDetailsButton} onClick={onViewDetails}>
                        View Details
                      </button>
                      <span style={styles.popularPrice}>{vehicle.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
      </>
    );
  };

  return (
    <div className="booking-details-shell">
      <Sidebar active={active} onSelect={(k) => setActive(k)} onLogout={onLogout} />
      <div className="booking-page-content">
        <header className="booking-topbar">
          <div className="booking-brand">
            <div className="booking-brand-logo">🚗</div>
            <div>
              <div className="booking-brand-name">VehicleHub</div>
              <div className="booking-brand-subtitle">Book your next ride</div>
            </div>
          </div>

          <div className="booking-topbar-search-row">
            <div className="booking-search-wrapper">
              <div className="topbar-search">
                <span>🔍</span>
                <input
                  type="text"
                  aria-label="Search vehicles"
                  placeholder="Search by vehicle name, city, Area, pincode..."
                />
              </div>
              <button type="button" className="topbar-search-button">
                Search
              </button>

              <div className="search-dropdown">
                <div className="search-field">
                  <span>🚗</span>
                  <div>
                    <label htmlFor="searchVehicle">Vehicle Name</label>
                    <strong>
                      <input
                        id="searchVehicle"
                        type="text"
                        placeholder="Enter vehicle name"
                      />
                    </strong>
                  </div>
                </div>
                <div className="search-field">
                  <span>🏙️</span>
                  <div>
                    <label htmlFor="searchCity">City</label>
                    <strong>
                      <input
                        id="searchCity"
                        type="text"
                        placeholder="Enter city"
                      />
                    </strong>
                  </div>
                </div>
                <div className="search-field">
                  <span>📍</span>
                  <div>
                    <label htmlFor="searchArea">Area</label>
                    <strong>
                      <input
                        id="searchArea"
                        type="text"
                        placeholder="Enter area"
                      />
                    </strong>
                  </div>
                </div>
                <div className="search-field">
                  <span>📮</span>
                  <div>
                    <label htmlFor="searchPincode">Pincode</label>
                    <strong>
                      <input
                        id="searchPincode"
                        type="text"
                        placeholder="Enter pincode"
                      />
                    </strong>
                  </div>
                </div>
                <button type="button" className="search-button">
                  Search Vehicles
                </button>
              </div>
            </div>
          </div>

          <div className="booking-topbar-actions">
            <button type="button" className="topbar-icon-button" aria-label="Notifications">
              🔔
            </button>
            <button type="button" className="topbar-avatar-button" aria-label="Profile">
              <img src={profilePlaceholder} alt="Customer profile" />
            </button>
          </div>
        </header>
        {renderContent()}

        <section style={{ ...styles.footerSection, ...styles.fullWidthSection }}>
          <div style={styles.footerInner}>
            <div style={styles.footerBrand}>
              <h3 style={styles.footerBrandTitle}>RentWheels</h3>
              <p style={styles.footerBrandText}>
                Convenient vehicle rentals for every journey, powered by smart booking and trusted service.
              </p>
            </div>
            <div style={styles.footerLinks}>
              <div style={styles.footerColumn}>
                <h4 style={styles.footerHeading}>Explore</h4>
                <button type="button" style={styles.footerLink}>Home</button>
                <button type="button" style={styles.footerLink}>Vehicles</button>
                <button type="button" style={styles.footerLink}>Offers</button>
              </div>
              <div style={styles.footerColumn}>
                <h4 style={styles.footerHeading}>Support</h4>
                <button type="button" style={styles.footerLink}>How It Works</button>
                <button type="button" style={styles.footerLink}>About Us</button>
                <button type="button" style={styles.footerLink}>Contact</button>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <span style={styles.footerCopyright}>© 2026 RentWheels. All rights reserved.</span>
            <span style={styles.footerContact}>Contact: support@rentwheels.com</span>
          </div>
        </section>
      </div>      
    </div>
     
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    background: "#f4f7fb",
    padding: "24px",
    fontFamily: "Inter, sans-serif",
    color: "#1a1f3d",
    marginLeft: 260,
    width: "calc(100% - 260px)",
    boxSizing: "border-box",
  },
  statsSection: {
    marginTop: "83px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(15, 122, 52, 0.05)",
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
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "24px",
  },
  fullWidthSection: {
    gridColumn: "1 / -1",
  },
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    minHeight: "420px",
    maxHeight: "420px",
    overflow: "hidden",
  },
  panel: {
    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 40px rgba(31, 45, 73, 0.06)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "12px",
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
  actionButton: {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "none",
    background: "#0f7a34",
    color: "white",
    cursor: "pointer",
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
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: "16px",
  },
  offerSlide: {
    background: "#ecfdf5",
    border: "1px solid #d1fae5",
    borderRadius: "20px",
    padding: "24px 24px 32px",
    boxShadow: "0 18px 32px rgba(15, 23, 42, 0.08)",
    marginBottom: "40px",
  },
  offerChip: {
    display: "inline-flex",
    padding: "10px 16px",
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
    margin: "12px 0",
    color: "#475569",
    lineHeight: 1.6,
  },
  offerDetail: {
    color: "#334155",
    fontWeight: 600,
  },
  offerMeta: {
    marginTop: "18px",
    color: "#64748b",
    fontSize: "0.95rem",
  },
  carouselArrow: {
    border: "none",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
  },
  popularSection: {
    marginTop: "10px",
  },
  popularGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "18px",
  },
  popularCard: {
    position: "relative",
    background: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.08)",
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
    border: "1px solid rgba(15, 23, 42, 0.12)",
    background: "#ffffff",
    color: "#ef4444",
    fontSize: "1rem",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    zIndex: 1,
  },
  popularCardContent: {
    padding: "0 20px 20px",
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
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "10px",
  },
  viewDetailsButton: {
    padding: "10px 16px",
    borderRadius: "14px",
    border: "none",
    background: "#0f7a34",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  popularPrice: {
    fontWeight: 700,
    color: "#0f7a34",
  },
  vehicleTypes: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "14px",
  },
  typeCard: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  typeIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "#e6f5ea",
    color: "#0f7a34",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
  },
  typeLabel: {
    fontWeight: 700,
  },
  typeDetail: {
    fontSize: "13px",
    color: "#6f7c92",
  },
  offerSection: {
    marginBottom: "8px",
  },
  footerSection: {
    marginTop: "24px",
    background: "#0c1726",
    padding: "32px",
    color: "#f8fafc",
  },
  footerInner: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr",
    gap: "24px",
    alignItems: "flex-start",
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
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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
    justifyContent: "space-between",
    gap: "12px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "18px",
  },
  footerCopyright: {
    color: "#9ca3af",
  },
  footerContact: {
    color: "#9ca3af",
  },
  offerBanner: {
    background: "linear-gradient(135deg, #e6f5ea 0%, #f6fff9 100%)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    border: "1px solid #d7ebdc",
  },
  offerBadge: {
    display: "inline-flex",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#fff",
    color: "#0f7a34",
    fontWeight: 700,
    fontSize: "12px",
    marginBottom: "10px",
  },
  offerCode: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#0f7a34",
    fontWeight: 700,
  },
  bannerButton: {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "none",
    background: "#0f7a34",
    color: "white",
    cursor: "pointer",
  },
  verticalScrollList: {
    display: "grid",
    gap: "12px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  vehicleRow: {
    display: "grid",
    gridTemplateColumns: "72px 1fr auto",
    gap: "12px",
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid #edf2f7",
    background: "#f8fafc",
    alignItems: "center",
  },
  vehicleInfo: {
    display: "grid",
    gap: "6px",
  },
  vehicleName: {
    fontWeight: 700,
  },
  vehicleMeta: {
    fontSize: "13px",
    color: "#6f7c92",
  },
  flatButton: {
    padding: "10px 14px",
    borderRadius: "14px",
    border: "1px solid #d5d9e4",
    background: "white",
    cursor: "pointer",
  },
  recommendedSection: {
    marginTop: "4px",
  },
  recommendedScrollContainer: {
    maxHeight: "320px",
    overflowY: "auto",
    paddingRight: "6px",
  },
  recommendedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  recommendedCard: {
    display: "grid",
    gap: "8px",
    padding: "16px",
    borderRadius: "20px",
    border: "1px solid #edf2f7",
    background: "#f8fafc",
  },
  linkText: {
    background: "none",
    border: "none",
    color: "#0f7a34",
    fontWeight: 700,
    cursor: "pointer",
  },
};

