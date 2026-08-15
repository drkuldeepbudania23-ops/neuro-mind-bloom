"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PrescriptionPage() {
  const params = useSearchParams();

  const appointmentId = params.get("id") || "";
  const patientName = params.get("name") || "";
  const mobile = params.get("mobile") || "";

  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");

  const printPrescription = () => {
    window.print();
  };

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
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
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

          <h2
            style={{
              margin: "10px 0 5px",
              fontSize: "22px",
            }}
          >
            Dr. Kuldeep Budania
          </h2>

          <p style={{ margin: "4px 0", fontWeight: "bold" }}>
            MD Psychiatry
          </p>

          <p style={{ margin: "4px 0", color: "#555" }}>
            Mental Health • De-addiction • Sexual Disorders
          </p>

          <p style={{ margin: "4px 0", color: "#555" }}>
            E-Prescription
          </p>
        </div>

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
            <strong>Name:</strong> {patientName || "Not provided"}
          </p>

          <p>
            <strong>Mobile:</strong> {mobile || "Not provided"}
          </p>

          <p>
            <strong>Appointment ID:</strong>{" "}
            {appointmentId || "Not available"}
          </p>

          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}
          </p>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Diagnosis / Clinical Impression</label>

          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis or clinical impression"
            style={textAreaStyle}
          />
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Rx / Medicines</label>

          <textarea
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder={
              "Example:\nTab. Medicine 10 mg – 1 tablet at night × 10 days"
            }
            style={{
              ...textAreaStyle,
              minHeight: "180px",
            }}
          />
        </section>

        <section style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Advice</label>

          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter investigations, precautions or other advice"
            style={textAreaStyle}
          />
        </section>

        <section style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Follow-up</label>

          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Example: Follow-up after 2 weeks"
            style={{
              width: "100%",
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </section>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <button
            onClick={printPrescription}
            style={buttonStyle}
          >
            Print / Save Prescription
          </button>
        </div>

        <div
          style={{
            marginTop: "35px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
            textAlign: "right",
          }}
        >
          <strong>Dr. Kuldeep Budania</strong>
          <br />
          <span>MD Psychiatry</span>
        </div>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "bold",
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

const buttonStyle = {
  background: "#0f766e",
  color: "white",
  border: "none",
  padding: "13px 22px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};
