import React, { useState } from "react";

import carImage from "./assets/car_image.jpg";


export default function BookingDetails({ onBack, vehicle }) {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [homeDeliveryOption, setHomeDeliveryOption] = useState("no");
  const [driverOption, setDriverOption] = useState("driver");
  const [selectedRentOption, setSelectedRentOption] = useState("day");
  const [currentStep, setCurrentStep] = useState(1);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showDeliveryLocation, setShowDeliveryLocation] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    age: "",
    city: "",
    pincode: "",
    address: "",
  });
  const [drivingLicenseFile, setDrivingLicenseFile] = useState(null);

  const handleDriverOptionChange = (nextOption) => {
    setDriverOption(nextOption);
    setShowCustomerForm(nextOption === "self");
  };

  const handleHomeDeliveryOptionChange = (nextOption) => {
    setHomeDeliveryOption(nextOption);
    setShowDeliveryLocation(nextOption === "yes");
  };

  const handleCustomerFieldChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getVehicleImage = () => {
    if (vehicle?.frontImage) {
      return vehicle.frontImage;
    }

    if (Array.isArray(vehicle?.media)) {
      const image = vehicle.media.find((media) =>
        media?.contentType?.toLowerCase().startsWith("image/")
      );

      if (image?.fileData && image?.contentType) {
        return `data:${image.contentType};base64,${image.fileData}`;
      }
    }

    return carImage;
  };

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
  const deliveryLocationText = deliveryLocation || "HSR Layout, Bangalore, Karnataka 560102";

  const handleContinue = () => {
    if (currentStep === 1) {
      if (homeDeliveryOption === "yes" && !deliveryLocation.trim()) {
        alert("Please enter the pickup and drop location before continuing.");
        return;
      }

      if (driverOption === "self") {
        const requiredFields = [
          customerInfo.name,
          customerInfo.mobile,
          customerInfo.age,
          customerInfo.city,
          customerInfo.pincode,
          customerInfo.address,
        ];

        if (requiredFields.some((field) => !field || !String(field).trim())) {
          alert("Please fill in all customer details before continuing.");
          return;
        }

        if (!drivingLicenseFile) {
          alert("Please upload your driving licence before continuing.");
          return;
        }
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const selectedVehicle = {
    name: vehicle?.vehicleName || vehicle?.name || "Hyundai i20",
    details: `${vehicle?.fuelType || vehicle?.fuel || "Petrol"} • ${vehicle?.transmission || "Manual"} • ${vehicle?.seatingCapacity || vehicle?.seats || "5 Seater"}`,
    rating: "4.5",
    reviews: 126,
    distance: "1.2 km away",
    priceHour: vehicle?.hourlyRent ? `₹${Number(vehicle.hourlyRent).toLocaleString("en-IN")}` : "₹149",
    priceHourValue: Number(vehicle?.hourlyRent ?? 149),
    priceDay: vehicle?.dailyRent ? `₹${Number(vehicle.dailyRent).toLocaleString("en-IN")}` : "₹1499",
    priceDayValue: Number(vehicle?.dailyRent ?? 1499),
    priceWeek: vehicle?.weeklyRent ? `₹${Number(vehicle.weeklyRent).toLocaleString("en-IN")}` : "₹8999",
    fuel: vehicle?.fuelType || vehicle?.fuel || "Petrol",
    transmission: vehicle?.transmission || "Manual",
    seats: vehicle?.seatingCapacity || vehicle?.seats || "5 Seater",
    mileage: vehicle?.mileage ? `${vehicle.mileage} km/l` : "18 km/l",
    deposit: vehicle?.securityDeposit ? `₹${Number(vehicle.securityDeposit).toLocaleString("en-IN")}` : "₹5000",
    DriverCharges: vehicle?.driverCharges ? `₹${Number(vehicle.driverCharges).toLocaleString("en-IN")}` : "₹500",
    DriverChargesValue: Number(vehicle?.driverCharges ?? 500),
    DeliveryCharges: vehicle?.homeDeliveryCharges ? `₹${Number(vehicle.homeDeliveryCharges).toLocaleString("en-IN")}` : "₹300",
    DeliveryChargesValue: Number(vehicle?.homeDeliveryCharges ?? 300),
    SecurityDeposit: vehicle?.securityDeposit ? `₹${Number(vehicle.securityDeposit).toLocaleString("en-IN")}` : "₹5000",
    SecurityDepositValue: Number(vehicle?.securityDeposit ?? 5000),
    Discount: "₹0.00",
    DiscountValue: 0,
  };

  const rentalOptions = {
    hour: { label: "Per Hour", value: Number(vehicle?.hourlyRent ?? 149), display: selectedVehicle.priceHour },
    day: { label: "Per Day", value: Number(vehicle?.dailyRent ?? 1499), display: selectedVehicle.priceDay },
    week: { label: "Per Week", value: Number(vehicle?.weeklyRent ?? 8999), display: selectedVehicle.priceWeek },
  };
  const selectedRental = rentalOptions[selectedRentOption] || rentalOptions.day;

  const deliveryChargesValue = homeDeliveryOption === "yes" ? selectedVehicle.DeliveryChargesValue : 0;

  const totalAmountValue =
    selectedRental.value +
    selectedVehicle.DriverChargesValue +
    deliveryChargesValue +
    selectedVehicle.SecurityDepositValue -
    selectedVehicle.DiscountValue;
  const formattedTotalAmount = `₹${totalAmountValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handlePaymentSuccess = () => {
    setCurrentStep(4);
  };

  const handleBack = () => {
    if(currentStep === 4) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <>
      <style>{`
        .booking-details-shell {
          display: flex;
          min-height: 100vh;
          background: #f4f7fb;
        }

        .booking-page-content {
          margin-left: 260px;
          width: calc(100% - 260px);
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .booking-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
          padding: 110px 36px 36px;
        }

        .booking-page-header-row {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          position: fixed;
          top: 70px;
          left: 260px;
          right: 0;
          padding: 18px 36px;
          background: #ffffff;
          z-index: 50;
          width: calc(100% - 260px);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: #ffffff;
          color: #0f172a;
          font-weight: 700;
          cursor: pointer;
          padding: 10px 16px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
          transition: all 0.2s ease;
        }

        .back-link:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .booking-header-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          margin-left: 350px;
          text-align: left;
        }

        .booking-header-text h1 {
          margin: 0;
          font-size: clamp(1.8rem, 2.3vw, 2.6rem);
          color: #102a43;
        }

        .booking-header-text p {
          margin: 0;
          color: #475569;
          font-size: 1rem;
        }

        .booking-steps-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 28px;
          position: fixed;
          top: 175px;
          left: 260px;
          right: 0;
          margin: 0;
          padding: 18px 36px;
          background: #f4f7fb;
          z-index: 40;
          width: calc(100% - 260px);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
        }

        .step-pill {
          border-radius: 14px;
          border: 1px solid rgba(16, 42, 67, 0.08);
          background: #ffffff;
          padding: 14px 18px;
          text-align: left;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .step-pill.active {
          background: #10b981;
          color: #ffffff;
          border-color: transparent;
        }

        .step-number {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #d1fae5;
          color: #047857;
          font-weight: 800;
        }

        .step-pill.active .step-number {
          background: #ffffff;
          color: #10b981;
        }

        .booking-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 24px;
          padding-top: 150px;
        }

        .booking-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
        }

        .booking-form-card {
          min-height: 420px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 1.25rem;
        }

        .vehicle-preview-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 0 8px;
          border-bottom: 1px solid rgba(16, 42, 67, 0.08);
          margin-bottom: 18px;
          
        }

        .vehicle-preview-row img {
          width: 190px;
          height: 130px;
          object-fit: cover;
          border-radius: 20px;
        }

        .vehicle-preview-info strong {
          display: block;
          font-size: 1.1rem;
          color: #102a43;
        }

        .vehicle-preview-info p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 0.95rem;
        }

        .vehicle-pricing-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
          color: #475569;
          font-size: 0.95rem;
        }

        .vehicle-pricing-row span {
          background: #f8fafc;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .vehicle-pricing-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .vehicle-price-option {
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 999px;
          background: #f8fafc;
          color: #475569;
          padding: 8px 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .vehicle-price-option.selected {
          background: #10b981;
          color: #ffffff;
          border-color: transparent;
        }

        .trip-fields-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 20px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-group label {
          color: #475569;
          font-size: 0.9rem;
        }

        .field-group input {
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(16, 42, 67, 0.12);
          padding: 0 16px;
          font-size: 1rem;
          color: #102a43;
        }

        .field-group textarea {
          min-height: 110px;
          border-radius: 16px;
          border: 1px solid rgba(16, 42, 67, 0.12);
          padding: 14px 16px;
          font-size: 1rem;
          color: #102a43;
          resize: vertical;
        }

        .driver-section {
          margin-top: 28px;
        }

        .section-subtitle {
          color: #64748b;
          margin: 4px 0 18px;
        }

        .driver-option-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .driver-option {
          border: 1px solid rgba(16, 42, 67, 0.12);
          border-radius: 18px;
          padding: 18px;
          display: flex;
          gap: 14px;
          align-items: center;
          text-align: left;
          background: #f8fafc;
          cursor: pointer;
        }

        .driver-option.active {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .driver-option strong {
          display: block;
          font-size: 1rem;
        }

        .driver-option p {
          margin: 4px 0 0;
          color: #475569;
        }

        .customer-info-form {
          width: 100%;
          margin-top: 22px;
          padding: 22px;
          border: 1px solid rgba(16, 42, 67, 0.08);
          border-radius: 24px;
          background: linear-gradient(180deg, #ffffff, #f8fafc);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .customer-info-header {
          margin: 0 0 18px;
          font-size: 1.2rem;
          color: #102a43;
        }

        .customer-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .customer-form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
  
        .customer-form-field.full-width {
          grid-column: 1 / -1;
        }

        .customer-form-field label {
          color: #475569;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .customer-form-field input,
        .customer-form-field textarea {
          width: 100%;
          border: 1px solid rgba(16, 42, 67, 0.12);
          border-radius: 16px;
          background: #ffffff;
          padding: 0 16px;
          color: #102a43;
          font-size: 1rem;
        }

        .customer-form-field input {
          height: 52px;
        }

        .customer-form-field textarea {
          min-height: 110px;
          padding: 14px 16px;
          resize: vertical;
        }

        .customer-form-field.upload-field {
          grid-column: 2;
          align-self: end;
        }

        .customer-form-field.upload-field .upload-box {
          display: grid;
          gap: 8px;
          padding: 16px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .customer-form-field.upload-field .upload-box input[type="file"] {
          border: 1px dashed rgba(16, 42, 67, 0.2);
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: 14px;
          color: #102a43;
        }
        .pincode-field{
            margin-top: 15px;
        }
        .file-upload-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        .upload-box {
          display: grid;
          gap: 8px;
          padding: 16px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .upload-box label {
          color: #475569;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .upload-box input[type="file"] {
          border: 1px dashed rgba(16, 42, 67, 0.2);
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: 14px;
          color: #102a43;
        }

        .selected-file-name {
          margin: 0;
          font-size: 0.88rem;
          color: #047857;
          font-weight: 600;
        }

        .button-row {
          display: flex;
          justify-content: flex-start;
          padding: 18px 0 12px;
        }

        .primary-button {
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 16px 20px;
          border-radius: 18px;
          cursor: pointer;
          font-weight: 700;
          margin-left: 420px;
        }

        .compact-continue-button {
          width: 250px;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 0.95rem;
        }

        @media (max-width: 960px) {
          .booking-page-content {
            margin-left: 0;
            width: 100%;
          }

          .booking-content {
            padding: 24px 18px 30px;
          }

          .booking-header-text {
            margin-left: 0;
          }

          .booking-steps-row {
            left: 0;
            width: 100%;
            padding: 18px 18px;
            top: 60px;
          }

          .booking-steps-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .customer-form-grid,
          .trip-fields-grid,
          .file-upload-list,
          .driver-option-row {
            grid-template-columns: 1fr;
          }

          .primary-button {
            margin-left: 0;
          }
        }

        @media (max-width: 640px) {
          .booking-page-header-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .back-link {
            width: 100%;
            justify-content: center;
          }

          .booking-header-text {
            width: 100%;
            margin-left: 0;
          }

          .booking-card {
            padding: 18px;
          }

          .booking-steps-row {
            left: 0;
            width: 100%;
            padding: 14px 12px;
            top: 50px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .vehicle-preview-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .vehicle-preview-row img {
            width: 100%;
            height: 180px;
          }

          .customer-info-form {
            padding: 16px;
          }
        }
      `}</style>
      <div className="booking-details-shell">
        <div className="booking-page-content">
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
                      ? "Booking Details"
                      : currentStep === 2
                      ? "Booking Summary"
                      : currentStep === 3
                      ? "Payment"
                      : "Booking Confirmation"}
                  </h2>
                </div>

                {currentStep === 1 && (
                  <>
                    <div className="vehicle-preview-row">
                      <img src={getVehicleImage()} alt={selectedVehicle.name} onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = carImage;
                      }} />
                      <div className="vehicle-preview-info">
                        <strong>{selectedVehicle.name}</strong>
                        <p>{selectedVehicle.details}</p>
                        <div className="vehicle-pricing-row">
                          <button
                            type="button"
                            className={`vehicle-price-option ${selectedRentOption === "hour" ? "selected" : ""}`}
                            onClick={() => setSelectedRentOption("hour")}
                          >
                            {selectedVehicle.priceHour} / hr
                          </button>
                          <button
                            type="button"
                            className={`vehicle-price-option ${selectedRentOption === "day" ? "selected" : ""}`}
                            onClick={() => setSelectedRentOption("day")}
                          >
                            {selectedVehicle.priceDay} / day
                          </button>
                          <button
                            type="button"
                            className={`vehicle-price-option ${selectedRentOption === "week" ? "selected" : ""}`}
                            onClick={() => setSelectedRentOption("week")}
                          >
                            {selectedVehicle.priceWeek} / wk
                          </button>
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
                    </div>

                    <div className="driver-section">
                      <h2>Driver Requirement</h2>
                      <p className="section-subtitle">Do you need a driver for your trip?</p>
                      <div className="driver-option-row">
                        <button
                          type="button"
                          className={`driver-option ${driverOption === "driver" ? "active" : ""}`}
                          onClick={() => handleDriverOptionChange("driver")}
                        >
                          <div>
                            <strong>Yes, driver is required</strong>
                            <p>Add a professional driver</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={`driver-option ${driverOption === "self" ? "active" : ""}`}
                          onClick={() => handleDriverOptionChange("self")}
                        >
                          <div>
                            <strong>No, driver is not required</strong>
                            <p>I will drive the vehicle myself</p>
                          </div>
                        </button>
                      </div>

                      {showCustomerForm && (
                        <div className="customer-info-form">
                          <h3 className="customer-info-header">Customer Information</h3>

                          <div className="customer-form-grid">
                            <div className="customer-form-field">
                              <label htmlFor="customerName">Name</label>
                              <input
                                id="customerName"
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div className="customer-form-field">
                              <label htmlFor="customerMobile">Mobile No</label>
                              <input
                                id="customerMobile"
                                type="tel"
                                name="mobile"
                                value={customerInfo.mobile}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter mobile number"
                              />
                            </div>

                            <div className="customer-form-field">
                              <label htmlFor="customerAge">Age</label>
                              <input
                                id="customerAge"
                                type="number"
                                name="age"
                                value={customerInfo.age}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter your age"
                              />
                            </div>

                            <div className="customer-form-field">
                              <label htmlFor="customerCity">City</label>
                              <input
                                id="customerCity"
                                type="text"
                                name="city"
                                value={customerInfo.city}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter city"
                              />
                            </div>

                             <div className="customer-form-field pincode-field">
                              <label htmlFor="customerPincode">Pincode</label>
                              <input
                                id="customerPincode"
                                type="text"
                                name="pincode"
                                value={customerInfo.pincode}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter pincode"
                              />
                            </div>

                            <div className="customer-form-field upload-field">
                              <label htmlFor="drivingLicenseUpload">Driving Licence</label>
                              <div className="upload-box">
                                <input
                                  id="drivingLicenseUpload"
                                  type="file"
                                  accept=".pdf,.png,.jpg,.jpeg"
                                  onChange={(event) => setDrivingLicenseFile(event.target.files?.[0] || null)}
                                />
                                {drivingLicenseFile && (
                                  <p className="selected-file-name">Selected: {drivingLicenseFile.name}</p>
                                )}
                              </div>
                            </div>

                           

                            <div className="customer-form-field full-width">
                              <label htmlFor="customerAddress">Address</label>
                              <textarea
                                id="customerAddress"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleCustomerFieldChange}
                                placeholder="Enter your full address"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="driver-section">
                      <h2>Home Delivery</h2>
                      <p className="section-subtitle">Do you want vehicle home delivery?</p>
                      <div className="driver-option-row">
                        <button
                          type="button"
                          className={`driver-option ${homeDeliveryOption === "yes" ? "active" : ""}`}
                          onClick={() => handleHomeDeliveryOptionChange("yes")}
                        >
                          <div>
                            <strong>Yes, Require</strong>
                            <p>Need the vehicle delivered to my location</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={`driver-option ${homeDeliveryOption === "no" ? "active" : ""}`}
                          onClick={() => handleHomeDeliveryOptionChange("no")}
                        >
                          <div>
                            <strong>No, Require</strong>
                            <p>I will collect the vehicle myself</p>
                          </div>
                        </button>
                      </div>

                      {showDeliveryLocation && (
                        <div className="customer-info-form" style={{ marginTop: "20px" }}>
                          <h3 className="customer-info-header">Pickup & Drop Location</h3>
                          <div className="customer-form-grid">
                            <div className="customer-form-field full-width">
                              <label htmlFor="deliveryLocation">Pickup & Drop Location</label>
                              <textarea
                                id="deliveryLocation"
                                value={deliveryLocation}
                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                placeholder="Enter pickup and drop location details"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}
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
                        <div className="price-value">{selectedRental.display}</div>
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
                            <strong>Delivery Charges (per km)</strong>
                          </div>
                        </div>
                        <div className="price-value">{homeDeliveryOption === "yes" ? selectedVehicle.DeliveryCharges : "₹0.00"}</div>
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
                        <div className="price-value">{selectedVehicle.Discount}</div>
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
                        <img src={getVehicleImage()} alt="Booking confirmed" onError={(event) => {
                          event.target.onerror = null;
                          event.target.src = carImage;
                        }} />
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
                              <strong>Pickup & Drop Location</strong>
                              <p>{homeDeliveryOption === "yes" ? deliveryLocationText : "Not required"}</p>
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
  </>
  );
}
