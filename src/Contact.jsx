import React, { useState } from 'react';

const WHATSAPP_NUMBER = '254712077837';
const PHONE_DISPLAY = '0712 077 837';
const PHONE_LINK = 'tel:+254712077837';
const LOCATION_NAME = 'Kahawa Wendani, Nairobi';
const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Kahawa%20Wendani%2C%20Nairobi%2C%20Kenya&z=15&output=embed';
const MAP_OPEN_URL = 'https://www.google.com/maps/search/?api=1&query=Kahawa+Wendani+Nairobi+Kenya';

const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const styles = [
  'Not sure yet',
  'Modern Swirls Art',
  'Signature French Tip',
  'Luxury Sculpted Stilettos',
  'Floral Almond Inlays',
  'Wine Red Gloss Sets',
  'Classic Crimson Accent',
  'Minimalist Line Art',
  'Waterfall Ombré Drop',
  'Leopard Print Stilettos',
];

function Icon({ children }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    style: styles[0],
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text =
      `Hello Frank's Nails, my name is ${form.firstName.trim()} ${form.lastName.trim()}.\n\n` +
      `Phone: ${form.phone.trim()}\n` +
      `Style: ${form.style}\n` +
      `Message: ${form.message.trim() || 'None'}`;

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="ct-page">
      <style>{`
        .ct-page {
          background: #ffffff;
          color: #000000;
        }
        .ct-wrap {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }
        .ct-title {
          margin-bottom: 36px;
          text-align: center;
        }
        .ct-title h1 {
          margin: 0;
          color: #000000;
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 700;
          letter-spacing: -1px;
        }
        .ct-title p {
          margin: 8px 0 0;
          color: #000000;
          font-size: 17px;
        }
        .ct-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        .ct-card {
          padding: 36px;
          background: #ffffff;
          border: 1px solid #fbcfe8;
          border-radius: 24px;
          box-shadow: 0 20px 40px -12px rgba(219, 39, 119, 0.12);
        }
        .ct-form {
          display: flex;
          flex-direction: column;
        }
        .ct-grow {
          flex: 1;
        }
        .ct-grow textarea {
          flex: 1;
        }
        .ct-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .ct-visit {
          display: flex;
          flex: 1;
          flex-direction: column;
        }
        .ct-head {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .ct-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fdf2f8;
          color: #db2777;
        }
        .ct-card h2 {
          margin: 0;
          color: #000000;
          font-size: 22px;
          font-weight: 700;
        }
        .ct-intro {
          margin: -8px 0 24px;
          color: #000000;
          font-size: 15px;
          font-weight: 400;
          text-align: center;
        }
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .ct-field label {
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
        .ct-field input,
        .ct-field select,
        .ct-field textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 15px;
          font-weight: 400;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ct-field select {
          cursor: pointer;
        }
        .ct-field textarea {
          min-height: 110px;
          resize: vertical;
        }
        .ct-field input::placeholder,
        .ct-field textarea::placeholder {
          color: #000000;
          opacity: 0.45;
        }
        .ct-field input:focus,
        .ct-field select:focus,
        .ct-field textarea:focus {
          outline: none;
          border-color: #db2777;
          box-shadow: 0 0 0 4px rgba(219, 39, 119, 0.12);
        }
        .ct-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 24px;
          border: 2px solid transparent;
          border-radius: 9999px;
          font: inherit;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .ct-btn:hover {
          transform: translateY(-2px);
        }
        .ct-btn-pink {
          background: #db2777;
          color: #ffffff;
        }
        .ct-btn-pink:hover {
          background: #be185d;
        }
        .ct-btn-outline {
          background: transparent;
          border-color: #000000;
          color: #000000;
        }
        .ct-btn-outline:hover {
          background: #fdf2f8;
          border-color: #db2777;
          color: #db2777;
        }
        .ct-big {
          display: block;
          text-align: center;
          margin-bottom: 20px;
          color: #000000;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-decoration: none;
        }
        .ct-big:hover {
          color: #db2777;
        }
        .ct-place {
          margin: 0 0 16px;
          text-align: center;
          color: #000000;
          font-size: 17px;
          font-weight: 500;
        }
        .ct-map {
          flex: 1;
          min-height: 240px;
          margin-bottom: 20px;
          overflow: hidden;
          border: 1px solid #fbcfe8;
          border-radius: 16px;
        }
        .ct-map iframe {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 240px;
          border: 0;
        }
        @media (max-width: 900px) {
          .ct-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .ct-wrap {
            padding: 28px 16px 56px;
          }
          .ct-card {
            padding: 28px 22px;
          }
          .ct-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="ct-wrap">
        <div className="ct-title">
          <h1>Contact Frank</h1>
          <p>Send your details on WhatsApp, call, or visit the shop.</p>
        </div>

        <div className="ct-layout">
          <form className="ct-card ct-form" onSubmit={handleSubmit}>
            <div className="ct-head">
              <h2>Send a message</h2>
            </div>
            <p className="ct-intro">Fill in your details and continue on WhatsApp.</p>

            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="ct-field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="ct-field">
              <label htmlFor="style">Nail style</label>
              <select id="style" name="style" value={form.style} onChange={handleChange}>
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="ct-field ct-grow">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Enter your message"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="ct-btn ct-btn-pink">
              Continue on WhatsApp
            </button>
          </form>

          <div className="ct-side">
            <div className="ct-card">
              <div className="ct-head">
                <div className="ct-icon">
                  <Icon>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </Icon>
                </div>
                <h2>Call Frank</h2>
              </div>
              <a className="ct-big" href={PHONE_LINK}>
                {PHONE_DISPLAY}
              </a>
              <a className="ct-btn ct-btn-outline" href={PHONE_LINK}>
                Call now
              </a>
            </div>

            <div className="ct-card ct-visit">
              <div className="ct-head">
                <div className="ct-icon">
                  <Icon>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </Icon>
                </div>
                <h2>Visit the shop</h2>
              </div>
              <p className="ct-place">{LOCATION_NAME}</p>
              <div className="ct-map">
                <iframe
                  title="Frank's Nails location in Kahawa Wendani, Nairobi"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a className="ct-btn ct-btn-outline" href={MAP_OPEN_URL} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}