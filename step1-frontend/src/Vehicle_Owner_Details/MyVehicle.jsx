import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/vehicle-owners/vehicles";

const defaultVehicleImage =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80";

const formatPrice = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return "Price not available";
  }

  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

export default function MyVehicle({ owner, onViewDetails }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const ownerId = owner?.id ?? owner?.ownerId ?? null;
        const url = ownerId ? `${API_BASE_URL}/catalog?ownerId=${ownerId}` : `${API_BASE_URL}/catalog`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        if (result.success === false) {
          throw new Error(result.message || "Unable to load vehicles.");
        }

        setVehicles(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        console.error("Owner vehicle catalog error:", err);
        setError(err.message || "Unable to load vehicles.");
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [owner?.id, owner?.ownerId]);

  return (
    <section className="panel-card my-vehicles-card">
      <div className="panel-card-header">
        <h3>My Vehicles</h3>
        <button className="view-all-link" type="button">
          View Fleet
        </button>
      </div>

      {loading && (
        <div className="vehicle-card-meta">Loading your vehicles...</div>
      )}

      {!loading && error && (
        <div className="vehicle-card-meta" style={{ color: "#b91c1c" }}>
          {error}
        </div>
      )}

      {!loading && !error && vehicles.length === 0 && (
        <div className="vehicle-card-meta">No vehicles added yet.</div>
      )}

      {!loading && !error && vehicles.length > 0 && (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id || vehicle.vehicleNo || vehicle.vehicleName} className="vehicle-card">
              <img
                src={vehicle.frontImage || defaultVehicleImage}
                alt={vehicle.vehicleName || "Vehicle image"}
                className="vehicle-card-image"
              />

              <div className="vehicle-card-body">
                <div className="vehicle-card-title">{vehicle.vehicleName}</div>
                <div className="vehicle-card-meta">
                  {vehicle.brand || "Brand"} {vehicle.model || "Model"}
                </div>
                <div className="vehicle-card-meta">{vehicle.vehicleNo || "Registration not available"}</div>
                <div className="vehicle-card-detail">
                  {formatPrice(vehicle.dailyRent ?? vehicle.hourlyRent ?? vehicle.monthlyRent)} / day
                </div>

                <button
                  type="button"
                  className="vehicle-view-details"
                  onClick={() => onViewDetails?.(vehicle)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
