import React, { useState } from "react";
import '../styles/contact.css'

export default function Contact({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errors, setErrors] = useState([]);

  const SERVICES = ["Web Development","UI/UX Design","Mobile App","API / Backend","Consultation","Other"];

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    
    if (!email || !name || !service) {
      setErrors(["Please fill in all required fields"]);
      setStatus("error");
      return;
    }
    
    setStatus("sending");

    // Prepare form data
    const formData = {
      name: name.trim(),
      email: email.trim(),
      service,
      message: message.trim()
    };
    
    console.log('Submitting form data:', formData);

    // Send email using backend API
    // Uses relative path for Vercel deployment (same origin)
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(async (response) => {
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
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
        // Handle different error types
        if (data.error === 'RATE_LIMIT_EXCEEDED') {
          setErrors([data.message || "Too many requests. Please try again later."]);
        } else if (data.error === 'MISSING_SMTP_CONFIG') {
          setErrors([
            "Email service not configured. Please contact the site administrator.",
            "Error code: SMTP_CONFIG_MISSING"
          ]);
        } else if (data.errors && Array.isArray(data.errors)) {
          setErrors(data.errors);
        } else {
          setErrors([data.message || "Failed to send message. Please try again."]);
        }
        setStatus("error");
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setErrors(["Network error. Please check your connection and try again."]);
      setStatus("error");
    });
  }

  return (
    <section className="split-wrap">

      {/* Left column: Uiverse card (JSX) */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="cont-card" aria-hidden>
          <div className="boxshadow" />
          <div className="main">
            <div className="top" />
            <div className="left side" />
            <div className="right side" />
            <div className="title">Catch Me!</div>
            <div className="button-container">
              <button className="button"><a href="https://www.instagram.com/m_roni2/">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="green" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg></a>
              </button>

              <button className="button"><a href="https://www.linkedin.com/in/swarnav-das-6929542bb">
                <svg className="svg linkedin" xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="blue" viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg></a>
              </button>

              <button className="button"><a href="https://github.com/swarnavdas15">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg></a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: contact form */}
      <div className="creative" aria-label="Contact form panel">
        <div className="title-head">Don't wait - Make your idea true !</div>
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
              {status === 'error' && errors.length > 0 && (
                <div className="error-messages">
                  {errors.map((error, index) => (
                    <span key={index} className="err">{error}</span>
                  ))}
                </div>
              )}
              {status === 'error' && errors.length === 0 && (
                <span className="err">Please fill required fields</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

