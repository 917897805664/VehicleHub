import React, { useState } from "react";
import axios from "axios";

const FORGOT_PASSWORD_URL = "http://localhost:8080/api/users/forgot-password";
const VERIFY_OTP_URL = "http://localhost:8080/api/users/verify-otp";
const RESET_PASSWORD_URL = "http://localhost:8080/api/users/reset-password";

export default function ForgotPassword({ role, onBackToLogin }) {
  const [step, setStep] = useState("request");
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(FORGOT_PASSWORD_URL, { email: form.email, role: role || "customer" });
      const otp = response.data?.data;
      setMessage(
        otp
          ? `If a user exists for this email, an OTP was sent to the registered mobile number. Use OTP ${otp} for local testing.`
          : response.data.message
      );
      setStep("verify");
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

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(VERIFY_OTP_URL, {
        email: form.email,
        otp: form.otp,
      });
      setMessage(response.data.message || "OTP verified. You may now create a new password.");
      setStep("reset");
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

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(RESET_PASSWORD_URL, {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
        role: role || "customer",
      });
      setMessage("Password updated successfully. You can now log in with your new password.");
      setStep("done");
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

  const renderRequestStep = () => (
    <form style={styles.card} onSubmit={handleRequestSubmit}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Forgot Password</h2>
        <p style={styles.subText}>Enter the email address linked to your account.</p>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {message && <div style={styles.success}>{message}</div>}
      <label style={styles.label}>Account Type</label>
      <select style={styles.input} value={role || "customer"} disabled>
        <option value="customer">Customer</option>
        <option value="vehicleOwner">Vehicle Owner</option>
        <option value="admin">Admin</option>
      </select>
      <label style={styles.label}>Email address</label>
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <div style={styles.buttonRow}>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
      <button type="button" style={styles.linkButton} onClick={onBackToLogin}>
        Back to Login
      </button>
    </form>
  );

  const renderVerifyStep = () => (
    <form style={styles.card} onSubmit={handleVerifySubmit}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Verify OTP</h2>
        <p style={styles.subText}>Enter the 6-digit code sent to your registered mobile number.</p>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {message && <div style={styles.success}>{message}</div>}
      <label style={styles.label}>Account Type</label>
      <select style={styles.input} value={role || "customer"} disabled>
        <option value="customer">Customer</option>
        <option value="vehicleOwner">Vehicle Owner</option>
        <option value="admin">Admin</option>
      </select>
      <label style={styles.label}>Email address</label>
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>OTP code</label>
      <input
        style={styles.input}
        type="text"
        name="otp"
        placeholder="123456"
        value={form.otp}
        onChange={handleChange}
        required
      />
      <div style={styles.buttonRow}>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
      <button type="button" style={styles.linkButton} onClick={() => setStep("request")}>Resend OTP</button>
      <button type="button" style={styles.linkButton} onClick={onBackToLogin}>
        Back to Login
      </button>
    </form>
  );

  const renderResetStep = () => (
    <form style={styles.card} onSubmit={handleResetSubmit}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Create New Password</h2>
        <p style={styles.subText}>Enter your new password for the account.</p>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {message && <div style={styles.success}>{message}</div>}
      <label style={styles.label}>Account Type</label>
      <select style={styles.input} value={role || "customer"} disabled>
        <option value="customer">Customer</option>
        <option value="vehicleOwner">Vehicle Owner</option>
        <option value="admin">Admin</option>
      </select>
      <label style={styles.label}>Email address</label>
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>OTP code</label>
      <input
        style={styles.input}
        type="text"
        name="otp"
        placeholder="123456"
        value={form.otp}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>New password</label>
      <input
        style={styles.input}
        type="password"
        name="newPassword"
        placeholder="At least 6 characters"
        value={form.newPassword}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Confirm new password</label>
      <input
        style={styles.input}
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <div style={styles.buttonRow}>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
      <button type="button" style={styles.linkButton} onClick={onBackToLogin}>
        Back to Login
      </button>
    </form>
  );

  const renderDoneStep = () => (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Password Updated</h2>
        <p style={styles.subText}>Your password has been changed successfully.</p>
      </div>
      {message && <div style={styles.success}>{message}</div>}
      <button style={styles.button} type="button" onClick={onBackToLogin}>
        Back to Login
      </button>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      {step === "request" && renderRequestStep()}
      {step === "verify" && renderVerifyStep()}
      {step === "reset" && renderResetStep()}
      {step === "done" && renderDoneStep()}
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
    maxWidth: "420px",
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
  linkButton: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#1b1f3b",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
    marginTop: "10px",
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
