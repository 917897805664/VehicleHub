import React, { useEffect, useState } from "react";
import carImage from "./assets/car_image.jpg";
import bikeIcon from "./assets/bike_icon.jpg";
import carIcon from "./assets/car_icon.jpg";
import suvIcon from "./assets/suv_icon.jpg";
import truckIcon from "./assets/truck_icon.jpg";
import busIcon from "./assets/bus_icon.jpg";
import scooterIcon from "./assets/scooter_icon.jpg";
import ViewVehicleDetails from "./ViewVehicleDetails";

export default function LandingPage({
  onLoginClick,
  onRegisterClick,
  onViewDetailsClick,
  onHomeClick,
  onVehiclesClick,
  showVehicleDetails = false,
  selectedVehicle = null,
  onBackFromVehicleDetails,
  onBookVehicle,
}) {
  const vehicleTags = [
    { label: "Bike", icon: bikeIcon },
    { label: "Car", icon: carIcon },
    { label: "SUV", icon: suvIcon },
    { label: "Truck", icon: truckIcon },
    { label: "Bus", icon: busIcon },
    { label: "Scooter", icon: scooterIcon },
   
  ];

  const popularVehicles = Array.from({ length: 16 }, (_, index) => ({
    name: `Vehicle ${index + 1}`,
    type: index % 2 === 0 ? "Car" : "SUV",
    status: index % 3 === 0 ? "Available" : "Booked",
    price: `₹${799 + index * 50}/day`,
    image: carImage,
  }));

  const recommendedVehicles = Array.from({ length: 28 }, (_, index) => ({
    name: `Recommended ${index + 1}`,
    type: index % 3 === 0 ? "Bike" : index % 3 === 1 ? "Car" : "SUV",
    status: index % 2 === 0 ? "Available" : "Unavailable",
    price: `₹${499 + index * 40}/day`,
    image: carImage,
  }));

  const vehicleCategories = [
    "Two Wheelers",
    "Four Wheelers",
    "Group Travel Vehicles",
    "Electric Vehicles",
    "Transportation Vehicle",
  ];

  const offers = [
    {
      title: "Bike Rental Flash Deal",
      subtitle: "Save 25% on premium bike rentals today.",
      detail: "Owner-only offer: promote your bike inventory with a fast booking boost.",
      tag: "Bike Offer",
    },
    {
      title: "Car Weekend Special",
      subtitle: "Get an extra discount on weekend car rentals.",
      detail: "Feature this offer for car owners and attract more short-trip customers.",
      tag: "Car Offer",
    },
    {
      title: "SUV Family Saver",
      subtitle: "Showcase your SUV fleet with a family-trip promotion.",
      detail: "Perfect for larger groups and weekend family travel bookings.",
      tag: "SUV Offer",
    },
    {
      title: "Truck Business Booking",
      subtitle: "Offer special rates for commercial and moving trips.",
      detail: "Advertise your truck availability for quick local deliveries.",
      tag: "Truck Offer",
    },
    {
      title: "All-Vehicle Loyalty Bonus",
      subtitle: "Reward repeat renters across all vehicle categories.",
      detail: "Boost owner visibility by highlighting loyalty pricing and benefits.",
      tag: "Owner Promotion",
    },
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5500);
    return () => clearInterval(autoplay);
  }, [offers.length]);

  const handlePrevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="brand-row">
          <div className="brand-logo-shell" aria-hidden="true">
            <span className="brand-logo">🚗</span>
          </div>
          <div>
            <div className="brand-name">VehicleHub</div>
            <div className="brand-tagline">Safe, reliable, affordable rides</div>
          </div>
        </div>

        <nav className="navbar-menu" aria-label="Primary navigation">
          <button type="button" className="nav-link" onClick={onHomeClick}>
            Home
          </button>
          <button type="button" className="nav-link" onClick={onVehiclesClick}>
            Vehicles
          </button>
          <a href="#how-it-works">How It Works</a>
          <a href="#offers">Offers</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="navbar-actions">
          <button type="button" className="nav-btn nav-outline" onClick={onLoginClick}>
            Login
          </button>
          <button type="button" className="nav-btn nav-primary" onClick={onRegisterClick}>
            Register
          </button>
        </div>
      </header>

      {showVehicleDetails ? (
        <main className="landing-inline-details">
          <ViewVehicleDetails
            vehicle={selectedVehicle}
            onBack={onBackFromVehicleDetails}
            onBookVehicle={onBookVehicle}
            showFooter={false}
          />
        </main>
      ) : (
        <>
          <main className="hero-container" id="home">
            <section className="hero-copy-block">
              <span className="hero-pill">SAFE • RELIABLE • AFFORDABLE</span>
              <h1>
                Rent Any Vehicle,
                <br />
                Anytime, <span className="hero-highlight">Anywhere</span>
              </h1>
              <p className="hero-text">
                Find the perfect vehicle for your next trip. Choose from thousands of cars, bikes,
                trucks and more.
              </p>

              <div className="hero-search-card">
                <div className="search-field">
                  <span>📍</span>
                  <div>
                    <label>Current Location</label>
                    <strong>Current Location</strong>
                  </div>
                </div>
                <div className="search-field">
                  <span>📍</span>
                  <div>
                    <label>Select Location</label>
                    <strong>Choose destination</strong>
                  </div>
                </div>
                <button type="button" className="search-button">
                  Search Vehicles
                </button>
              </div>

              <div className="vehicle-tags">
                {vehicleTags.map((item) => (
                  <button key={item.label} type="button" className="vehicle-tag-item">
                    <div className="vehicle-tag-icon">
                      <img src={item.icon} alt={`${item.label} icon`} />
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="hero-visual" aria-label="Hero image and offers">
              <img className="hero-car" src={carImage} alt="Featured rental car" />
            </section>
          </main>

          <section className="category-row">
            <div className="category-row-inner">
              {vehicleCategories.map((category) => (
                <div key={category} className="category-chip">
                  {category}
                </div>
              ))}
            </div>
          </section>

          <section className="offers-row" id="offers">
            <div className="offers-panel full-width-offers">
              <div className="section-heading">
                <h2>Today's Offers</h2>
                <p>Automatic owner-only offers for bike, car, SUV and truck rentals.</p>
              </div>
              <div className="offers-carousel">
                <button type="button" className="carousel-arrow carousel-arrow-left" onClick={handlePrevOffer}>
                  &lt;
                </button>
                <div className="offer-slide">
                  <span className="offer-chip">{offers[currentOffer].tag}</span>
                  <h3>{offers[currentOffer].title}</h3>
                  <p>{offers[currentOffer].subtitle}</p>
                  <p className="offer-detail">{offers[currentOffer].detail}</p>
                  <div className="offer-meta">
                    <span>{currentOffer + 1} of {offers.length}</span>
                  </div>
                </div>
                <button type="button" className="carousel-arrow carousel-arrow-right" onClick={handleNextOffer}>
                  &gt;
                </button>
              </div>
            </div>
          </section>

          <section className="vehicle-section" id="vehicles">
            <div className="vehicle-section-header">
              <div>
                <h2>Popular Vehicles</h2>
                <p>Explore our top vehicle picks for a smooth and safe ride.</p>
              </div>
            </div>
            <div className="vehicle-card-grid">
              {popularVehicles.map((vehicle) => (
                <article key={vehicle.name} className="vehicle-card">
                  <img className="vehicle-card-media" src={vehicle.image} alt={vehicle.name} />
                  <div className="vehicle-card-meta">
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.type}</p>
                    <p className={vehicle.status === "Available" ? "status-available" : "status-unavailable"}>{vehicle.status}</p>
                    <p className="vehicle-price">{vehicle.price}</p>
                  </div>
                  <div className="vehicle-card-footer">
                    <span></span>
                    <button type="button" className="view-details-button" onClick={() => onViewDetailsClick(vehicle)}>
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="vehicle-section recommended-section">
            <div className="vehicle-section-header">
              <div>
                <h2>Recommended for You</h2>
                <p>Handpicked rides tailored to your search preferences.</p>
              </div>
            </div>
            <div className="vehicle-card-grid">
              {recommendedVehicles.map((vehicle) => (
                <article key={vehicle.name} className="vehicle-card">
                  <img className="vehicle-card-media" src={vehicle.image} alt={vehicle.name} />
                  <div className="vehicle-card-meta">
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.type}</p>
                    <p className={vehicle.status === "Available" ? "status-available" : "status-unavailable"}>{vehicle.status}</p>
                    <p className="vehicle-price">{vehicle.price}</p>
                  </div>
                  <div className="vehicle-card-footer">
                    <span></span>
                    <button type="button" className="view-details-button" onClick={() => onViewDetailsClick(vehicle)}>
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section> 

        </>
      )}

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <div>
            <h3>RentWheels</h3>
            <p>Convenient vehicle rentals for every journey, powered by smart booking and trusted service.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#vehicles">Vehicles</a>
              <a href="#offers">Offers</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 RentWheels. All rights reserved.</span>
          <span>Contact: support@rentwheels.com</span>
        </div>
      </footer>
    </div>
  );
}



