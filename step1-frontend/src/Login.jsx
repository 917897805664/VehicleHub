import React, { useState } from "react";
import axios from "axios";
import { getLoginConfig } from "./loginConfig";

export default function Login({ role, onRoleChange, onRegisterClick, onForgotPasswordClick, onLandingClick, onLoginSuccess }) {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const selectedRole = role || "customer";
  const loginConfig = getLoginConfig(selectedRole);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(loginConfig.apiUrl, {
        identifier: form.identifier,
        password: form.password,
      });

      if (response.data && response.data.success) {
        setSuccess(response.data.message || "Login successful!");
        if (onLoginSuccess) {
          onLoginSuccess(selectedRole);
        }
      } else {
        setError(response.data.message || "Login failed.");
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

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    }
  };

  const handleForgotPasswordClick = () => {
    if (onForgotPasswordClick) {
      onForgotPasswordClick();
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
          <h2 style={styles.heading}>Welcome Back!</h2>
          <p style={styles.subText}>{loginConfig.heading}</p>
        </div>

        <label style={styles.label}>Login As</label>
        <select
          style={styles.input}
          value={selectedRole}
          onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="vehicleOwner">Vehicle Owner</option>
          <option value="admin">Admin</option>
        </select>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <label style={styles.label}>Email or Mobile Number</label>
        <input
          style={styles.input}
          type="text"
          name="identifier"
          placeholder="Enter your email or mobile number"
          value={form.identifier}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div style={styles.optionsRow}>
          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span style={styles.checkboxText}>Remember Me</span>
          </label>

          <button type="button" style={styles.linkButton} onClick={handleForgotPasswordClick}>
            Forgot Password?
          </button>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {selectedRole !== "admin" ? (
          <p style={styles.registerText}>
            Don't have an account?{" "}
            <button type="button" style={styles.linkButton} onClick={handleRegisterClick}>
              Register
            </button>
          </p>
        ) : (
          <p style={styles.registerText}>Admin accounts can only be accessed through login.</p>
        )}

        <p style={styles.registerText}>
          <button type="button" style={styles.linkButton} onClick={handleLandingClick}>
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
    gap: "8px",
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
  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    gap: "8px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#555",
  },
  checkboxText: {
    lineHeight: 1.4,
  },
  linkButton: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#1b1f3b",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
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
  registerText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
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
