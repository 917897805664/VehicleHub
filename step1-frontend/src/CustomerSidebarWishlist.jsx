import React from "react";
import carImage from "./assets/car_image.jpg";

export default function CustomerSidebarWishlist({ likedVehicles = [], onViewDetails, onToggleWishlist, onAddMore }) {
  const getVehicleImage = (vehicle) => {
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

  const wishlistItems = Array.isArray(likedVehicles) ? likedVehicles : [];

  return (
    <div style={styles.wrapper}>
      <section style={styles.heroCard}>
        <div>
          <p style={styles.eyebrow}>Saved favorites</p>
          <h2 style={styles.title}>Wishlist</h2>
          <p style={styles.subtitle}>
            Keep your favorite vehicles in one place and book them whenever you are ready.
          </p>
        </div>
        <div style={styles.heroBadge}>{wishlistItems.length} saved item{wishlistItems.length === 1 ? "" : "s"}</div>
      </section>

      <section style={styles.listCard}>
        <div style={styles.listHeader}>
          <div>
            <h3 style={styles.sectionTitle}>Your Wishlist</h3>
            <p style={styles.sectionText}>This section expands automatically as you add more vehicles.</p>
          </div>
          <button type="button" style={styles.primaryButton} onClick={onAddMore}>
            Add More
          </button>
        </div>

        <div style={styles.wishlistGrid}>
          {wishlistItems.length === 0 ? (
            <div style={styles.emptyState}>No vehicles saved yet. Tap the heart on a vehicle card to add one.</div>
          ) : (
            wishlistItems.map((vehicle) => {
              const vehicleName = vehicle?.vehicleName || vehicle?.name || "Vehicle";
              const vehicleType = vehicle?.vehicleType || vehicle?.type || "Vehicle";
              const price = vehicle?.hourlyRent ?? vehicle?.price ?? "Price not available";
              const imageUrl = getVehicleImage(vehicle);
              const badge = vehicleType === "Bike" ? "Popular" : vehicleType === "Car" ? "Trending" : "Favorite";

              return (
                <div key={vehicle?.id || vehicleName} style={styles.itemCard}>
                  <div style={styles.itemTopBar}>
                    <span style={styles.badge}>{badge}</span>
                    <button
                      type="button"
                      style={styles.heartButton}
                      aria-label="Remove from wishlist"
                      onClick={() => onToggleWishlist?.(vehicle)}
                    >
                      ♥
                    </button>
                  </div>

                  <div style={styles.imageWrap}>
                    <img
                      src={imageUrl}
                      alt={vehicleName}
                      onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = carImage;
                      }}
                      style={styles.image}
                    />
                  </div>

                  <div style={styles.itemBody}>
                    <h4 style={styles.itemTitle}>{vehicleName}</h4>
                    <p style={styles.itemType}>{vehicleType}</p>
                  </div>

                  <div style={styles.itemFooter}>
                    <span style={styles.price}>{typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price}</span>
                    <button type="button" style={styles.viewButton} onClick={() => onViewDetails?.(vehicle)}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "grid",
    gap: "24px",
    minHeight: "720px",
  },
  heroCard: {
    background: "linear-gradient(135deg, #e8f8ee 0%, #f7fdf9 100%)",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #d8ecde",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  },
  eyebrow: {
    margin: 0,
    color: "#0f7a34",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontWeight: 700,
    fontSize: "12px",
  },
  title: {
    margin: "6px 0",
    fontSize: "28px",
    color: "#102a43",
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    maxWidth: "620px",
    lineHeight: 1.7,
  },
  heroBadge: {
    background: "#0f7a34",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  listCard: {
    background: "#fff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 40px rgba(31, 45, 73, 0.06)",
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#102a43",
  },
  sectionText: {
    margin: "6px 0 0",
    color: "#6f7c92",
    fontSize: "14px",
  },
  primaryButton: {
    border: "none",
    background: "#0f7a34",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  wishlistGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    alignItems: "start",
  },
  emptyState: {
    gridColumn: "1 / -1",
    padding: "24px",
    borderRadius: "16px",
    border: "1px dashed #cbd5e1",
    color: "#64748b",
    textAlign: "center",
    background: "#f8fafc",
  },
  itemCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "18px",
    background: "#f8fafc",
    display: "grid",
    gap: "14px",
    minHeight: "100%",
    boxSizing: "border-box",
  },
  itemTopBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#eaf8ef",
    color: "#0f7a34",
    fontWeight: 700,
    fontSize: "12px",
  },
  heartButton: {
    border: "none",
    background: "#fff",
    color: "#ef4444",
    fontSize: "16px",
    cursor: "pointer",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
  },
  imageWrap: {
    borderRadius: "16px",
    overflow: "hidden",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    display: "block",
  },
  itemBody: {
    display: "grid",
    gap: "6px",
  },
  itemTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#102a43",
  },
  itemType: {
    margin: 0,
    fontWeight: 700,
    color: "#0f7a34",
  },
  itemDescription: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.6,
  },
  itemFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "4px",
  },
  price: {
    fontWeight: 800,
    color: "#0f7a34",
  },
  viewButton: {
    border: "none",
    background: "#0f7a34",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },
};
