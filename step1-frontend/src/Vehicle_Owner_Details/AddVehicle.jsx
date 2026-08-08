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

  const handleBackButton = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      return;
    }
    onBack();
  };

  const handleStepClick = (step) => {
    if (step === 1) {
      setCurrentStep(1);
    }
  };

 const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setCurrentStep(2);
        return;
    }

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

        description: formData.description

    };

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

        const result = await response.json();

        console.log(result);

        if(response.ok){

            alert("Vehicle Added Successfully");

        }else{

            alert(result.message);

        }

    }
    catch(error){

        console.error(error);

        alert("Server Error");

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
            className={`add-vehicle-step ${item.step === currentStep ? "active" : ""} ${item.step > 2 ? "disabled-step" : ""}`}
            onClick={() => handleStepClick(item.step)}
            disabled={item.step === 2 && currentStep === 1}
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
                <input id="vehicleName" name="vehicleName" type="text" value={formData.vehicleName} onChange={handleChange} placeholder="e.g. Hyundai i20" required />
              </div>

              <div className="form-field">
                <label htmlFor="type">Vehicle Type *</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="brand">Brand *</label>
                <select id="brand" name="brand" value={formData.brand} onChange={handleChange} required>
                  <option value="">Select Brand</option>
                  {brandList.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="model">Model *</label>
                <select id="model" name="model" value={formData.model} onChange={handleChange} required>
                  <option value="">Select Model</option>
                  {modelList.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="registration"> Vehicle Registration Number *</label>
                <input id="registration" name="registration" type="text" value={formData.registration} onChange={handleChange} placeholder="KA 01 AB 1234" required />
              </div>
              <div className="form-field">
                <label htmlFor="fuel">Fuel Type *</label>
                <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
                  <option value="">Select Fuel Type</option>
                  {fuelOptions.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>
              
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="year">Manufacturing Year *</label>
                <select id="year" name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="mileage">Mileage (kmpl)</label>
                <input id="mileage" name="mileage" type="text" value={formData.mileage} onChange={handleChange} placeholder="e.g. 18.2" />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="color">Color *</label>
                <select id="color" name="color" value={formData.color} onChange={handleChange} required>
                  <option value="">Select Color</option>
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
               <div className="form-field">
                <label htmlFor="seating">Seating Capacity *</label>
                <select id="seating" name="seating" value={formData.seating} onChange={handleChange} required>
                  <option value="">Select Seating</option>
                  {seatingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="transmission">Transmission *</label>
                <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
                  <option value="">Select Transmission</option>
                  {transmissionOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="capacity">Engine Capacity (CC)</label>
                <input id="capacity" name="capacity" type="text" value={formData.capacity} onChange={handleChange} placeholder="e.g. 1197" />
              </div>
             
            </div>

            <div className="form-field">
              <label htmlFor="description">Vehicle Description *</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe your vehicle, features, condition, etc." maxLength={500} required />
              <div className="char-count">{formData.description.length}/500</div>
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
        ) : (
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
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Back View</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Left Side</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">📷</span>
                  <strong>Right Side</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setPhotos)} />
                </label>
              </div>

              <div className="file-upload-grid">
                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Interior</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Dashboard</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">🖼️</span>
                  <strong>Boot Space</strong>
                  <span>Upload photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setAdditionalPhotos)} />
                </label>
                <label className="upload-card">
                  <span className="upload-icon">🎥</span>
                  <strong>Engine / Video</strong>
                  <span>Upload video</span>
                  <input type="file" accept="video/*" multiple onChange={(e) => handlePhotoUpload(e, setVideos)} />
                </label>
              </div>

              <label className="upload-card add-more-photos-card">
                <span className="upload-icon">➕</span>
                <strong>Add more photos</strong>
                <span>Upload additional images</span>
                <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload(e, setPhotos)} />
              </label>

            </section>
          </div>
        )}

        <div className="form-actions">
          {currentStep === 1 ? (
            <button type="button" className="secondary-button" onClick={onBack}>
              Cancel
            </button>
          ) : (
            <button type="button" className="secondary-button" onClick={() => setCurrentStep(1)}>
              Back
            </button>
          )}
          <button type="submit" className="primary-button">
            {currentStep === 1 ? "Save & Continue" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
