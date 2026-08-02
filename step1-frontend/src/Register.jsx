import React, { useState } from "react";
import axios from "axios";

const ROLE_CONFIG = {
  customer: { apiUrl: "http://localhost:8080/api/customers/register", heading: "Create your Customer account" },
  vehicleOwner: { apiUrl: "http://localhost:8080/api/vehicle-owners/register", heading: "Create your VehicleOwner account" },
  admin: { apiUrl: "http://localhost:8080/api/admins/register", heading: "Create your Admin account" },
};

export default function Register({ role, onRoleChange, onLoginClick, onLandingClick }) {
  const registerRole = role === "admin" ? "customer" : (role || "customer");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      const response = await axios.post(ROLE_CONFIG[registerRole].apiUrl, payload);
      setMessage(response.data.message || "Registration successful!");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setAgreeTerms(false);

      if (onLoginClick) {
        onLoginClick();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Could not reach the server. Is the backend running on port 8080?");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleLandingClick = () => {
    if (onLandingClick) {
      onLandingClick();
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.header}>
          <h2 style={styles.heading}>{ROLE_CONFIG[registerRole].heading}</h2>
          <p style={styles.subText}>Join us and start renting vehicles</p>
        </div>

        <label style={styles.label}>Register As</label>
        <select
          style={styles.input}
          value={registerRole}
          onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="vehicleOwner">VehicleOwner</option>     
        </select>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          name="fullName"
          placeholder="e.g. Om Sharma"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="e.g. om@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Phone Number</label>
        <input
          style={styles.input}
          name="phone"
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <span style={styles.checkboxText}>
            I agree to the Terms and Conditions and Privacy Policy.
          </span>
        </label>

        <div style={styles.buttonRow}>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <button type="button" style={styles.loginLink} onClick={handleLoginClick}>
            Login
          </button>
        </p>

        <p style={styles.loginText}>
          <button type="button" style={styles.loginLink} onClick={handleLandingClick}>
            Go to Landing Page
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "60px",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  header: {
    textAlign: "center",
    marginBottom: "8px",
  },
  heading: {
    margin: "0 0 4px",
    fontSize: "24px",
    color: "#1b1f3b",
  },
  subText: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  label: { fontSize: "13px", color: "#555", marginTop: "8px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "10px",
    fontSize: "13px",
    color: "#555",
  },
  checkboxText: {
    lineHeight: 1.4,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#1b1f3b",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loginText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  loginLink: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#1b1f3b",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    background: "#ffe5e5",
    color: "#c0392b",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
  },
  success: {
    background: "#e5ffe9",
    color: "#1a7a34",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
  },
};