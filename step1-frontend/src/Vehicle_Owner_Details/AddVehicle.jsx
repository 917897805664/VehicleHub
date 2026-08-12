import React, { useMemo, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/vehicle-owners/vehicles";

// Backend endpoints used by the four Add Vehicle steps.
const API_ENDPOINTS = {
  addVehicle: `${API_BASE_URL}/addVehicle`,
  media: (vehicleId) => `${API_BASE_URL}/${vehicleId}/media`,
  documents: (vehicleId) => `${API_BASE_URL}/${vehicleId}/documents`,
  pricing: (vehicleId) => `${API_BASE_URL}/${vehicleId}/pricing`,
};

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

export default function AddVehicle({ owner, onBack }) {
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

  // Step 1 creates the vehicle first. The generated ID is then used by
  // Steps 2, 3 and 4 to save child records against the same vehicle.
  const [vehicleId, setVehicleId] = useState(null);

  // Every selected media item keeps its file + the UI position/type.
  // Example: { file, mediaType: "PHOTO", viewType: "FRONT_VIEW" }
  const [mediaFiles, setMediaFiles] = useState([]);

  const [rcBookDocument, setRcBookDocument] = useState(null);
  const [insuranceDocument, setInsuranceDocument] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  /*
   * ============================================================
   * COMMON API HELPERS
   * ============================================================
   */

  const readApiResponse = async (response) => {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn("Backend returned non-JSON response:", text);
      return { message: text };
    }
  };

  const getVehicleIdFromResponse = (result) => {
    // Expected response:
    // {
    //   success: true,
    //   message: "...",
    //   data: { id: 1, ... }
    // }
    return (
      result?.data?.id ??
      result?.data?.vehicleId ??
      result?.vehicleId ??
      result?.id ??
      null
    );
  };

  /*
   * ============================================================
   * STEP 2 - PHOTOS & VIDEOS
   * ============================================================
   */

  const handleMediaUpload = (event, viewType, mediaType = "PHOTO") => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const acceptedType =
      mediaType === "VIDEO" ? "video/" : "image/";

    const invalidFile = files.find(
      (file) => !file.type.startsWith(acceptedType)
    );

    if (invalidFile) {
      alert(
        mediaType === "VIDEO"
          ? "Please upload video files only."
          : "Please upload image files only."
      );
      event.target.value = "";
      return;
    }

    const newMedia = files.map((file) => ({
      file,
      mediaType,
      viewType,
    }));

    setMediaFiles((prev) => [...prev, ...newMedia]);

    // Allow selecting the same file again later.
    event.target.value = "";
  };

  const removeMediaFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /*
   * ============================================================
   * STEP 3 - DOCUMENTS
   * ============================================================
   */

  const validateDocument = (file) => {
    if (!file) {
      return false;
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    const maxSize = 5 * 1024 * 1024; // 5 MB

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
      event.target.value = "";
      setter(null);
      return;
    }

    setter(file);
  };

  /*
   * ============================================================
   * STEP NAVIGATION
   * ============================================================
   */

  const handleStepClick = (step) => {
    // Do not allow the user to jump to a step whose previous
    // data has not been saved.
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleBackButton = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      return;
    }

    onBack();
  };

  /*
   * ============================================================
   * MAIN SAVE & CONTINUE HANDLER
   * ============================================================
   *
   * Step 1 -> POST vehicle + features -> receives vehicle ID
   * Step 2 -> POST photos/videos using vehicle ID
   * Step 3 -> POST RC + insurance using vehicle ID
   * Step 4 -> POST pricing/charges using vehicle ID
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    // ============================================================
    // STEP 1 - SAVE VEHICLE DETAILS + FEATURES
    // ============================================================
    if (currentStep === 1) {
      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const selectedFeatures = Object.keys(formData.features)
        .filter((feature) => formData.features[feature]);

      const payload = {
        // null on first save -> INSERT
        // existing ID on re-save -> UPDATE same vehicle
        vehicleId: vehicleId || null,
        ownerId: owner?.id || owner?.ownerId || null,
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
        features: selectedFeatures,
      };

      console.log("STEP 1 payload:", payload);
      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINTS.addVehicle, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await readApiResponse(response);
        console.log("STEP 1 response:", result);

        if (!response.ok) {
          alert(
            result?.message ||
              `Vehicle details could not be saved. HTTP ${response.status}`
          );
          return;
        }

        const savedVehicleId = getVehicleIdFromResponse(result);

        if (!savedVehicleId) {
          console.error("Backend response does not contain vehicleId:", result);
          alert(
            "Step 1 was processed, but the backend did not return vehicleId. " +
              "Check the browser Console and Spring Boot response."
          );
          return;
        }

        setVehicleId(savedVehicleId);
        alert(`Step 1 saved successfully. Vehicle ID: ${savedVehicleId}`);
        setCurrentStep(2);
      } catch (error) {
        console.error("STEP 1 error:", error);
        alert(
          "Server Error while saving Step 1. Check that Spring Boot is running on port 8080."
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    // ============================================================
    // STEP 2 - SAVE PHOTOS + VIDEOS
    // ============================================================
    if (currentStep === 2) {
      if (!vehicleId) {
        alert("Vehicle ID is missing. Please save Step 1 first.");
        setCurrentStep(1);
        return;
      }

      if (mediaFiles.length === 0) {
        alert("Please upload at least one photo or video before continuing.");
        return;
      }

      const multipartData = new FormData();

      mediaFiles.forEach((item) => {
        multipartData.append("files", item.file);
        // Must match @RequestParam("mediaTypes") in controller.
        multipartData.append("mediaTypes", item.mediaType);
        // Must match @RequestParam("viewTypes") in controller.
        multipartData.append("viewTypes", item.viewType);
      });

      console.log("STEP 2 vehicleId:", vehicleId, mediaFiles);
      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINTS.media(vehicleId), {
          method: "POST",
          body: multipartData,
        });

        const result = await readApiResponse(response);
        console.log("STEP 2 response:", result);

        if (!response.ok) {
          alert(
            result?.message ||
              `Photos/Videos could not be saved. HTTP ${response.status}`
          );
          return;
        }

        alert(
          `Step 2 saved successfully. Files: ${
            result?.data?.uploadedFiles ?? "saved"
          }`
        );
        setCurrentStep(3);
      } catch (error) {
        console.error("STEP 2 error:", error);
        alert(
          "Server Error while saving Step 2. Check the media upload API."
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    // ============================================================
    // STEP 3 - SAVE RC BOOK + INSURANCE
    // ============================================================
    if (currentStep === 3) {
      if (!vehicleId) {
        alert("Vehicle ID is missing. Please save Step 1 first.");
        setCurrentStep(1);
        return;
      }

      if (!rcBookDocument) {
        alert("Please upload the RC Book document (PDF, PNG, or JPG).");
        return;
      }

      if (!insuranceDocument) {
        alert("Please upload the Insurance document (PDF, PNG, or JPG).");
        return;
      }

      if (
        !validateDocument(rcBookDocument) ||
        !validateDocument(insuranceDocument)
      ) {
        return;
      }

      const documentData = new FormData();
      documentData.append("files", rcBookDocument);
      documentData.append("documentTypes", "RC_BOOK");
      documentData.append("files", insuranceDocument);
      documentData.append("documentTypes", "INSURANCE");

      console.log("STEP 3 vehicleId:", vehicleId);
      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINTS.documents(vehicleId), {
          method: "POST",
          body: documentData,
        });

        const result = await readApiResponse(response);
        console.log("STEP 3 response:", result);

        if (!response.ok) {
          alert(
            result?.message ||
              `Documents could not be saved. HTTP ${response.status}`
          );
          return;
        }

        alert(
          `Step 3 saved successfully. Documents: ${
            result?.data?.uploadedDocuments ?? "saved"
          }`
        );
        setCurrentStep(4);
      } catch (error) {
        console.error("STEP 3 error:", error);
        alert(
          "Server Error while saving Step 3. Check the document upload API."
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    // ============================================================
    // STEP 4 - SAVE ALL RENT RATES + CHARGES
    // ============================================================
    if (currentStep === 4) {
      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!vehicleId) {
        alert("Vehicle ID is missing. Please save Step 1 first.");
        setCurrentStep(1);
        return;
      }

      // IMPORTANT:
      // This is an OBJECT because the backend VehiclePricingRequest
      // receives the complete Step 4 form and converts every value into
      // one row of vehicle_charges.
      const pricingPayload = {
        hourlyRent: pricingData.hourlyRent === "" ? null : Number(pricingData.hourlyRent),
        dailyRent: Number(pricingData.dailyRent || 0),
        weeklyRent: pricingData.weeklyRent === "" ? null : Number(pricingData.weeklyRent),
        monthlyRent: pricingData.monthlyRent === "" ? null : Number(pricingData.monthlyRent),

        extraKm: pricingData.extraKm === "" ? null : Number(pricingData.extraKm),
        freeKmPerDay: pricingData.freeKmPerDay === "" ? null : Number(pricingData.freeKmPerDay),

        securityDeposit: pricingData.securityDeposit === "" ? null : Number(pricingData.securityDeposit),
        cleaningCharges: pricingData.cleaningCharges === "" ? null : Number(pricingData.cleaningCharges),
        lateReturnCharges: pricingData.lateReturnCharges === "" ? null : Number(pricingData.lateReturnCharges),
        cancellationCharges: pricingData.cancellationCharges === "" ? null : Number(pricingData.cancellationCharges),

        driverCharges: pricingData.driverCharges === "" ? null : Number(pricingData.driverCharges),
        homeDeliveryCharges: pricingData.homeDeliveryCharges === "" ? null : Number(pricingData.homeDeliveryCharges),
        pickUpCharges: pricingData.pickUpCharges === "" ? null : Number(pricingData.pickUpCharges),
        tollCharges: pricingData.tollCharges === "" ? null : Number(pricingData.tollCharges),
        parkingCharges: pricingData.parkingCharges === "" ? null : Number(pricingData.parkingCharges),
        nightCharges: pricingData.nightCharges === "" ? null : Number(pricingData.nightCharges),

        enableDriverCharges: pricingData.enableDriverCharges,
        enableHomeDeliveryCharges: pricingData.enableHomeDeliveryCharges,
        enablePickUpCharges: pricingData.enablePickUpCharges,
        enableTollCharges: pricingData.enableTollCharges,
        enableParkingCharges: pricingData.enableParkingCharges,
        enableNightCharges: pricingData.enableNightCharges,
      };

      console.log("STEP 4 vehicleId:", vehicleId);
      console.log("STEP 4 pricing payload:", pricingPayload);
      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINTS.pricing(vehicleId), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pricingPayload),
        });

        const result = await readApiResponse(response);
        console.log("STEP 4 response:", result);

        if (!response.ok) {
          alert(
            result?.message ||
              `Pricing & Charges could not be saved. HTTP ${response.status}`
          );
          return;
        }

        alert(
          `Vehicle added successfully!\nVehicle ID: ${vehicleId}\nCharges saved: ${
            result?.data?.savedCharges ?? "saved"
          }`
        );

        console.log("ALL 4 STEPS COMPLETED:", vehicleId);

        // Vehicle is now completely configured.
        // Return to the owner dashboard/list after successful final save.
        onBack();
      } catch (error) {
        console.error("STEP 4 error:", error);
        alert(
          "Server Error while saving Step 4. Check the pricing API."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
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

          {vehicleId && (
            <p className="add-vehicle-subtitle">
              Vehicle ID: <strong>{vehicleId}</strong>
            </p>
          )}
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
            className={`add-vehicle-step ${item.step === currentStep ? "active" : ""} ${
              item.step > currentStep ? "disabled-step" : ""
            }`}
            onClick={() => handleStepClick(item.step)}
            disabled={item.step > currentStep}
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
                    onChange={(e) => handleMediaUpload(e, "FRONT_VIEW", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "BACK_VIEW", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "LEFT_SIDE", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "RIGHT_SIDE", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "INTERIOR", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "DASHBOARD", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "BOOT_SPACE", "PHOTO")}
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
                    onChange={(e) => handleMediaUpload(e, "ENGINE_VIDEO", "VIDEO")}
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
                  onChange={(e) => handleMediaUpload(e, "ADDITIONAL_PHOTO", "PHOTO")}
                />

              </label>

              {mediaFiles.length > 0 && (
                <div className="selected-media-list">
                  <h4>Selected Files ({mediaFiles.length})</h4>

                  {mediaFiles.map((item, index) => (
                    <div
                      key={`${item.file.name}-${index}`}
                      className="selected-media-item"
                    >
                      <span>
                        {item.viewType.replaceAll("_", " ")} -{" "}
                        {item.file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeMediaFile(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

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

              {(rcBookDocument || insuranceDocument) && (
                <div className="selected-media-list">
                  <h4>Selected Documents</h4>

                  {rcBookDocument && (
                    <div className="selected-media-item">
                      <span>RC BOOK - {rcBookDocument.name}</span>
                    </div>
                  )}

                  {insuranceDocument && (
                    <div className="selected-media-item">
                      <span>INSURANCE - {insuranceDocument.name}</span>
                    </div>
                  )}
                </div>
              )}

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
              onClick={handleBackButton}
            >
              Back
            </button>

          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : "Save & Continue"}
          </button>

        </div>

      </form>

    </div>
  );
}