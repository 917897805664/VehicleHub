import React, { useEffect } from "react";
import carImage from "./assets/car_image.jpg";

export default function ViewVehicleDetails({ vehicle, onBack, onBookVehicle, showFooter = true }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
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
    description: "Comfortable hatchback with spacious seating and smooth city drive.",
    imageUrl: carImage,
    owner: {
      name: "Amit Sharma",
      rating: "4.7",
      reviews: 89,
      joined: "Jan 2022",
      phone: "+91 98765 43210",
      email: "amit.sharma@example.com",
    },
  };

  const mainVehicle = {
    ...defaultVehicle,
    ...(vehicle || {}),
    owner: {
      ...defaultVehicle.owner,
      ...(vehicle?.owner || {}),
    },
  };

  const imageSources = [
    mainVehicle.imageUrl || carImage,
    carImage,
    carImage,
    carImage,
    carImage,
  ];

  const visibleThumbnails = imageSources.slice(0, 3);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [calendarDate, setCalendarDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);

  const availableDates = new Set([16, 17, 18, 19, 20, 23]);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthName = calendarDate.toLocaleString("default", { month: "long" });
  const year = calendarDate.getFullYear();
  const monthIndex = calendarDate.getMonth();
  const firstDayIndex = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const calendarCells = Array.from({ length: 42 }, (_, idx) => {
    const dayNumber = idx - firstDayIndex + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const handlePrevMonth = () => {
    setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (!day || !availableDates.has(day)) return;
    setSelectedDate(day);
  };

  const features = [
    { icon: "⛽", label: "Fuel Type", value: mainVehicle.fuel },
    { icon: "⚡", label: "Mileage", value: "18 km/l" },
    { icon: "⚙️", label: "Transmission", value: mainVehicle.transmission },
    { icon: "👥", label: "Seating Capacity", value: mainVehicle.seats },
    { icon: "🛠️", label: "Engine", value: "1197 cc" },
    { icon: "💪", label: "Power", value: "82 bhp" },
    { icon: "🧳", label: "Boot Space", value: "311 L" },
    { icon: "❄️", label: "Air Conditioner", value: "Yes" },
    { icon: "🔊", label: "Bluetooth", value: "Yes" },
    { icon: "🔌", label: "USB Charger", value: "Yes" },
    { icon: "🎵", label: "Music System", value: "Yes" },
  ];

  const ownerPolicies = [
    { icon: "🚭", title: "Smoking", subtitle: "Not Allowed" },
    { icon: "🐾", title: "Pets", subtitle: "Not Allowed" },
    { icon: "👤", title: "Driver Age", subtitle: "Above 21 yrs" },
    { icon: "⛽", title: "Fuel Policy", subtitle: "Same to Same" },
    { icon: "📏", title: "Kilometer Limit", subtitle: "250 km/day" },
    { icon: "⏳", title: "Cancellation", subtitle: "Free till 24 hrs" },
  ];

  const handleBookNow = () => {
    if (typeof onBookVehicle === "function") {
      onBookVehicle();
    }
  }; 

  return (
    <div className="view-details-shell">
      <div className="view-details-main">
        <header className="detail-topbar">
          <div className="detail-topbar-left">
            <button type="button" className="detail-back-button" onClick={onBack}>
              ← Back
            </button>
          </div>
        </header>

        <div className="detail-main-scroll">
          <div className="detail-main-grid">
            <section className="detail-gallery">
              <div className="detail-image-placeholder">
                <img src={imageSources[activeImageIndex]} alt="Vehicle preview" />
              </div>
              <div className="thumbnail-row">
                {visibleThumbnails.map((src, index) => {
                  const isLastVisibleThumbnail = index === visibleThumbnails.length - 1;
                  const remainingCount = imageSources.length - visibleThumbnails.length;

                  return (
                    <button
                      key={index}
                      type="button"
                      className={`thumbnail-item ${index === activeImageIndex ? "thumbnail-active" : ""}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={src} alt={`Vehicle thumbnail ${index + 1}`} />
                      {isLastVisibleThumbnail && remainingCount > 0 && (
                        <span className="thumbnail-more-overlay">+{remainingCount}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className="detail-summary">
              <div className="detail-summary-top">
                <h2>{mainVehicle.name}</h2>
                <div className="detail-badges">
                  <span>{mainVehicle.fuel}</span>
                  <span>{mainVehicle.transmission}</span>
                  <span>{mainVehicle.seats}</span>
                </div>
              </div>

              <div className="detail-summary-body">
                <p className="vehicle-detail-text">Comfortable hatchback with spacious seating and smooth city drive.</p>

                <div className="detail-vehicle-details">
                  <h3>Vehicle Details</h3>
                  <div className="detail-spec-list">
                    <div className="detail-spec-item">
                      <span>Fuel Type</span>
                      <strong>{mainVehicle.fuel}</strong>
                    </div>
                    <div className="detail-spec-item">
                      <span>Transmission</span>
                      <strong>{mainVehicle.transmission}</strong>
                    </div>
                    <div className="detail-spec-item">
                      <span>Mileage</span>
                      <strong>18 km/l</strong>
                    </div>
                    <div className="detail-spec-item">
                      <span>Seats Capacity</span>
                      <strong>{mainVehicle.seats}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-summary-meta">
                  <div>
                    <strong>Distance</strong>
                    <span>{mainVehicle.distance}</span>
                  </div>
                  <div>
                    <strong>Rating</strong>
                    <span>{mainVehicle.rating} / 5 ({mainVehicle.reviews} reviews)</span>
                  </div>
                </div>

                <div className="detail-charges">
                  <div className="charge-block">
                    <span>Per hour</span>
                    <strong>{mainVehicle.priceHour}</strong>
                  </div>
                  <div className="charge-block">
                    <span>Per day</span>
                    <strong>{mainVehicle.priceDay}</strong>
                  </div>
                  <div className="charge-block">
                    <span>Per week</span>
                    <strong>{mainVehicle.priceWeek}</strong>
                  </div>
                </div>

                <div className="detail-actions">
                  <button type="button" className="primary-button full-width-button" onClick={handleBookNow}>Book Now</button>
                </div>
              </div>
            </aside>
          </div>

          <div className="detail-content-grid">
            <article className="detail-card vehicle-description-card">
              <h2>Vehicle Description</h2>
              <p>
                This Hyundai i20 is in excellent condition. Well maintained and regularly serviced.
                Perfect for city rides and long drives. Comfortable seating, smooth drive and great
                mileage.
              </p>
              <div className="vehicle-features-header">
                <h3>Vehicle Features</h3>
              </div>
              <div className="vehicle-features-grid">
                {features.map((feature) => (
                  <div key={feature.label} className="feature-block">
                    <div className="feature-icon-badge">{feature.icon}</div>
                    <div className="feature-text">
                      <strong>{feature.label}</strong>
                      <span>{feature.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="owner-policies-section">
                <div className="owner-policies-header">
                  <h3>Owner Policies</h3>
                </div>
                <div className="owner-policies-grid">
                  {ownerPolicies.map((policy) => (
                    <div key={policy.title} className="policy-block">
                      <div className="policy-icon-badge">{policy.icon}</div>
                      <div className="policy-text">
                        <strong>{policy.title}</strong>
                        <span>{policy.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="detail-card owner-details-card">
              <div className="owner-details-head owner-details-center">
                <div className="owner-avatar-circle">
                  <img src={carImage} alt={mainVehicle.owner.name} />
                </div>
                <div className="owner-details-info">
                  <h3>{mainVehicle.owner.name}</h3>
                  <p>Verified owner • Member since {mainVehicle.owner.joined}</p>
                </div>
              </div>

              <div className="owner-contact-list">
                <div className="owner-contact-item">
                  <span>Phone</span>
                  <strong>{mainVehicle.owner.phone}</strong>
                </div>
                <div className="owner-contact-item">
                  <span>Email</span>
                  <strong>{mainVehicle.owner.email}</strong>
                </div>
              </div>

              <div className="owner-detail-actions">
                <button type="button" className="primary-button owner-action-btn owner-chat-btn">Chat With Owner</button>
                <button type="button" className="secondary-button owner-action-btn">View Profile</button>
              </div>
            </article>

            <article className="detail-card availability-card">
              <div className="availability-header">
                <div>
                  <h2>Availability</h2>
                </div>
                <div className="calendar-nav">
                  <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth}>
                    ←
                  </button>
                  <span className="calendar-month-label">{monthName} {year}</span>
                  <button type="button" className="calendar-nav-btn" onClick={handleNextMonth}>
                    →
                  </button>
                </div>
              </div>

              <div className="calendar-grid">
                {daysOfWeek.map((day) => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}

                {calendarCells.map((day, index) => {
                  const isSelected = day && day === selectedDate;
                  const isAvailable = day && availableDates.has(day);
                  const isBooked = day && !availableDates.has(day);
                  return (
                    <button
                      key={`${day}-${index}`}
                      type="button"
                      className={`calendar-day-cell ${day ? "" : "calendar-empty"} ${isAvailable ? "calendar-available" : ""} ${isBooked ? "calendar-booked" : ""} ${isSelected ? "calendar-selected" : ""}`}
                      onClick={() => handleDateClick(day)}
                      disabled={!day || !isAvailable}
                    >
                      {day || ""}
                    </button>
                  );
                })}
              </div>

              <div className="calendar-legend">
                <div>
                  <span className="legend-dot available"></span>
                  Available
                </div>
                <div>
                  <span className="legend-dot booked"></span>
                  Booked
                </div>
              </div>
            </article>

            <article className="detail-card ratings-card">
              <div className="ratings-header">
                <h2>What others say about this vehicle</h2>
              </div>
              <div className="ratings-main-grid">
                <div className="ratings-score-panel">
                  <div className="rating-value">4.5</div>
                  <div className="rating-subtext">Out of 5</div>
                  <div className="rating-stars">★★★★★</div>
                  <div className="rating-review-count">(126 Reviews)</div>
                </div>
                <div className="rating-breakdown-panel">
                  {[
                    { label: '5 ★', value: 80 },
                    { label: '4 ★', value: 12 },
                    { label: '3 ★', value: 5 },
                    { label: '2 ★', value: 2 },
                    { label: '1 ★', value: 1 },
                  ].map((row) => (
                    <div key={row.label} className="rating-bar-row">
                      <span className="rating-bar-label">{row.label}</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${row.value}%` }} />
                      </div>
                      <span className="rating-bar-value">{row.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="detail-card reviews-card">
              <div className="reviews-header">
                <div>
                  <h2>Reviews</h2>
                </div>
                <a href="/reviews" className="view-all-reviews">View All Reviews</a>
              </div>

              <div className="review-item-card">
                <div className="review-avatar">RV</div>
                <div className="review-body">
                  <div className="review-meta-row">
                    <strong>Rohit Verma</strong>
                    <span>May 10, 2024</span>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <p>Very good car in this price range. Neat and clean.</p>
                </div>
              </div>

              <div className="review-item-card">
                <div className="review-avatar">PN</div>
                <div className="review-body">
                  <div className="review-meta-row">
                    <strong>Pooja Nair</strong>
                    <span>May 05, 2024</span>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <p>Smooth ride and excellent service by the owner.</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>

      {showFooter && (
        <div className="site-footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <h2 className="footer-brand-name">RentWheels</h2>
                <p className="footer-brand-copy">Convenient vehicle rentals for every journey, powered by smart booking and trusted service.</p>
              </div>

              <div className="footer-links">
                <div>
                  <h4>Explore</h4>
                  <a href="/">Home</a>
                  <a href="/vehicles">Vehicles</a>
                  <a href="/offers">Offers</a>
                </div>
                <div>
                  <h4>Support</h4>
                  <a href="/how-it-works">How It Works</a>
                  <a href="/about">About Us</a>
                  <a href="/contact">Contact</a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div>© {new Date().getFullYear()} RentWheels. All rights reserved.</div>
              <div>Contact: <a href="mailto:support@rentwheels.com">support@rentwheels.com</a></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
