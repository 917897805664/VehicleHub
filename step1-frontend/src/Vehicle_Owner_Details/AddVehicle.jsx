import React, { useMemo, useState } from "react";

const typeOptions = [
  "Two Wheeler",
  "Four Wheeler",
  "Passengers Vehicle",
  "Electric Vehicle",
  "Transportation Vehicle",
  "Any Other Vehicles"
];

const brandOptions = {
  "Two Wheeler": [
    "Honda",
    "TVS",
    "Hero",
    "Yamaha",
    "Bajaj",
    "Suzuki",
    "Royal Enfield",
    "Any Others"
  ],

  "Four Wheeler": [
    "Hyundai",
    "Honda",
    "Tata",
    "Mahindra",
    "Maruti Suzuki",
    "Toyota",
    "Any Others"
  ],

  "Passengers Vehicle": [
    "Tata",
    "Mahindra",
    "Ashok Leyland",
    "Any Others"
  ],

  "Electric Vehicle": [
    "Tata",
    "Mahindra",
    "Ather",
    "Ola Electric",
    "Any Others"
  ],

  "Transportation Vehicle": [
    "Tata",
    "Ashok Leyland",
    "Mahindra",
    "Any Others"
  ],

  "Any Other Vehicles": [
    "Tata",
    "Mahindra",
    "Ashok Leyland",
    "Any Others"
  ]
};


const modelOptions = {

  // =========================
  // TWO WHEELER
  // =========================

  Honda: [
    "Activa 6G",
    "Activa 125",
    "SP 125",
    "Hornet 2.0",
    "CB200X",
    "CB350"
  ],

  TVS: [
    "Jupiter",
    "NTORQ 125",
    "Apache RTR 160",
    "Apache RTR 200",
    "Raider 125",
    "Ronin"
  ],

  Hero: [
    "Splendor Plus",
    "HF Deluxe",
    "Passion XTEC",
    "Xtreme 125R",
    "Xtreme 160R"
  ],

  Yamaha: [
    "FZ-FI",
    "FZ-S FI",
    "MT-15",
    "R15 V4",
    "Fascino 125",
    "RayZR 125"
  ],

  Bajaj: [
    "Pulsar 125",
    "Pulsar 150",
    "Pulsar NS160",
    "Pulsar NS200",
    "Dominar 250",
    "Dominar 400"
  ],

  Suzuki: [
    "Access 125",
    "Burgman Street",
    "Gixxer",
    "Gixxer SF",
    "V-Strom SX"
  ],

  "Royal Enfield": [
    "Classic 350",
    "Bullet 350",
    "Hunter 350",
    "Meteor 350",
    "Himalayan 450",
    "Interceptor 650"
  ],


  // =========================
  // FOUR WHEELER
  // =========================

  Hyundai: [
    "Grand i10 Nios",
    "i20",
    "Aura",
    "Verna",
    "Venue",
    "Creta",
    "Alcazar",
    "Tucson"
  ],

  // Honda already exists above
  // Same brand can contain models from different types.
  // Your UI should filter these according to selected type.

  Tata: [
    "Tiago",
    "Tigor",
    "Altroz",
    "Punch",
    "Nexon",
    "Curvv",
    "Harrier",
    "Safari",
    "Winger",
    "Winger Plus",
    "Starbus",
    "Starbus Ultra",
    "Tiago EV",
    "Tigor EV",
    "Nexon EV",
    "Punch EV",
    "Curvv EV",
    "Ace",
    "Ace Gold",
    "Intra V10",
    "Intra V30",
    "Intra V50",
    "Yodha Pickup",
    "Signa 4018",
    "Prima"
  ],

  Mahindra: [
    "Thar",
    "XUV 3XO",
    "Scorpio Classic",
    "Scorpio-N",
    "XUV700",
    "Bolero",
    "Marazzo",
    "Bolero Neo",
    "XUV400 EV",
    "BE 6",
    "XEV 9e",
    "Bolero Pik-Up",
    "Bolero Camper",
    "Maxx HD",
    "Jeeto",
    "Furio"
  ],

  "Maruti Suzuki": [
    "Alto K10",
    "WagonR",
    "Swift",
    "Baleno",
    "Dzire",
    "Brezza",
    "Ertiga",
    "XL6"
  ],

  Toyota: [
    "Glanza",
    "Urban Cruiser Hyryder",
    "Innova Crysta",
    "Innova Hycross",
    "Fortuner",
    "Legender"
  ],


  // =========================
  // PASSENGERS VEHICLE
  // =========================

  "Ashok Leyland": [
    "Oyster",
    "Oyster Wide",
    "Viking",
    "Partner",
    "Dost",
    "Bada Dost",
    "Boss",
    "Ecomet"
  ],


  // =========================
  // ELECTRIC VEHICLE
  // =========================

  Ather: [
    "450S",
    "450X",
    "450 Apex"
  ],

  "Ola Electric": [
    "S1 X",
    "S1 Pro",
    "S1 Air"
  ],


  // =========================
  // ANY OTHERS
  // =========================

  "Any Others": [
    "Other Model"
  ]
};

const yearOptions = Array.from({ length: 2026 - 1900 + 1 }, (_, index) => 2026 - index).filter((year) => year >= 1900);

const fuelOptions = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const transmissionOptions = ["Manual", "Automatic", "Semi-Automatic"];
const seatingOptions = ["2 Seater", "4 Seater", "5 Seater", "6 Seater", "7 Seater"];
const colorOptions = ["White", "Black", "Silver", "Blue", "Red", "Green", "Yellow"];

const featureOptions = [
  "Air Conditioning",
  "Airbags",
  "GPS Navigation",
  "Seat Covers",
  "Power Steering",
  "Music System",
  "Rear Camera",
  "Heater",
  "Power Windows",
  "Bluetooth",
  "Alloy Wheels",
  "Parking Sensors",
  "ABS",
  "Central Locking",
  "Fog Lights",
  "Cruise Control",
  "LED Headlight",
  "Disc Brake",
];

export default function AddVehicle({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    vehicleName: "",
    brand: "",
    model: "",
    year: "",
    registration: "",
    type: "",
    fuel: "",
    transmission: "",
    capacity: "",
    seating: "",
    mileage: "",
    color: "",
    description: "",
    highlights: [],
    features: {},
  });

  const [photos, setPhotos] = useState([]);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [rcBookDocument, setRcBookDocument] = useState(null);
  const [insuranceDocument, setInsuranceDocument] = useState(null);

  const [pricingData, setPricingData] = useState({
    hourlyRent: "",
    dailyRent: "",
    weeklyRent: "",
    monthlyRent: "",
    extraKm: "",
    freeKmPerDay: "",
    securityDeposit: "",
    cleaningCharges: "",
    lateReturnCharges: "",
    cancellationCharges: "",
    driverCharges: "",
    homeDeliveryCharges: "",
    pickUpCharges: "",
    tollCharges: "",
    parkingCharges: "",
    nightCharges: "",
    enableDriverCharges: false,
    enableHomeDeliveryCharges: false,
    enablePickUpCharges: false,
    enableTollCharges: false,
    enableParkingCharges: false,
    enableNightCharges: false,
  });

  const modelList = useMemo(() => {
    return formData.brand ? modelOptions[formData.brand] || [] : [];
  }, [formData.brand]);

  const brandList = useMemo(() => {
    return formData.type ? brandOptions[formData.type] || [] : [];
  }, [formData.type]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brand" ? { model: "" } : {}),
      ...(name === "type" ? { brand: "", model: "" } : {}),
    }));
  };

  const handlePricingChange = (event) => {
    const { name, value, type, checked } = event.target;

    setPricingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const handlePhotoUpload = (event, setter) => {
    const files = Array.from(event.target.files || []);
    setter(files);
  };

  const validateDocument = (file) => {
    if (!file) {
      return false;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PDF, PNG, or JPG files only.");
      return false;
    }

    if (file.size > maxSize) {
      alert("File size must be 5MB or less.");
      return false;
    }

    return true;
  };

  const handleDocumentUpload = (event, setter) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!validateDocument(file)) {
      event.target.value = null;
      setter(null);
      return;
    }

    setter(file);
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {

      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      /*
       * =====================================================
       * GET SELECTED VEHICLE FEATURES
       * =====================================================
       *
       * formData.features is stored like:
       *
       * {
       *     "ABS": true,
       *     "Air Conditioning": true,
       *     "GPS Navigation": false
       * }
       *
       * We convert only the selected features into an array.
       */

      const selectedFeatures = Object.keys(formData.features)
        .filter((feature) => formData.features[feature]);

      /*
       * =====================================================
       * VEHICLE + FEATURES PAYLOAD
       * =====================================================
       */

      const payload = {

        vehicleName: formData.vehicleName,

        vehicleType: formData.type,

        brand: formData.brand,

        model: formData.model,

        manufacturingYear: formData.year,

        vehicleNo: formData.registration,

        fuelType: formData.fuel,

        transmission: formData.transmission,

        engineCapacity: formData.capacity,

        color: formData.color,

        seatingCapacity: formData.seating,

        mileage: Number(formData.mileage),

        description: formData.description,

        features: selectedFeatures

      };

      console.log("Vehicle + Features Payload:");
      console.log(payload);

      try {

        const response = await fetch(
          "http://localhost:8080/api/vehicle-owners/vehicles/addVehicle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

        let result = null;
        try {
          result = await response.json();
        } catch (parseError) {
          console.warn("Could not parse backend response as JSON:", parseError);
        }

        console.log("Backend Response:");
        console.log(result);

        if (response.ok) {
          alert("Vehicle and Features Added Successfully");
          setCurrentStep(2);
        } else {
          alert((result && result.message) || "Vehicle could not be added.");
        }

      } catch (error) {
        console.error(error);
        alert("Server Error");
      }

      return;
    }

    if (currentStep === 2) {
      if (photos.length === 0 && additionalPhotos.length === 0 && videos.length === 0) {
        alert("Please upload at least one photo or video before continuing.");
        return;
      }

      console.log("Photos:", photos);
      console.log("Additional Photos:", additionalPhotos);
      console.log("Videos:", videos);

      alert("Photos & Videos saved successfully.");
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!rcBookDocument) {
        alert("Please upload the RC Book document (PDF, PNG, or JPG). The RC Book can be a single PDF containing both sides.");
        return;
      }

      if (!insuranceDocument) {
        alert("Please upload the Insurance document (PDF, PNG, or JPG). The file size must be 5MB or less.");
        return;
      }

      if (!validateDocument(rcBookDocument) || !validateDocument(insuranceDocument)) {
        return;
      }

      console.log("RC Book Document:", rcBookDocument);
      console.log("Insurance Document:", insuranceDocument);

      alert("Documents saved successfully.");
      setCurrentStep(4);
      return;
    }

    if (currentStep === 4) {
      alert("Pricing & Charges saved successfully.");
      console.log("Pricing Data:", pricingData);
      return;
    }

    if (!rcBookDocument) {
      alert("Please upload the RC Book document (PDF, PNG, or JPG). The RC Book can be a single PDF containing both sides.");
      return;
    }

    if (!insuranceDocument) {
      alert("Please upload the Insurance document (PDF, PNG, or JPG). The file size must be 5MB or less.");
      return;
    }

    if (!validateDocument(rcBookDocument) || !validateDocument(insuranceDocument)) {
      return;
    }

    console.log("RC Book Document:", rcBookDocument);
    console.log("Insurance Document:", insuranceDocument);

    alert("Documents saved successfully.");

  };

  return (
    <div className="add-vehicle-page">
      <div className="add-vehicle-header">
        <button type="button" className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div>
          <h2 className="add-vehicle-title">Add Vehicle</h2>
          <p className="add-vehicle-subtitle">Fill in the vehicle details to list it on RentRide.</p>
        </div>
      </div>

      <div className="add-vehicle-steps">
        {[
          { step: 1, label: "Vehicle Details" },
          { step: 2, label: "Photos & Videos" },
          { step: 3, label: "Documents" },
          { step: 4, label: "Pricing & Charges" },
          // { step: 5, label: "Availability" },
        ].map((item) => (
          <button
            type="button"
            key={item.step}
            className={`add-vehicle-step ${item.step === currentStep ? "active" : ""}`}
            onClick={() => handleStepClick(item.step)}
          >
            <div className="step-number">{item.step}</div>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <form className="add-vehicle-form" onSubmit={handleSubmit}>

        {currentStep === 1 ? (

          <div className="add-vehicle-form-grid step-one">

            <section className="add-vehicle-card">

              <div className="card-header">
                <h3>Vehicle Information</h3>
                <p className="section-label">Provide the key details needed to list your vehicle.</p>
              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="vehicleName">Vehicle Name *</label>

                  <input
                    id="vehicleName"
                    name="vehicleName"
                    type="text"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    placeholder="e.g. Hyundai i20"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="type">Vehicle Type *</label>

                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>

                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}

                  </select>
                </div>

              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="brand">Brand *</label>

                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Brand</option>

                    {brandList.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="model">Model *</label>

                  <select
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Model</option>

                    {modelList.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}

                  </select>
                </div>

              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="registration"> Vehicle Registration Number *</label>

                  <input
                    id="registration"
                    name="registration"
                    type="text"
                    value={formData.registration}
                    onChange={handleChange}
                    placeholder="KA 01 AB 1234"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="fuel">Fuel Type *</label>

                  <select
                    id="fuel"
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Fuel Type</option>

                    {fuelOptions.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}

                  </select>
                </div>

              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="year">Manufacturing Year *</label>

                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>

                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="mileage">Mileage (kmpl)</label>

                 <input
                      id="mileage"
                      name="mileage"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.mileage}
                      onChange={handleChange}
                      placeholder="e.g. 18.2"
                      required
                     />
                </div>

              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="color">Color *</label>

                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Color</option>

                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="seating">Seating Capacity *</label>

                  <select
                    id="seating"
                    name="seating"
                    value={formData.seating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Seating</option>

                    {seatingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}

                  </select>
                </div>

              </div>

              <div className="form-grid-2">

                <div className="form-field">
                  <label htmlFor="transmission">Transmission *</label>

                  <select
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Transmission</option>

                    {transmissionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="capacity">Engine Capacity (CC)</label>

                  <input
                    id="capacity"
                    name="capacity"
                    type="text"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 1197"
                  />
                </div>

              </div>

              <div className="form-field">

                <label htmlFor="description">Vehicle Description *</label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your vehicle, features, condition, etc."
                  maxLength={500}
                  required
                />

                <div className="char-count">
                  {formData.description.length}/500
                </div>

              </div>

            </section>

            <section className="add-vehicle-card">

              <div className="card-header">
                <h3>Vehicle Features</h3>
                <p className="section-label">Choose the features available with this vehicle.</p>
              </div>

              <div className="features-grid">

                {featureOptions.map((feature) => (

                  <label key={feature} className="feature-checkbox">

                    <input
                      type="checkbox"
                      checked={Boolean(formData.features[feature])}
                      onChange={() => handleToggleFeature(feature)}
                    />

                    {feature}

                  </label>

                ))}

              </div>

            </section>

          </div>

        ) : currentStep === 2 ? (

          <div className="add-vehicle-form-grid step-two">

            <section className="add-vehicle-card">

              <div className="card-header">
                <h3>Vehicle Photos</h3>
                <p className="section-label">Upload clear photos of your vehicle.</p>
              </div>

              <div className="file-upload-grid">

                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Front View</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Back View</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Left Side</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Right Side</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setPhotos)}
                  />
                </label>

              </div>

              <div className="file-upload-grid">

                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Interior</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Dashboard</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Boot Space</strong>
                  <span>Upload photo</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">🎥</span>
                  <strong>Engine / Video</strong>
                  <span>Upload video</span>

                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, setVideos)}
                  />
                </label>

              </div>

              <label className="upload-card add-more-photos-card">

                <span className="upload-icon">➕</span>
                <strong>Add more photos</strong>
                <span>Upload additional images</span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handlePhotoUpload(e, setPhotos)}
                />

              </label>

            </section>

          </div>

        ) : currentStep === 3 ? (

          <div className="add-vehicle-form-grid step-three">

            <section className="add-vehicle-card">

              <div className="card-header">
                <h3>Vehicle Documents</h3>
                <p className="section-label">Upload your RC book and insurance documents in PDF/PNG/JPG format, max 5MB.</p>
              </div>

              <div className="file-upload-grid">

                <label className="upload-card">
                  <span className="upload-icon">📄</span>
                  <strong>RC Book Document</strong>
                  <span>Upload PDF/PNG/JPG (front and back in one file)</span>

                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={(e) => handleDocumentUpload(e, setRcBookDocument)}
                  />
                </label>

                <label className="upload-card">
                  <span className="upload-icon">🛡️</span>
                  <strong>Insurance Document</strong>
                  <span>Upload PDF/PNG/JPG</span>

                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={(e) => handleDocumentUpload(e, setInsuranceDocument)}
                  />
                </label>

              </div>
               <section className="add-vehicle-card document-guidelines-panel">
              <div className="card-header">
                <h3>Important Guidelines</h3>
                <p className="section-label">Please follow these document requirements.</p>
              </div>
              <div className="document-guidelines-list">
                <div className="document-guideline-item">
                  <span className="guideline-icon">✔️</span>
                  <span>All documents must be clear and readable.</span>
                </div>
                <div className="document-guideline-item">
                  <span className="guideline-icon">✔️</span>
                  <span>RC should be in the vehicle owner’s name.</span>
                </div>
                <div className="document-guideline-item">
                  <span className="guideline-icon">✔️</span>
                  <span>Insurance must be valid.</span>
                </div>
                <div className="document-guideline-item">
                  <span className="guideline-icon">✔️</span>
                  <span>File format: JPG, PNG, or PDF.</span>
                </div>
                <div className="document-guideline-item">
                  <span className="guideline-icon">✔️</span>
                  <span>Maximum file size: 5MB.</span>
                </div>
              </div>
            </section>
            </section>

          </div>

        ) : currentStep === 4 ? (

          <div className="add-vehicle-form-grid step-four">

            <section className="add-vehicle-card big-section">

              <div className="big-section-grid">

                <div className="sub-card full-width">
                  <div className="card-header">
                    <h3>Rental Pricing</h3>
                    <p className="section-label">Set the base rental pricing for different durations.</p>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="hourlyRent">Hourly Rent (₹)</label>
                      <input
                        id="hourlyRent"
                        name="hourlyRent"
                        type="number"
                        min="0"
                        value={pricingData.hourlyRent}
                        onChange={handlePricingChange}
                        placeholder="e.g. 399"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="dailyRent">Daily Rent (₹) *</label>
                      <input
                        id="dailyRent"
                        name="dailyRent"
                        type="number"
                        min="0"
                        value={pricingData.dailyRent}
                        onChange={handlePricingChange}
                        placeholder="e.g. 1599"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="weeklyRent">Weekly Rent (₹)</label>
                      <input
                        id="weeklyRent"
                        name="weeklyRent"
                        type="number"
                        min="0"
                        value={pricingData.weeklyRent}
                        onChange={handlePricingChange}
                        placeholder="e.g. 8999"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="monthlyRent">Monthly Rent (₹)</label>
                      <input
                        id="monthlyRent"
                        name="monthlyRent"
                        type="number"
                        min="0"
                        value={pricingData.monthlyRent}
                        onChange={handlePricingChange}
                        placeholder="e.g. 24999"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="extraKm">Extra KM Charges (₹/km)</label>
                      <input
                        id="extraKm"
                        name="extraKm"
                        type="number"
                        min="0"
                        value={pricingData.extraKm}
                        onChange={handlePricingChange}
                        placeholder="e.g. 12"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="freeKmPerDay">Free KM per day (km)</label>
                      <input
                        id="freeKmPerDay"
                        name="freeKmPerDay"
                        type="number"
                        min="0"
                        value={pricingData.freeKmPerDay}
                        onChange={handlePricingChange}
                        placeholder="e.g. 100"
                      />
                    </div>
                  </div>
                </div>

                <div className="sub-card">
                  <div className="card-header">
                    <h3>Additional Charges</h3>
                    <p className="section-label">Set optional additional charges for services.</p>
                  </div>

                  <div className="form-grid-2">
                    <div className="pricing-toggle-field">
                      <div>
                        <label htmlFor="driverCharges">Driver Charges (₹/day)</label>
                        <input
                          id="driverCharges"
                          name="driverCharges"
                          type="number"
                          min="0"
                          value={pricingData.driverCharges}
                          onChange={handlePricingChange}
                          placeholder="e.g. 500"
                          disabled={!pricingData.enableDriverCharges}
                        />
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="enableDriverCharges"
                          checked={pricingData.enableDriverCharges}
                          onChange={handlePricingChange}
                        />
                        <span className="switch-slider" />
                        <span className="toggle-label">Driver Charges</span>
                      </label>
                    </div>

                    <div className="pricing-toggle-field">
                      <div>
                        <label htmlFor="homeDeliveryCharges">Home Delivery Charges (₹)</label>
                        <input
                          id="homeDeliveryCharges"
                          name="homeDeliveryCharges"
                          type="number"
                          min="0"
                          value={pricingData.homeDeliveryCharges}
                          onChange={handlePricingChange}
                          placeholder="e.g. 499"
                          disabled={!pricingData.enableHomeDeliveryCharges}
                        />
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="enableHomeDeliveryCharges"
                          checked={pricingData.enableHomeDeliveryCharges}
                          onChange={handlePricingChange}
                        />
                        <span className="switch-slider" />
                        <span className="toggle-label">Home Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sub-card">
                  <div className="card-header">
                    <h3>Security & Fees</h3>
                    <p className="section-label">Security deposit and additional booking fees.</p>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="securityDeposit">Security Deposit (₹)</label>
                      <input
                        id="securityDeposit"
                        name="securityDeposit"
                        type="number"
                        min="0"
                        value={pricingData.securityDeposit}
                        onChange={handlePricingChange}
                        placeholder="e.g. 5000"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cleaningCharges">Cleaning Charges (₹)</label>
                      <input
                        id="cleaningCharges"
                        name="cleaningCharges"
                        type="number"
                        min="0"
                        value={pricingData.cleaningCharges}
                        onChange={handlePricingChange}
                        placeholder="e.g. 500"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="lateReturnCharges">Late Return Charges (₹/hr)</label>
                      <input
                        id="lateReturnCharges"
                        name="lateReturnCharges"
                        type="number"
                        min="0"
                        value={pricingData.lateReturnCharges}
                        onChange={handlePricingChange}
                        placeholder="e.g. 200"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cancellationCharges">Cancellation Charges (%)</label>
                      <input
                        id="cancellationCharges"
                        name="cancellationCharges"
                        type="number"
                        min="0"
                        max="100"
                        value={pricingData.cancellationCharges}
                        onChange={handlePricingChange}
                        placeholder="e.g. 10"
                      />
                    </div>
                  </div>
                </div>

                <div className="sub-card full-width pricing-summary-card horizontal-summary-card rounded-summary">
                  <div className="card-header">
                    <h3>Pricing Summary</h3>
                    <p className="section-label">Customers will see your pricing in the vehicle details page.</p>
                  </div>
                  <div className="pricing-summary-grid horizontal">
                    <div className="summary-item">
                      <div className="summary-label">Daily Rent</div>
                      <div className="summary-value">₹{pricingData.dailyRent || "0"}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Security Deposit</div>
                      <div className="summary-value">₹{pricingData.securityDeposit || "0"}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Driver Charges</div>
                      <div className="summary-value">₹{pricingData.enableDriverCharges ? pricingData.driverCharges || "0" : "0"}/day</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Home Delivery</div>
                      <div className="summary-value">₹{pricingData.enableHomeDeliveryCharges ? pricingData.homeDeliveryCharges || "0" : "0"}</div>
                    </div>
                    <div className="summary-item summary-total">
                      <div className="summary-label">Total Potential Earning</div>
                      <div className="summary-value total">₹{(Number(pricingData.dailyRent || 0)
                        + (pricingData.enableDriverCharges ? Number(pricingData.driverCharges || 0) : 0)
                        + (pricingData.enableHomeDeliveryCharges ? Number(pricingData.homeDeliveryCharges || 0) : 0)
                      ).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

              </div>

            </section>

          </div>

        ) : null}
        <div className="form-actions">

          {currentStep === 1 ? (

            <button
              type="button"
              className="secondary-button"
              onClick={onBack}
            >
              Cancel
            </button>

          ) : (

            <button
              type="button"
              className="secondary-button"
              onClick={() => setCurrentStep(currentStep === 3 ? 2 : 1)}
            >
              Back
            </button>

          )}

          <button type="submit" className="primary-button">

            {currentStep === 1 ? "Save & Continue" : currentStep === 2 ? "Save & Continue" : "save & Continue"}

          </button>

        </div>

      </form>

    </div>
  );
}