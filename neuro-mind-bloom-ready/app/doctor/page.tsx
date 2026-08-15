"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorPage() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("dashboard");

  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [payment, setPayment] = useState("Pending");

  function login(e: React.FormEvent) {
    e.preventDefault();

    if (
      email.toLowerCase() === "drkuldeepbudania23@gmail.com" &&
      password.length > 0
    ) {
      setLoggedIn(true);
    } else {
      alert("Please enter registered doctor email and password.");
    }
  }

  const card: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  };

  const button: React.CSSProperties = {
    background: "#0f766e",
    color: "white",
    border: "none",
    padding: "13px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
  };

  const input: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  if (!loggedIn) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f0fdfa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ ...card, width: "100%", maxWidth: "430px" }}>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                background: "#0f766e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                fontSize: "26px",
                fontWeight: "bold",
              }}
            >
              N
            </div>

            <h1 style={{ marginBottom: "5px", color: "#134e4a" }}>
              Neuro Mind Bloom
            </h1>

            <p style={{ color: "#64748b" }}>Secure Doctor Portal</p>
          </div>

          <form onSubmit={login}>
            <label>Doctor Email</label>
            <input
              style={input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Doctor email"
              required
            />

            <label>Password</label>
            <input
              style={input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <button style={{ ...button, width: "100%" }} type="submit">
              Doctor Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
              marginTop: "20px",
            }}
          >
            Neuro Mind Bloom • Confidential Doctor Access
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#134e4a",
          color: "white",
          padding: "18px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Neuro Mind Bloom</h2>
          <small>Doctor Portal</small>
        </div>

        <button
          onClick={() => setLoggedIn(false)}
          style={{
            background: "white",
            color: "#134e4a",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "25px",
        }}
      >
        <h1 style={{ color: "#134e4a" }}>Doctor Dashboard</h1>

        <p style={{ color: "#64748b" }}>
          Dr. Kuldeep Budania • MD Psychiatry
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            margin: "25px 0",
          }}
        >
          <button style={button} onClick={() => setSection("dashboard")}>
            Dashboard
          </button>

          <button style={button} onClick={() => setSection("appointments")}>
            Appointments
          </button>

          <button style={button} onClick={() => setSection("prescription")}>
            E-Prescription
          </button>

          <button style={button} onClick={() => setSection("followup")}>
            Follow-up
          </button>

          <button style={button} onClick={() => setSection("payment")}>
            Payments
          </button>
        </div>

        {section === "dashboard" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "18px",
            }}
          >
            <div style={card}>
              <h3>Appointments</h3>
              <h2 style={{ color: "#0f766e" }}>Patient Consultations</h2>
              <button style={button} onClick={() => setSection("appointments")}>
                View
              </button>
            </div>

            <div style={card}>
              <h3>E-Prescription</h3>
              <p>Create digital prescriptions.</p>
              <button style={button} onClick={() => setSection("prescription")}>
                Create
              </button>
            </div>

            <div style={card}>
              <h3>Follow-up</h3>
              <p>Record next follow-up date.</p>
              <button style={button} onClick={() => setSection("followup")}>
                Manage
              </button>
            </div>

            <div style={card}>
              <h3>Payments</h3>
              <p>Consultation Fee: ₹500</p>
              <button style={button} onClick={() => setSection("payment")}>
                Check Payment
              </button>
            </div>
          </div>
        )}

        {section === "appointments" && (
          <div style={card}>
            <h2>Patient / Appointment Details</h2>

            <label>Patient Name</label>
            <input
              style={input}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient name"
            />

            <label>Mobile Number</label>
            <input
              style={input}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
            />

            <label>Age</label>
            <input
              style={input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />

            <button
              style={button}
              onClick={() => setSection("prescription")}
            >
              Proceed to Prescription
            </button>
          </div>
        )}

        {section === "prescription" && (
          <div style={card}>
            <h2>E-Prescription</h2>

            <p>
              <strong>Patient:</strong> {patientName || "Not entered"}
            </p>

            <p>
              <strong>Mobile:</strong> {mobile || "-"}
            </p>

            <label>Diagnosis</label>
            <textarea
              style={{ ...input, minHeight: "80px" }}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Diagnosis / provisional diagnosis"
            />

            <label>Medicines / Rx</label>
            <textarea
              style={{ ...input, minHeight: "140px" }}
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              placeholder="Medicine, dose, frequency and duration"
            />

            <label>Advice</label>
            <textarea
              style={{ ...input, minHeight: "100px" }}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Clinical advice"
            />

            <label>Follow-up Date / Advice</label>
            <input
              style={input}
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Example: After 2 weeks"
            />

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                style={button}
                onClick={() => window.print()}
              >
                Print / Save Prescription
              </button>

              <button
                style={button}
                onClick={() => setSection("payment")}
              >
                Payment Status
              </button>
            </div>
          </div>
        )}

        {section === "followup" && (
          <div style={card}>
            <h2>Follow-up Management</h2>

            <label>Patient</label>
            <input
              style={input}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient name"
            />

            <label>Follow-up</label>
            <input
              style={input}
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Follow-up date / duration"
            />

            <p>
              <strong>Current follow-up:</strong>{" "}
              {followUp || "Not scheduled"}
            </p>
          </div>
        )}

        {section === "payment" && (
          <div style={card}>
            <h2>Payment</h2>

            <p>
              <strong>Patient:</strong> {patientName || "Patient"}
            </p>

            <p>
              <strong>Video Consultation Fee:</strong> ₹500
            </p>

            <label>Payment Status</label>

            <select
              style={input}
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>

            <div
              style={{
                padding: "15px",
                background:
                  payment === "Paid" ? "#dcfce7" : "#fef3c7",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              Payment Status: <strong>{payment}</strong>
            </div>

            <p style={{ color: "#64748b" }}>
              Online payment gateway can be connected here later.
            </p>
          </div>
        )}

        <div style={{ marginTop: "25px" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "transparent",
              border: "1px solid #0f766e",
              color: "#0f766e",
              padding: "11px 18px",
              borderRadius: "9px",
              cursor: "pointer",
            }}
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </main>
  );
}
