// api/send-email.js
import nodemailer from "nodemailer";

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "6", 10);
const RATE_LIMIT_WINDOW_MIN = parseInt(process.env.RATE_LIMIT_WINDOW_MIN || "60", 10);
const DEBUG = (process.env.VERCEL_ENV || process.env.NODE_ENV || "development") !== "production";

// best-effort in-memory store (serverless ephemeral)
const rateStore = global.__contactRateStore || new Map();
global.__contactRateStore = rateStore;

function nowMs() { return Date.now(); }
function cleanTimestamps(timestamps, windowMs) {
  const cutoff = nowMs() - windowMs;
  while (timestamps.length && timestamps[0] < cutoff) timestamps.shift();
  // keep list bounded to avoid memory growth
  if (timestamps.length > RATE_LIMIT_MAX * 5) timestamps.splice(0, timestamps.length - RATE_LIMIT_MAX * 5);
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, " ")
    .replace(/'/g, "'");
}
function nl2br(s = "") { return String(s).replace(/\n/g, "<br/>"); }

function validateInput({ name, email, service, message }) {
  const errors = [];
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  }
  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.push("A valid email address is required.");
  }
  if (!service || typeof service !== "string" || service.trim().length < 1) {
    errors.push("Please select a service.");
  }
  if (message && message.length > 5000) {
    errors.push("Message is too long (max 5000 characters).");
  }
  return errors;
}

export default async function handler(req, res) {
  // CORS headers (always set)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    // Best-effort IP extraction
    const forwarded = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const ip = Array.isArray(forwarded) ? forwarded[0] : (String(forwarded).split(",")[0].trim() || "unknown");

    // Body parsing: Vercel usually provides parsed body. Fallback to raw parse.
    const body = req.body ?? await new Promise((resolve) => {
      let data = "";
      req.on && req.on("data", chunk => (data += chunk));
      req.on && req.on("end", () => {
        try { resolve(JSON.parse(data || "{}")); } catch { resolve({}); }
      });
      // safety: if no events, resolve immediately
      setTimeout(() => resolve({}), 50);
    });

    const payload = {
      name: (body.name || "").toString().trim().slice(0, 200),
      email: (body.email || "").toString().trim().slice(0, 254),
      service: (body.service || "").toString().trim().slice(0, 200),
      message: (body.message || "").toString().trim().slice(0, 5000),
    };

    // Validate
    const errors = validateInput(payload);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    // Rate limiting (best-effort)
    const windowMs = RATE_LIMIT_WINDOW_MIN * 60 * 1000;
    const now = nowMs();
    const timestamps = rateStore.get(ip) || [];
    cleanTimestamps(timestamps, windowMs);

    if (timestamps.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: "RATE_LIMIT_EXCEEDED",
        message: `Too many requests. Try again later.`
      });
    }
    timestamps.push(now);
    rateStore.set(ip, timestamps);

    // SMTP config
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = (process.env.SMTP_SECURE || "true") === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP not configured - missing env vars");
      return res.status(500).json({ 
        success: false, 
        message: "Mailer not configured on server.",
        error: "MISSING_SMTP_CONFIG",
        detail: DEBUG ? "Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables" : undefined
      });
    }

    // Create transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
        // small timeout so serverless doesn't hang too long
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 10_000
      });

      // verify connection before sending (helps surface auth/connect errors)
      await transporter.verify();
    } catch (err) {
      console.error("transporter verify failed:", err && err.message ? err.message : err);
      return res.status(502).json({
        success: false,
        message: "Failed to connect to mail server.",
        ...(DEBUG ? { detail: err && err.message ? err.message : String(err) } : {})
      });
    }

    // Build content
    const subject = `Portfolio contact — ${payload.service} — ${payload.name}`;
    const text = [
      `You have a new message from your portfolio contact form.`,
      ``,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Service: ${payload.service}`,
      `IP: ${ip}`,
      ``,
      `Message:`,
      payload.message || "(no message provided)",
      ``,
      `-- End of message --`
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.4;color:#111">
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>
        <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
        <hr />
        <p><strong>Message</strong></p>
        <p>${payload.message ? nl2br(escapeHtml(payload.message)) : "<em>(no message provided)</em>"}</p>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: toEmail,
      replyTo: payload.email,
      subject,
      text,
      html
    };

    try {
      await transporter.sendMail(mailOptions);
      // close transporter if supported to free resources
      try { transporter.close && transporter.close(); } catch {}
      return res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
      console.error("sendMail error:", err && err.message ? err.message : err);
      return res.status(502).json({
        success: false,
        message: "Failed to send email.",
        ...(DEBUG ? { detail: err && err.message ? err.message : String(err) } : {})
      });
    }
  } catch (err) {
    console.error("send-email error:", err && err.stack ? err.stack : err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(DEBUG ? { detail: err && err.message ? err.message : String(err) } : {})
    });
  }
}