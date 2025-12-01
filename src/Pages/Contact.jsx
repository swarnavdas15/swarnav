import React, { useState } from "react";
import '../styles/contact.css'

export default function Contact({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const SERVICES = ["Web Development","UI/UX Design","Mobile App","API / Backend","Consultation","Other"];

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !name || !service) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    // Prepare form data
    const formData = {
      name,
      email,
      service,
      message
    };
    
    console.log('Submitting form data:', formData);

    // Send email using backend API
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.success) {
        setStatus("sent");
        onSubmit?.({ name, email, service, message });
        // Reset form
        setName("");
        setEmail("");
        setService("");
        setMessage("");
        setTimeout(() => setStatus(null), 1400);
      } else {
        setStatus("error");
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setStatus("error");
    });
  }

  return (
    <section className="split-wrap">

      {/* Left column: Uiverse card (JSX) */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" aria-hidden>
          <div className="boxshadow" />
          <div className="main">
            <div className="top" />
            <div className="left side" />
            <div className="right side" />
            <div className="title">TITLE</div>
            <div className="button-container">
              <button className="button">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="green" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </button>

              <button className="button">
                <svg className="svg twitter" xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="green" viewBox="0 0 512 512">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>
              </button>

              <button className="button">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: contact form */}
      <div className="creative" aria-label="Contact form panel">
        <div className="title">Make it happen — which service?</div>
        <div className="sub">Quick, creative, and low on system load. Pick one and let's start.</div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input className="cf" placeholder=" " value={name} onChange={(e) => setName(e.target.value)} required />
            <span className="label-text">Name</span>
            <span className="underline" />
          </div>

          <div className="field">
            <input className="cf" placeholder=" " type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span className="label-text">Email</span>
            <span className="underline" />
          </div>

          <div className="field">
            <select className="cf" value={service} onChange={(e) => setService(e.target.value)} required>
              <option value="" disabled hidden></option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="label-text">What service you want</span>
            <span className="underline" />
          </div>

          <div className="field">
            <textarea className="cf" placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
            <span className="label-text">Message (optional)</span>
            <span className="underline" />
          </div>

          <div className="actions">
            <div style={{ position: 'relative' }}>
              <button type="submit" className={`btn ${status === 'sent' ? 'sent' : ''}`} disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send'}</button>
              <div className="spark" aria-hidden />
            </div>

            <div className="status">
              {status === 'sent' && <span className="ok">Sent ✓</span>}
              {status === 'error' && <span className="err">Please fill required fields</span>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

