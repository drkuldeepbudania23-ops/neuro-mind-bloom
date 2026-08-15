"use client";

import { useEffect, useState } from "react";

export default function PrescriptionPage() {
  const [appointmentId, setAppointmentId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setAppointmentId(params.get("id") || "");
    setPatientName(params.get("name") || "");
    setMobile(params.get("mobile") || "");
  }, []);

  function printPrescription() {
    window.print();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px 15px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <header
          style={{
            textAlign: "center",
            borderBottom: "2px solid #0f766e",
            paddingBottom: "18px",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#0f766e",
              fontSize: "30px",
            }}
          >
            Neuro Mind Bloom
          </h1>

          <h2 style={{ margin: "10px 0 5px" }}>
            Dr. Kuldeep Budania
          </h2>

          <p style={{ margin: "4px 0", fontWeight: 700 }}>
            MD Psychiatry
          </p>

          <p style={{ margin: "4px 0", color: "#555" }}>
            Mental Health • De-addiction • Sexual Disorders
          </p>

          <p
            style={{
              margin: "8px 0 0",
              color: "#0f766e",
              fontWeight: 600,
            }}
          >
            E-Prescription
          </p>
        </header>

        <section
          style={{
            background: "#f8fafc",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Patient Details</h3>

          <p>
            <strong>Name:</strong>{" "}
            {patientName || "Not provided"}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {mobile || "Not provided"}
          </p>

          <p>
            <strong>Appointment ID:</strong>{" "}
            {appointmentId || "Not available"}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date().toLocaleDateString("en-IN")}
          </p>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>
            Diagnosis / Clinical Impression
          </label>

          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis or clinical impression"
            style={textAreaStyle}
          />
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>
            Rx / Medicines
          </label>

          <textarea
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="Enter medicines, dose, frequency and duration"
            style={{
              ...textAreaStyle,
              minHeight: "180px",
            }}
          />
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>
            Advice
          </label>

          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter investigations, precautions or advice"
            style={textAreaStyle}
          />
        </section>

        <section style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>
            Follow-up
          </label>

          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Example: Follow-up after 2 weeks"
            style={inputStyle}
          />
        </section>

        <button
          onClick={printPrescription}
          style={buttonStyle}
        >
          Print / Save Prescription
        </button>

        <footer
          style={{
            marginTop: "35px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
            textAlign: "right",
          }}
        >
          <strong>Dr. Kuldeep Budania</strong>
          <br />
          MD Psychiatry
        </footer>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: 700,
  marginBottom: "8px",
  fontSize: "16px",
};

const textAreaStyle = {
  width: "100%",
  minHeight: "110px",
  padding: "13px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "16px",
  resize: "vertical" as const,
  boxSizing: "border-box" as const,
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  background: "#0f766e",
  color: "#ffffff",
  border: "none",
  padding: "13px 22px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};
