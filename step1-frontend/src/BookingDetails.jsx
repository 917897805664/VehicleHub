import React, { useState } from "react";
import Sidebar from "./Sidebar";
import carImage from "./assets/car_image.jpg";
import profilePlaceholder from "./assets/profile_placeholder.svg";

export default function BookingDetails({ onBack }) {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [driverOption, setDriverOption] = useState("self");
  const [currentStep, setCurrentStep] = useState(1);

  const bookingId = "RR1234567890";
  const paymentMethod = "Paid Successfully via Razorpay";
  const pickupDateText = pickupDate
    ? new Date(pickupDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "16 May 2024";
  const dropDateText = dropDate
    ? new Date(dropDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "18 May 2024";
  const pickupDateTimeText = pickupDate && pickupTime ? `${pickupDateText}, ${pickupTime}` : "16 May 2024, 10:00 AM";
  const dropDateTimeText = dropDate && dropTime ? `${dropDateText}, ${dropTime}` : "18 May 2024, 10:00 AM";
  const pickupLocationText = pickupLocation || "HSR Layout, Bangalore, Karnataka 560102";
  const dropLocationText = dropLocation || "Koramangala, Bangalore, Karnataka 560034";
  const tripDurationDays = 2;

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const selectedVehicle = {
    name: "Hyundai i20",
    details: "Petrol • Manual • 5 Seater",
    rating: "4.5",
    reviews: 126,
    distance: "1.2 km away",
    priceHour: "₹149",
    priceHourValue: 149,
    priceDay: "₹1499",
    priceDayValue: 1499,
    priceWeek: "₹8999",
    fuel: "Petrol",
    transmission: "Manual",
    seats: "5 Seater",
    mileage: "18 km/l",
    deposit: "₹5000",
    DriverCharges: "₹500",
    DriverChargesValue: 500,
    DeliveryCharges: "₹300",
    DeliveryChargesValue: 300,
    SecurityDeposit: "₹5000",
    SecurityDepositValue: 5000,
    Discount: "₹599.60",
    DiscountValue: 599.6,
  };

  const totalAmountValue =
    selectedVehicle.priceDayValue * tripDurationDays +
    selectedVehicle.DriverChargesValue * tripDurationDays +
    selectedVehicle.DeliveryChargesValue +
    selectedVehicle.SecurityDepositValue -
    selectedVehicle.DiscountValue;
  const formattedTotalAmount = `₹${totalAmountValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handlePaymentSuccess = () => {
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="booking-details-shell">
      <Sidebar active="search" />
      <div className="booking-page-content">
        <header className="booking-topbar">
          <div className="booking-brand">
            <div className="booking-brand-logo">🚗</div>
            <div>
              <div className="booking-brand-name">VehicleHub</div>
              <div className="booking-brand-subtitle">Book your next ride in minutes</div>
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

        <div className="booking-content">
          <div className="booking-page-header-row">
            <button type="button" className="back-link" onClick={handleBack}>
              ← Back
            </button>
            <div className="booking-header-text">
              <h1>Vehicle Booking</h1>
              <p>Fill in your booking details to continue</p>
            </div>
          </div>

          <div className="booking-steps-row">
            <div className={`step-pill ${currentStep === 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <strong>Booking Details</strong>
            </div>
            <div className={`step-pill ${currentStep === 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <strong>Booking Summary</strong>
            </div>
            <div className={`step-pill ${currentStep === 3 ? "active" : ""}`}>
              <span className="step-number">3</span>
              <strong>Payment</strong>
            </div>
            <div className={`step-pill ${currentStep === 4 ? "active" : ""}`}>
              <span className="step-number">4</span>
              <strong>Booking Confirmation</strong>
            </div>
          </div>

          <div className="booking-grid">
            <section className="booking-card booking-form-card">
              <div className="section-heading">
                <h2>
                  {currentStep === 1
                    ? "Trip Details"
                    : currentStep === 2
                    ? "Booking Summary"
                    : "Payment"}
                </h2>
              </div>

              {currentStep === 1 && (
                <>
                  <div className="vehicle-preview-row">
                    <img src={carImage} alt={selectedVehicle.name} />
                    <div className="vehicle-preview-info">
                      <strong>{selectedVehicle.name}</strong>
                      <p>{selectedVehicle.details}</p>
                      <div className="vehicle-pricing-row">
                        <span>{selectedVehicle.priceHour} / hr</span>
                        <span>{selectedVehicle.priceDay} / day</span>
                        <span>{selectedVehicle.priceWeek} / wk</span>
                      </div>
                    </div>
                  </div>
                  <div className="trip-fields-grid">
                    <div className="field-group">
                      <label htmlFor="pickupDate">Pickup Date</label>
                      <input
                        id="pickupDate"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="pickupTime">Pickup Time</label>
                      <input
                        id="pickupTime"
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="dropDate">Drop Date</label>
                      <input
                        id="dropDate"
                        type="date"
                        value={dropDate}
                        onChange={(e) => setDropDate(e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="dropTime">Drop Time</label>
                      <input
                        id="dropTime"
                        type="time"
                        value={dropTime}
                        onChange={(e) => setDropTime(e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="pickupLocation">Pickup Location</label>
                      <input
                        id="pickupLocation"
                        type="text"
                        placeholder="Enter pickup location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="dropLocation">Drop Location</label>
                      <input
                        id="dropLocation"
                        type="text"
                        placeholder="Enter drop location"
                        value={dropLocation}
                        onChange={(e) => setDropLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="driver-section">
                    <h2>Driver Requirement</h2>
                    <p className="section-subtitle">Do you need a driver for your trip?</p>
                    <div className="driver-option-row">
                      <button
                        type="button"
                        className={`driver-option ${driverOption === "self" ? "active" : ""}`}
                        onClick={() => setDriverOption("self")}
                      >
                        <div>
                          <strong>No, I will drive</strong>
                          <p>I will drive the vehicle myself</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`driver-option ${driverOption === "driver" ? "active" : ""}`}
                        onClick={() => setDriverOption("driver")}
                      >
                        <div>
                          <strong>Yes, I need a driver</strong>
                          <p>Add a professional driver</p>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="button-row">
                    <button type="button" className="primary-button compact-continue-button" onClick={handleContinue}>
                      Continue
                    </button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="summary-page-content">
                    <p className="summary-label">Review your booking details and total amount</p>
                    <div className="price-details-card">
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🚗</span>
                          <div>
                            <strong>Vehicle Rent</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.priceDay}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">👨‍✈️</span>
                          <div>
                            <strong>Driver Charges</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.DriverCharges}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🚚</span>
                          <div>
                            <strong>Delivery Charges</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.DeliveryCharges}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🛡️</span>
                          <div>
                            <strong>Security Deposit (Refundable)</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.SecurityDeposit}</div>
                      </div>
                      <p className="summary-note">Note:- Security deposit is refundable just after the vehicle is returned.</p>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">💚</span>
                          <div>
                            <strong>Discount on Offers</strong>
                          </div>
                        </div>
                        <div className="price-value price-negative">- {selectedVehicle.Discount}</div>
                      </div>
                    </div>
                    <div className="total-row">
                      <span><b>Total Amount</b></span>
                      <strong>{formattedTotalAmount}</strong>
                    </div>
                    <div className="button-row">
                      <button type="button" className="primary-button compact-continue-button" onClick={handleContinue}>
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="summary-page-content">
                    <p className="summary-label">Complete your payment securely</p>
                    <div className="payment-method-card recommended">
                      <div className="payment-method-info">
                        <strong>Razorpay</strong>
                        <p>Pay securely using Cards, UPI, Netbanking, Wallets & more</p>
                      </div>
                      <div className="payment-method-badge">Recommended</div>
                    </div>
                    <div className="payment-method-card">
                      <div className="payment-method-info">
                        <strong>UPI</strong>
                        <p>Pay using any UPI app</p>
                      </div>
                    </div>
                    <div className="payment-method-card">
                      <div className="payment-method-info">
                        <strong>Credit / Debit Card</strong>
                        <p>Visa, Mastercard, Rupay & more</p>
                      </div>
                    </div>
                    <div className="payment-method-card">
                      <div className="payment-method-info">
                        <strong>Net Banking</strong>
                        <p>Pay using your bank account</p>
                      </div>
                    </div>
                    <div className="payment-method-card">
                      <div className="payment-method-info">
                        <strong>Wallets</strong>
                        <p>Pay using popular wallets</p>
                      </div>
                    </div>
                    <div className="price-details-card">
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🚗</span>
                          <div>
                            <strong>Vehicle Rent</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.priceDay}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">👨‍✈️</span>
                          <div>
                            <strong>Driver Charges</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.DriverCharges}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🚚</span>
                          <div>
                            <strong>Delivery Charges</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.DeliveryCharges}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">🛡️</span>
                          <div>
                            <strong>Security Deposit (Refundable)</strong>
                          </div>
                        </div>
                        <div className="price-value">{selectedVehicle.SecurityDeposit}</div>
                      </div>
                      <div className="price-row">
                        <div className="price-item">
                          <span className="price-icon">💚</span>
                          <div>
                            <strong>Discount on Offers</strong>
                          </div>
                        </div>
                        <div className="price-value price-negative">- {selectedVehicle.Discount}</div>
                      </div>
                    </div>
                    <div className="total-row">
                      <span><b>Total Amount</b></span>
                      <strong>{formattedTotalAmount}</strong>
                    </div>
                    <div className="button-row">
                      <button type="button" className="primary-button compact-continue-button" onClick={handlePaymentSuccess}>
                        Pay {formattedTotalAmount} Securely
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="booking-confirmation-page">
                    <div className="booking-confirmation-banner">
                      <div>
                        <div className="confirmation-icon">✅</div>
                        <div>
                          <h2>Booking Confirmed!</h2>
                          <p>Your ride is all set. We've sent the details to your registered email and phone.</p>
                        </div>
                      </div>
                      <div className="confirmation-hero">
                        <img src={carImage} alt="Booking confirmed" />
                      </div>
                      <div className="confirmation-id-card">
                        <span>Booking ID:</span>
                        <strong>{bookingId}</strong>
                      </div>
                    </div>
                    <div className="booking-confirmation-subtext">
                      Your booking is confirmed and payment of {formattedTotalAmount} is successful.
                    </div>

                    <div className="confirmation-summary-grid">
                      <div className="booking-card confirmation-card">
                        <div className="confirmation-card-header">
                          <div>
                            <div className="vehicle-pill">{selectedVehicle.name}</div>
                            <strong>{selectedVehicle.details}</strong>
                          </div>
                          <div className="confirmation-status">Confirmed</div>
                        </div>
                        <div className="confirmation-meta-row">
                          <div>
                            <p>{pickupDateText} - {dropDateText}</p>
                            <strong>2 Days</strong>
                          </div>
                          <div>
                            <p>10:00 AM (Pickup)</p>
                            <p>10:00 AM (Drop)</p>
                          </div>
                        </div>
                        <div className="confirmation-meta-row">
                          <div>
                            <strong>{selectedVehicle.fuel}</strong>
                          </div>
                          <div>
                            <strong>{selectedVehicle.transmission}</strong>
                          </div>
                          <div>
                            <strong>{selectedVehicle.seats}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="confirmation-details-grid">
                        <div className="booking-card confirmation-card">
                          <div className="confirmation-card-header">
                            <strong>Trip Details</strong>
                          </div>
                          <div className="confirmation-detail-item">
                            <span className="detail-bullet detail-pickup" />
                            <div>
                              <strong>Pickup Location</strong>
                              <p>{pickupLocationText}</p>
                            </div>
                          </div>
                          <div className="confirmation-detail-item">
                            <span className="detail-bullet detail-drop" />
                            <div>
                              <strong>Drop Location</strong>
                              <p>{dropLocationText}</p>
                            </div>
                          </div>
                          <div className="confirmation-detail-item">
                            <span className="detail-bullet detail-driver" />
                            <div>
                              <strong>Driver</strong>
                              <p>{driverOption === "driver" ? "Yes, driver required" : "No, I will drive"}</p>
                            </div>
                          </div>
                          <div className="confirmation-detail-item">
                            <span className="detail-bullet detail-time" />
                            <div>
                              <strong>Pickup Date & Time</strong>
                              <p>{pickupDateTimeText}</p>
                            </div>
                          </div>
                          <div className="confirmation-detail-item">
                            <span className="detail-bullet detail-time" />
                            <div>
                              <strong>Drop Date & Time</strong>
                              <p>{dropDateTimeText}</p>
                            </div>
                          </div>
                        </div>

                        <div className="booking-card confirmation-card">
                          <div className="confirmation-card-header">
                            <strong>Payment Summary</strong>
                          </div>
                          <div className="price-details-card">
                            <div className="price-row">
                              <div className="price-item">
                                <span className="price-icon">🚗</span>
                                <div>
                                  <strong>Vehicle Rent</strong>
                                  <p>{selectedVehicle.priceDay} x 2 days</p>
                                </div>
                              </div>
                              <div className="price-value">₹2,998.00</div>
                            </div>
                            <div className="price-row">
                              <div className="price-item">
                                <span className="price-icon">👨‍✈️</span>
                                <div>
                                  <strong>Driver Charges</strong>
                                  <p>{selectedVehicle.DriverCharges} x 2 days</p>
                                </div>
                              </div>
                              <div className="price-value">₹1,000.00</div>
                            </div>
                            <div className="price-row">
                              <div className="price-item">
                                <span className="price-icon">🚚</span>
                                <div>
                                  <strong>Delivery Charges</strong>
                                </div>
                              </div>
                              <div className="price-value">{selectedVehicle.DeliveryCharges}</div>
                            </div>
                            <div className="price-row">
                              <div className="price-item">
                                <span className="price-icon">🛡️</span>
                                <div>
                                  <strong>Security Deposit (Refundable)</strong>
                                </div>
                              </div>
                              <div className="price-value">{selectedVehicle.SecurityDeposit}</div>
                            </div>
                            <div className="price-row">
                              <div className="price-item">
                                <span className="price-icon">💚</span>
                                <div>
                                  <strong>Discount on Offers</strong>
                                </div>
                              </div>
                              <div className="price-value price-negative">- {selectedVehicle.Discount}</div>
                            </div>
                          </div>
                          <div className="total-row">
                            <span><b>Total Amount</b></span>
                            <strong>{formattedTotalAmount}</strong>
                          </div>
                          <div className="payment-confirmation-note">
                            <span>✔</span>
                            <p>{paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="confirmation-next-grid">
                      <div className="support-card">
                        <strong>What’s Next?</strong>
                        <div className="support-step-grid">
                          <div>
                            <strong>1. Get Ready</strong>
                            <p>We’ll send you a reminder before your trip starts.</p>
                          </div>
                          <div>
                            <strong>2. Start Your Trip</strong>
                            <p>Pick up the vehicle on time and enjoy your ride.</p>
                          </div>
                          <div>
                            <strong>3. Safe Journey</strong>
                            <p>Drive safe and follow traffic rules.</p>
                          </div>
                          <div>
                            <strong>4. Return & Relax</strong>
                            <p>Return the vehicle on time and get your deposit back.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="confirmation-actions-row">
                      <button type="button" className="outline-button">Download Invoice</button>
                      <button type="button" className="primary-button">View My Bookings</button>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
