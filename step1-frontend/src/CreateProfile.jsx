import React, { useEffect, useState } from "react";
import axios from "axios";
import profileIcon from "./assets/profile_icon.jpg";

import {
  getCountries,
  getStates,
  getCities,
} from "./locationData";

const API_URLS = {
  customer: "http://localhost:8080/api/customer-profiles/save",
  vehicleOwner: "http://localhost:8080/api/vehicle-owner-profiles/save",
  admin: "http://localhost:8080/api/admin-profiles/save",
};

const CreateProfile = ({
  role,
  user,
  onProfileSaved,
}) => {

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    dateOfBirth: "",
    gender: "",
    department: "",

    ownerType: "",

    businessName: "",
    businessMobileNumber: "",
    businessRegistrationNumber: "",
    gstNumber: "",
    panNumber: "",

    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",

    profilePhoto: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [previewPhoto, setPreviewPhoto] =
    useState(profileIcon);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  useEffect(() => {
    if (!form.country) {
      setStates([]);
      return;
    }

    setStates(getStates(form.country));
    setCities([]);

    setForm((previous) => ({
      ...previous,
      state: "",
      city: "",
    }));
  }, [form.country]);

  useEffect(() => {
    if (!form.country || !form.state) {
      setCities([]);
      return;
    }

    setCities(getCities(form.country, form.state));

    setForm((previous) => ({
      ...previous,
      city: "",
    }));
  }, [form.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewPhoto(profileIcon);

      setForm((previous) => ({
        ...previous,
        profilePhoto: "",
      }));

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      setPreviewPhoto(base64);

      setForm((previous) => ({
        ...previous,
        profilePhoto: base64,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user?.id) {
      setError(
        "User information is missing. Please login/register again."
      );
      return;
    }

    if (role === "vehicleOwner") {

      if (
        form.businessRegistrationNumber.trim() !== ""
      ) {

        if (!form.gstNumber.trim()) {
          setError(
            "GST Number is required when Business Registration Number is entered."
          );
          return;
        }

        if (!form.panNumber.trim()) {
          setError(
            "PAN Number is required when Business Registration Number is entered."
          );
          return;
        }
      }
    }

    setLoading(true);

    try {

      let payload = {};

      if (role === "customer") {

        payload = {
          customerId: user.id,
          fullName: form.fullName,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          address: form.address,
          country: getCountryName(form.country),
          state: getStateName(form.country, form.state),
          city: form.city,
          pincode: form.pincode,
          profilePhoto:
            form.profilePhoto || "DEFAULT_PROFILE_PHOTO",
        };

      } else if (role === "vehicleOwner") {

        payload = {
          vehicleOwnerId: user.id,
          fullName: form.fullName,
          ownerType: form.ownerType,
          businessName: form.businessName,
          businessMobileNumber:
            form.businessMobileNumber,
          businessRegistrationNumber:
            form.businessRegistrationNumber,
          gstNumber: form.gstNumber,
          panNumber: form.panNumber,
          address: form.address,
          country: getCountryName(form.country),
          state: getStateName(form.country, form.state),
          city: form.city,
          pincode: form.pincode,
          profilePhoto:
            form.profilePhoto || "DEFAULT_PROFILE_PHOTO",
        };

      } else {

        payload = {
          adminId: user.id,
          fullName: form.fullName,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          department: form.department,
          address: form.address,
          country: getCountryName(form.country),
          state: getStateName(form.country, form.state),
          city: form.city,
          pincode: form.pincode,
          profilePhoto:
            form.profilePhoto || "DEFAULT_PROFILE_PHOTO",
        };
      }

      const response = await axios.post(
        API_URLS[role],
        payload
      );

      if (response.data?.success) {

        setSuccess(
          "Profile created successfully. Redirecting to login..."
        );

        setTimeout(() => {

          if (onProfileSaved) {
            onProfileSaved(role);
          }

        }, 1000);

      } else {

        setError(
          response.data?.message ||
          "Unable to save profile."
        );
      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Could not save profile. Please check whether the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  const getCountryName = (code) => {
    const country = countries.find(
      (item) => item.isoCode === code
    );

    return country?.name || "";
  };

  const getStateName = (countryCode, stateCode) => {
    const stateList = getStates(countryCode);

    const state = stateList.find(
      (item) => item.isoCode === stateCode
    );

    return state?.name || "";
  };

  const getTitle = () => {

    if (role === "customer") {
      return "Create Customer Profile";
    }

    if (role === "vehicleOwner") {
      return "Create Vehicle Owner Profile";
    }

    return "Create Admin Profile";
  };

  return (
    <div className="profile-form-page">
      <div className="profile-form-shell">
        <div className="profile-form-hero">
          <div className="profile-form-hero-copy">
            <span className="profile-form-eyebrow">
              Account setup
            </span>
            <h2>{getTitle()}</h2>
            <p>
              Complete your profile details to continue with a secure and personalized experience.
            </p>
          </div>

          <div className="profile-form-badge">
            {role === "customer"
              ? "Customer"
              : role === "vehicleOwner"
                ? "Vehicle Owner"
                : "Admin"}
          </div>
        </div>

        <form
          className="profile-form-card"
          onSubmit={handleSubmit}
        >
          <div className="profile-form-layout">
            <aside className="profile-form-sidebar">
              <div className="profile-photo-section">
                <img
                  src={previewPhoto}
                  alt="Profile preview"
                  className="profile-photo-preview"
                />

                <label className="profile-upload-label">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>

                <small>
                  Default icon will be used if no photo is uploaded.
                </small>
              </div>
            </aside>

            <div className="profile-form-body">
              {error && (
                <div className="profile-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="profile-success">
                  {success}
                </div>
              )}

              <div className="profile-form-grid">
                <div className="profile-field profile-field-full">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {role !== "vehicleOwner" && (
                  <>
                    <div className="profile-field">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="profile-field">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {role === "admin" && (
                  <div className="profile-field profile-field-full">
                    <label>Department</label>
                    <input
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      placeholder="Enter department"
                    />
                  </div>
                )}

                {role === "vehicleOwner" && (
                  <>
                    <div className="profile-field profile-field-full">
                      <label>Owner Type</label>
                      <select
                        name="ownerType"
                        value={form.ownerType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Owner Type</option>
                        <option value="Individual">Individual</option>
                        <option value="Business">Business</option>
                        <option value="Company">Company / Organization</option>
                      </select>
                    </div>

                    <div className="profile-field">
                      <label>Business Name</label>
                      <input
                        name="businessName"
                        value={form.businessName}
                        onChange={handleChange}
                        placeholder="Enter business name"
                      />
                    </div>

                    <div className="profile-field">
                      <label>Business Mobile Number</label>
                      <input
                        name="businessMobileNumber"
                        value={form.businessMobileNumber}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        maxLength="10"
                      />
                    </div>

                    <div className="profile-field">
                      <label>Business Registration Number</label>
                      <input
                        name="businessRegistrationNumber"
                        value={form.businessRegistrationNumber}
                        onChange={handleChange}
                        placeholder="Optional"
                      />
                    </div>

                    <div className="profile-field">
                      <label>
                        GST Number
                        {form.businessRegistrationNumber && (
                          <span className="required-star">*</span>
                        )}
                      </label>
                      <input
                        name="gstNumber"
                        value={form.gstNumber}
                        onChange={handleChange}
                        placeholder={
                          form.businessRegistrationNumber
                            ? "Required"
                            : "Optional"
                        }
                      />
                    </div>

                    <div className="profile-field">
                      <label>
                        PAN Number
                        {form.businessRegistrationNumber && (
                          <span className="required-star">*</span>
                        )}
                      </label>
                      <input
                        name="panNumber"
                        value={form.panNumber}
                        onChange={handleChange}
                        placeholder={
                          form.businessRegistrationNumber
                            ? "Required"
                            : "Optional"
                        }
                      />
                    </div>
                  </>
                )}

                <div className="profile-field profile-field-full">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    required
                    rows="4"
                  />
                </div>

                <div className="profile-field">
                  <label>Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option
                        key={country.isoCode}
                        value={country.isoCode}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="profile-field">
                  <label>State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    disabled={!form.country}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option
                        key={state.isoCode}
                        value={state.isoCode}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="profile-field">
                  <label>City</label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!form.state}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option
                        key={`${city.name}-${city.stateCode}`}
                        value={city.name}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="profile-field">
                  <label>Pincode</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-form-actions">
            <button
              type="submit"
              className="profile-form-button"
              disabled={loading}
            >
              {loading ? "Saving Profile..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;