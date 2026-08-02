import React from "react";

export default function Sidebar({ active = "dashboard", onSelect = () => {} }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "search", label: "Search Vehicles" },
    { key: "wishlist", label: "Wishlist" },
    { key: "bookings", label: "My Bookings" },
    { key: "offers", label: "Offers" },
    { key: "notifications", label: "Notifications", badge: 3 },
    { key: "messages", label: "Messages" },
    { key: "payments", label: "Payment History" },
    { key: "profile", label: "Profile" },
    { key: "help", label: "Help Center" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.topBrand}>
        <div style={styles.logoBox}>VH</div>
        <div>
          <div style={styles.brandName}>VehicleHub</div>
          <div style={styles.brandTag}>Ride Anytime, Anywhere</div>
        </div>
      </div>

      <nav style={styles.nav}>
        {items.map((it) => (
          <div
            key={it.key}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(it.key)}
            onKeyDown={(e) => (e.key === "Enter" ? onSelect(it.key) : null)}
            style={{ ...styles.navItem, ...(active === it.key ? styles.navItemActive : {}) }}
          >
            <div style={styles.navIcon}>{it.label.charAt(0)}</div>
            <div style={styles.navLabel}>{it.label}</div>
            {it.badge ? <div style={styles.badge}>{it.badge}</div> : null}
          </div>
        ))}
      </nav>

      <div style={styles.footerCard}>
        <div style={styles.referTitle}>Refer & Earn</div>
        <div style={styles.referText}>Invite your friends and earn exciting rewards</div>
        <button style={styles.referButton}>Refer Now</button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 260,
    background: "#ffffff",
    borderRight: "1px solid #eef2f5",
    padding: "20px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topBrand: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#0f7a34",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    fontSize: 18,
  },
  brandName: { fontWeight: 800, color: "#0f7a34" },
  brandTag: { fontSize: 12, color: "#6f7c92" },
  nav: { display: "flex", flexDirection: "column", gap: 10 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    color: "#334155",
  },
  navItemActive: { background: "#eaf8ef", color: "#0f7a34", fontWeight: 700 },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "#f1f5f9",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
  },
  navLabel: { flex: 1 },
  badge: {
    background: "#ef4444",
    color: "white",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
  },
  footerCard: {
    background: "#f6fff7",
    padding: 14,
    borderRadius: 12,
  },
  referTitle: { fontWeight: 700, color: "#0f7a34" },
  referText: { fontSize: 13, color: "#55606c", margin: "8px 0" },
  referButton: {
    padding: "8px 12px",
    background: "#0f7a34",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
