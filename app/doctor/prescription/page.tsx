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
  const [amount, setAmount] = useState("500");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  async function savePrescription() {
    const token = localStorage.getItem("doctor_access_token");

    if (!token) {
      setMessage("Doctor login expired. Please login again.");
      return;
    }

    if (!url || !key) {
      setMessage("Supabase configuration missing.");
      return;
    }

    if (!diagnosis.trim() && !medicines.trim()) {
      setMessage("Please enter diagnosis or medicines.");
      return;
    }

    setSaving(true);
    setMessage("Saving prescription...");

    try {
      const prescriptionResponse = await fetch(
        `${url}/rest/v1/prescriptions`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            appointment_id: appointmentId
              ? Number(appointmentId)
              : null,
            patient_name: patientName,
            mobile: mobile || null,
            diagnosis: diagnosis.trim() || null,
            medicines: medicines.trim() || null,
            advice: advice.trim() || null,
            follow_up_date: followUp || null,
          }),
        }
      );

      const prescriptionText = await prescriptionResponse.text();

      if (!prescriptionResponse.ok) {
        setMessage(`Prescription error: ${prescriptionText}`);
        return;
      }

      const paymentResponse = await fetch(
        `${url}/rest/v1/payments`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            appointment_id: appointmentId
              ? Number(appointmentId)
              : null,
            amount: amount ? Number(amount) : 0,
            payment_status: paymentStatus,
          }),
        }
      );

      if (!paymentResponse.ok) {
        const paymentText = await paymentResponse.text();
        setMessage(
          `Prescription saved, but payment status failed: ${paymentText}`
        );
        return;
      }

      setMessage("Prescription and payment status saved successfully.");
    } catch (error) {
      setMessage(`Error: ${String(error)}`);
    } finally {
      setSaving(false);
    }
  }

  function printPrescription() {
    window.print();
  }

  const fieldStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "11px",
    marginTop: "6px",
    marginBottom: "15px",
    border: "1px solid #cbdedd",
    borderRadius: "8px",
    fontSize: "15px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4faf9",
        padding: "30px 20px",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#173737",
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: "white",
          padding: 30,
          borderRadius: 14,
          border: "1px solid #dcebea",
        }}
      >
        <div id="prescription">
          <div
            style={{
              borderBottom: "2px solid #087f7f",
              paddingBottom: 15,
              marginBottom: 20,
            }}
          >
            <h1
              style={{
                marginBottom: 5,
                color: "#087f7f",
              }}
            >
              Neuro Mind Bloom
            </h1>

            <p style={{ margin: 0 }}>
              Dr. Kuldeep Budania
              <br />
              MD Psychiatry
              <br />
              Ajmer, Rajasthan
            </p>
          </div>

          <h2>E-Prescription</h2>

          <div
            style={{
              background: "#f7fbfb",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <p>
              <b>Patient:</b> {patientName || "-"}
            </p>

            <p>
              <b>Mobile:</b> {mobile || "-"}
            </p>

            <p>
              <b>Appointment ID:</b> {appointmentId || "-"}
            </p>
          </div>

          <label>
            Diagnosis
            <textarea
              rows={3}
              style={fieldStyle}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis / provisional diagnosis"
            />
          </label>

          <label>
            Rx / Medicines
            <textarea
              rows={9}
              style={fieldStyle}
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              placeholder={`Example:
Tab. Escitalopram 10 mg
1 tablet once daily after breakfast
Duration: 30 days

Tab. Clonazepam 0.25 mg
1 tablet at bedtime
Duration: 7 days`}
            />
          </label>

          <label>
            Advice
            <textarea
              rows={4}
              style={fieldStyle}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Sleep hygiene, avoid alcohol, counselling advice, investigations, etc."
            />
          </label>

          <label>
            Follow-up Date
            <input
              type="date"
              style={fieldStyle}
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
            />
          </label>

          <div
            style={{
              marginTop: 25,
              paddingTop: 20,
              borderTop: "1px solid #dcebea",
            }}
          >
            <h3>Payment</h3>

            <label>
              Amount ₹
              <input
                type="number"
                min="0"
                style={fieldStyle}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>

            <label>
              Payment Status
              <select
                style={fieldStyle}
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </label>
          </div>
        </div>

        {message && (
          <div
            style={{
              marginTop: 20,
              padding: 12,
              background: "#eef8f7",
              border: "1px solid #bddedb",
              borderRadius: 8,
              overflowWrap: "anywhere",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <button
            onClick={savePrescription}
            disabled={saving}
            style={buttonStyle}
          >
            {saving ? "Saving..." : "Save Prescription"}
          </button>

          <button
            onClick={printPrescription}
            style={buttonStyle}
          >
            Print / Save PDF
          </button>

          <a
            href="/doctor"
            style={linkStyle}
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: "12px 16px",
  border: 0,
  borderRadius: 8,
  background: "#087f7f",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const linkStyle = {
  display: "inline-block",
  padding: "12px 16px",
  borderRadius: 8,
  border: "1px solid #087f7f",
  color: "#087f7f",
  textDecoration: "none",
  fontWeight: 700,
};
