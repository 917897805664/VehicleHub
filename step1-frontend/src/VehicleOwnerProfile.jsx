import React, { useEffect, useState } from "react";
import axios from "axios";
import profileIcon from "./assets/profile_icon.jpg";

export default function VehicleOwnerProfile({
  ownerId,
  onBack,
}) {

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!ownerId) {
      setError("Owner information is missing.");
      return;
    }

    axios
      .get(
        `http://localhost:8080/api/vehicle-owner-profiles/${ownerId}`
      )
      .then((response) => {

        if (response.data?.success) {
          setProfile(response.data.data);
        } else {
          setError(
            response.data?.message ||
            "Unable to load owner profile."
          );
        }

      })
      .catch((err) => {

        setError(
          err.response?.data?.message ||
          "Unable to load owner profile."
        );

      });

  }, [ownerId]);

  const getPhoto = () => {

    if (
      !profile?.profilePhoto ||
      profile.profilePhoto === "DEFAULT_PROFILE_PHOTO"
    ) {
      return profileIcon;
    }

    if (
      profile.profilePhoto.startsWith("data:image")
    ) {
      return profile.profilePhoto;
    }

    return profileIcon;
  };

  if (!profile) {

    return (
      <div className="profile-page-wrapper">
        <div className="profile-card">

          {error || "Loading profile..."}

          <button onClick={onBack}>
            Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper">

      <div className="profile-display-card">

        <div className="profile-display-toolbar">
          <button
            type="button"
            className="profile-back-button"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <div className="profile-display-header">

          <img
            src={getPhoto()}
            alt="Vehicle Owner"
            className="profile-display-photo"
          />

          <div>
            <h2>
              {profile.fullName}
            </h2>

            <p>
              Vehicle Owner Profile
            </p>
          </div>

        </div>

        <div className="profile-details-grid">

          <div>
            <strong>Owner Type</strong>
            <span>
              {profile.ownerType}
            </span>
          </div>

          <div>
            <strong>Email</strong>
            <span>
              {profile.vehicleOwner?.email || "-"}
            </span>
          </div>

          <div>
            <strong>Phone</strong>
            <span>
              {profile.vehicleOwner?.phone || "-"}
            </span>
          </div>

          <div>
            <strong>Business Name</strong>
            <span>
              {profile.businessName || "-"}
            </span>
          </div>

          <div>
            <strong>Business Mobile Number</strong>
            <span>
              {profile.businessMobileNumber || "-"}
            </span>
          </div>

          <div>
            <strong>Business Registration Number</strong>
            <span>
              {profile.businessRegistrationNumber || "-"}
            </span>
          </div>

          <div>
            <strong>GST Number</strong>
            <span>
              {profile.gstNumber || "-"}
            </span>
          </div>

          <div>
            <strong>PAN Number</strong>
            <span>
              {profile.panNumber || "-"}
            </span>
          </div>

          <div>
            <strong>Country</strong>
            <span>
              {profile.country}
            </span>
          </div>

          <div>
            <strong>State</strong>
            <span>
              {profile.state}
            </span>
          </div>

          <div>
            <strong>City</strong>
            <span>
              {profile.city}
            </span>
          </div>

          <div>
            <strong>Pincode</strong>
            <span>
              {profile.pincode}
            </span>
          </div>

          <div className="profile-full-width">
            <strong>Address</strong>
            <span>
              {profile.address}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}