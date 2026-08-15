"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {
  const [email, setEmail] = useState("drkuldeepbudania23@gmail.com");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    const savedToken = localStorage.getItem("doctor_access_token");

    if (savedToken) {
      setToken(savedToken);
      loadAppointments(savedToken);
    }
  }, []);

  async function login() {
    if (!url || !key) {
      setMessage("Supabase configuration missing.");
      return;
    }

    setMessage("Logging in...");

    try {
      const res = await fetch(
        `${url}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data?.error_description ||
            data?.msg ||
            "Login failed."
        );
        return;
      }

      localStorage.setItem(
        "doctor_access_token",
        data.access_token
      );

      setToken(data.access_token);
      setMessage("Login successful.");

      await loadAppointments(data.access_token);
    } catch (error) {
      setMessage(`Login error: ${String(error)}`);
    }
  }

  async function loadAppointments(accessToken: string) {
    if (!url || !key) return;

    try {
      const res = await fetch(
        `${url}/rest/v1/appointments?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage("Could not load appointments.");
        return;
      }

      setAppointments(data);
    } catch (error) {
      setMessage(`Appointment load error: ${String(error)}`);
    }
  }

  function logout() {
    localStorage.removeItem("doctor_access_token");
    setToken("");
    setAppointments([]);
    setMessage("");
  }

  if (!token) {
    return (
      <main style={pageStyle}>
        <div style={loginCard}>
          <h1>Doctor Login</h1>

          <p>
            Neuro Mind Bloom
          </p>

          <label>
            Email
            <input
              style={inputStyle}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </label>

          <button
            onClick={login}
            style={buttonStyle}
          >
            Login
          </button>

          {message && (
            <p style={{ marginTop: 15 }}>
              {message}
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            marginBottom: 25,
          }}
        >
          <div>
            <h1>Doctor Dashboard</h1>
            <p>
              Dr. Kuldeep Budania
            </p>
          </div>

          <button
            onClick={logout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 15,
            marginBottom: 30,
          }}
        >
          <div style={statCard}>
            <strong>
              {appointments.length}
            </strong>
            <span>
              Total Appointments
            </span>
          </div>

          <div style={statCard}>
            <strong>
              {
                appointments.filter(
                  (a) =>
                    a.status === "pending"
                ).length
              }
            </strong>
            <span>
              Pending
            </span>
          </div>

          <div style={statCard}>
            <strong>
              E-Rx
            </strong>
            <span>
              Prescription Module
            </span>
          </div>

          <div style={statCard}>
            <strong>
              ₹
            </strong>
            <span>
              Payment Tracking
            </span>
          </div>
        </div>

        <h2>Appointments</h2>

        {message && (
          <p>{message}</p>
        )}

        {appointments.length === 0 ? (
          <div style={appointmentCard}>
            No appointments found.
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={appointmentCard}
            >
              <h3>
                {appointment.patient_name}
              </h3>

              <p>
                <b>Mobile:</b>{" "}
                {appointment.mobile}
              </p>

              <p>
                <b>Age:</b>{" "}
                {appointment.age || "-"}
              </p>

              <p>
                <b>Gender:</b>{" "}
                {appointment.gender || "-"}
              </p>

              <p>
                <b>Service:</b>{" "}
                {appointment.service}
              </p>

              <p>
                <b>Date:</b>{" "}
                {appointment.appointment_date}
              </p>

              <p>
                <b>Time:</b>{" "}
                {appointment.appointment_time}
              </p>

              <p>
                <b>Status:</b>{" "}
                {appointment.status}
              </p>

              {appointment.message && (
                <p>
                  <b>Concern:</b>{" "}
                  {appointment.message}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 15,
                }}
              >
                <a
                  href={`/doctor/prescription?id=${appointment.id}&name=${encodeURIComponent(
                    appointment.patient_name
                  )}&mobile=${encodeURIComponent(
                    appointment.mobile
                  )}`}
                  style={linkButton}
                >
                  Create E-Prescription
                </a>

                <a
                  href={`https://wa.me/91${appointment.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                  style={secondaryButton}
                >
                  WhatsApp Patient
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f4faf9",
  padding: "30px 20px",
  fontFamily: "Arial, Helvetica, sans-serif",
  color: "#173737",
};

const loginCard = {
  maxWidth: 430,
  margin: "70px auto",
  background: "white",
  borderRadius: 16,
  padding: 28,
  boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 12,
  marginTop: 6,
  marginBottom: 15,
  border: "1px solid #cbdedd",
  borderRadius: 9,
  fontSize: 15,
};

const buttonStyle = {
  padding: "12px 18px",
  border: 0,
  borderRadius: 9,
  background: "#087f7f",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const linkButton = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 8,
  background: "#087f7f",
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryButton = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #087f7f",
  color: "#087f7f",
  textDecoration: "none",
  fontWeight: 700,
};

const statCard = {
  background: "white",
  padding: 20,
  borderRadius: 14,
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
};

const appointmentCard = {
  background: "white",
  padding: 22,
  borderRadius: 14,
  marginBottom: 15,
  border: "1px solid #dcebea",
};
