import React, { useEffect, useState } from "react";
import axios from "axios";
import profileIcon from "./assets/profile_icon.jpg";

export default function AdminProfile({
  adminId,
  onBack,
}) {

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!adminId) {
      setError("Admin information is missing.");
      return;
    }

    axios
      .get(
        `http://localhost:8080/api/admin-profiles/${adminId}`
      )
      .then((response) => {

        if (response.data?.success) {
          setProfile(response.data.data);
        } else {
          setError(
            response.data?.message ||
            "Unable to load admin profile."
          );
        }

      })
      .catch((err) => {

        setError(
          err.response?.data?.message ||
          "Unable to load admin profile."
        );

      });

  }, [adminId]);

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

        <div className="profile-display-header">

          <img
            src={getPhoto()}
            alt="Admin"
            className="profile-display-photo"
          />

          <div>
            <h2>
              {profile.fullName}
            </h2>

            <p>
              Administrator Profile
            </p>
          </div>

        </div>

        <div className="profile-details-grid">

          <div>
            <strong>Email</strong>
            <span>
              {profile.admin?.email || "-"}
            </span>
          </div>

          <div>
            <strong>Phone</strong>
            <span>
              {profile.admin?.phone || "-"}
            </span>
          </div>

          <div>
            <strong>Date of Birth</strong>
            <span>
              {profile.dateOfBirth || "-"}
            </span>
          </div>

          <div>
            <strong>Gender</strong>
            <span>
              {profile.gender || "-"}
            </span>
          </div>

          <div>
            <strong>Department</strong>
            <span>
              {profile.department || "-"}
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

        <button onClick={onBack}>
          Back
        </button>

      </div>

    </div>
  );
}