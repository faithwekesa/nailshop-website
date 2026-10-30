import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Services from './Services';
import Contact from './Contact';
import Book from './Book';
import Admin from './Admin';
import { BRAND_NAME, LOCATION_NAME, MAP_EMBED_URL, MAP_OPEN_URL, PHONE_DISPLAY, PHONE_LINK } from './brand';

const [LOGO_FIRST, ...LOGO_REST] = BRAND_NAME.toUpperCase().split(' ');

const navClass = ({ isActive }) => `sh-link ${isActive ? 'active' : ''}`;

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sh-header">
      <div className="sh-header-inner">
        <Link to="/" className="sh-logo">
          {LOGO_FIRST} <span>{LOGO_REST.join(' ')}</span>
        </Link>

        <button
          type="button"
          className="sh-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`sh-nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={navClass}>
            Gallery
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          <NavLink to="/book" className={({ isActive }) => `sh-link pill ${isActive ? 'active' : ''}`}>
            Book now
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="sh-footer">
      © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
    </footer>
  );
}

const HERO_SLIDES = [
  '/french manicure/modernswirls.jpg',
  '/french manicure/frenchmanicure1.jpeg',
  '/french manicure/stiletto.png',
  '/french manicure/florallongalmond.jpg',
];

const HOME_GALLERY = [
  { name: 'Modern Swirls Art', image: '/french manicure/modernswirls.jpg', color: '#f472b6' },
  { name: 'Signature French Tip', image: '/french manicure/frenchmanicure1.jpeg', color: '#db2777' },
  { name: 'Luxury Sculpted Stilettos', image: '/french manicure/stiletto.png', color: '#be185d' },
  { name: 'Floral Almond Inlays', image: '/french manicure/florallongalmond.jpg', color: '#9d174d' },
];

const HOME_STEPS = [
  { title: 'Pick your style', text: 'Browse the gallery or describe your own idea.' },
  { title: 'Choose a day and time', text: 'Open slots show on the calendar. Tap the one you like.' },
  { title: 'Confirm on WhatsApp', text: 'Send your booking to the salon and wait for the reply.' },
];

const STEP_COLORS = ['#ec4899', '#db2777', '#9d174d'];


function Home() {
  const navigate = useNavigate();
  const [headerH, setHeaderH] = useState(84);

  useEffect(() => {
    const page = document.querySelector('.hm-page');
    const items = document.querySelectorAll('.hm-reveal');
    if (!page || !('IntersectionObserver' in window)) return undefined;
    page.classList.add('hm-ready');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('hm-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector('.sh-header');
      if (el) setHeaderH(el.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="hm-page">
      <style>{`
        .hm-page { width: 100%; display: flex; flex-direction: column; }
        .hm-first {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - var(--hm-h));
          min-height: calc(100svh - var(--hm-h));
        }
        .hm-section { background: #ffffff; color: #000000; padding: 72px 24px; }
        .hm-section + .hm-section { border-top: 1px solid #fbcfe8; }
        .hm-inner { max-width: 1100px; margin: 0 auto; }
        .hm-eyebrow {
          margin: 0 0 8px;
          color: #db2777;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .hm-title {
          margin: 0 0 12px;
          color: #000000;
          font-size: clamp(26px, 5vw, 38px);
          font-weight: 800;
          line-height: 1.15;
        }
        .hm-lead { margin: 0 0 36px; max-width: 560px; color: #000000; font-size: 16px; line-height: 1.6; }

        .hm-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .hm-shot {
          position: relative;
          display: block;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 18px;
          background: #fdf2f8;
          box-shadow: 0 0 0 rgba(219, 39, 119, 0);
          transition: box-shadow 0.3s ease;
        }
        .hm-shot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .hm-shot:hover img { transform: scale(1.05); }
        .hm-shot:hover { box-shadow: 0 16px 32px rgba(219, 39, 119, 0.22); }
        .hm-shot span {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          padding: 7px 12px;
          border-radius: 9999px;
          background: #ffffff;
          color: #000000;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
        }

        .hm-flow {
          position: relative;
          container-type: inline-size;
          width: 100%;
          aspect-ratio: 1100 / 400;
          margin-bottom: 28px;
        }
        .hm-wave {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .hm-wave-v { display: none; }
        .hm-wave .w-main {
          fill: none;
          stroke-width: 18;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 1.6s ease;
        }
        .hm-ready .hm-flow:not(.hm-in) .w-main { stroke-dashoffset: 1; }
        .hm-wave .w-dot {
          fill: #ffffff;
          stroke: #db2777;
          stroke-width: 4;
        }
        .hm-orb {
          position: absolute;
          left: var(--x);
          top: 50%;
          width: 22.7%;
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3.4%;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 10px 28px rgba(157, 23, 77, 0.18);
          text-align: center;
          transform: translate(-50%, -50%);
        }
        .hm-orb-num { color: var(--c); font-size: 3cqw; font-weight: 800; line-height: 1; }
        .hm-orb h3 { margin: 0.6cqw 0 0.5cqw; color: var(--c); font-size: 1.6cqw; font-weight: 800; line-height: 1.15; }
        .hm-orb p { margin: 0; color: #000000; font-size: 1.22cqw; line-height: 1.45; }
        .hm-orb:nth-of-type(1) { --x: 25%; }
        .hm-orb:nth-of-type(2) { --x: 52.27%; }
        .hm-orb:nth-of-type(3) { --x: 79.55%; }
        .hm-ready .hm-orb.hm-reveal { transform: translate(-50%, calc(-50% + 24px)); opacity: 0; }
        .hm-ready .hm-orb.hm-reveal.hm-in { transform: translate(-50%, -50%); opacity: 1; }

        .hm-btn {
          display: inline-block;
          padding: 13px 28px;
          border: 1px solid #db2777;
          border-radius: 9999px;
          background: #ffffff;
          color: #000000;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .hm-btn:hover { background: #fdf2f8; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(219, 39, 119, 0.25); }
        .hm-btn-fill { background: #db2777; color: #ffffff; }
        .hm-btn-fill:hover { background: #be185d; }

        .hm-visit { display: grid; grid-template-columns: 1fr 1.3fr; gap: 32px; align-items: stretch; }
        .hm-hours { margin: 0 0 24px; padding: 0; list-style: none; color: #000000; font-size: 16px; }
        .hm-hours li { display: flex; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid #fbcfe8; }
        .hm-hours li span:last-child { font-weight: 700; }
        .hm-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .hm-map { min-height: 320px; overflow: hidden; border: 1px solid #fbcfe8; border-radius: 20px; }
        .hm-map iframe { display: block; width: 100%; height: 100%; min-height: 320px; border: 0; }

        .hm-first > div > * { animation: hm-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .hm-first > div > *:nth-child(2) { animation-delay: 0.12s; }
        .hm-first > div > *:nth-child(3) { animation-delay: 0.24s; }
        .hm-first > div > *:nth-child(4) { animation-delay: 0.36s; }
        @keyframes hm-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        .hm-ready .hm-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: calc(var(--i, 0) * 120ms);
        }
        .hm-ready .hm-reveal.hm-in { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .hm-first > div > *, .hm-ready .hm-reveal, .hm-wave .w-main {
            animation: none; transition: none; opacity: 1; transform: none; stroke-dashoffset: 0;
          }
          .hm-ready .hm-orb.hm-reveal { transform: translate(-50%, -50%); }
        }

        @media (max-width: 980px) {
          .hm-gallery { grid-template-columns: repeat(2, 1fr); }
          .hm-flow { aspect-ratio: 360 / 850; max-width: 420px; margin-left: auto; margin-right: auto; }
          .hm-wave-h { display: none; }
          .hm-wave-v { display: block; }
          .hm-orb { left: 50%; width: 62.2%; padding: 6%; }
          .hm-orb-num { font-size: 8.5cqw; }
          .hm-orb h3 { font-size: 4.8cqw; margin: 1.6cqw 0 1.2cqw; }
          .hm-orb p { font-size: 3.7cqw; }
          .hm-orb:nth-of-type(1) { top: 18.2%; }
          .hm-orb:nth-of-type(2) { top: 50%; }
          .hm-orb:nth-of-type(3) { top: 81.8%; }
        }
        @media (max-width: 860px) {
          .hm-visit { grid-template-columns: 1fr; }
          .hm-section { padding: 52px 20px; }
        }
      `}</style>

      <section className="hm-first" style={{ '--hm-h': `${headerH}px` }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          maxWidth: '850px',
          margin: 'auto',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#f472b6',
            padding: '7px 20px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px'
          }}>
            {LOCATION_NAME}
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 82px)',
            fontWeight: '900',
            lineHeight: '1.1',
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
            color: '#ffffff',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))'
          }}>
            Bold nails.<br />
            <span className="luxury-gradient-text">Beautifully done.</span>
          </h1>

          <p style={{
            color: '#ffffff',
            fontSize: 'clamp(15px, 4vw, 21px)',
            lineHeight: '1.5',
            maxWidth: '680px',
            margin: '0 0 36px 0',
            fontWeight: '400',
            letterSpacing: '0.2px',
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))'
          }}>
            Stilettos, French tips, florals and custom nail art, finished by hand to match your style.
          </p>

          <div className="button-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/services')}>
              Explore Services
            </button>
            <button className="btn-contact" onClick={() => navigate('/book')}>
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      <section className="hm-section">
        <div className="hm-inner">
          <p className="hm-eyebrow hm-reveal">The gallery</p>
          <h2 className="hm-title hm-reveal" style={{ '--i': 1 }}>Fresh from the studio</h2>
          <p className="hm-lead hm-reveal" style={{ '--i': 2 }}>A few of our favourite sets. Tap one to see the full collection.</p>
          <div className="hm-gallery">
            {HOME_GALLERY.map((g, i) => (
              <Link key={g.name} to="/services" className="hm-shot hm-reveal" style={{ '--i': i }}>
                <img src={g.image} alt={g.name} loading="lazy" />
                <span>{g.name}</span>
              </Link>
            ))}
          </div>
          <Link to="/services" className="hm-btn hm-reveal">See all styles</Link>
        </div>
      </section>

      <section className="hm-section">
        <div className="hm-inner">
          <p className="hm-eyebrow hm-reveal">Simple and quick</p>
          <h2 className="hm-title hm-reveal" style={{ '--i': 1 }}>How booking works</h2>
          <p className="hm-lead hm-reveal" style={{ '--i': 2 }}>Choose a style, pick a date and time and you are booked in.</p>

          <div className="hm-flow hm-reveal">
            <svg className="hm-wave hm-wave-h" viewBox="0 0 1100 400" aria-hidden="true">
              <defs>
                <linearGradient id="hmg-h" gradientUnits="userSpaceOnUse" x1="90" y1="0" x2="1010" y2="0">
                  <stop offset="0" stopColor="#f9a8d4" />
                  <stop offset="0.5" stopColor="#db2777" />
                  <stop offset="1" stopColor="#9d174d" />
                </linearGradient>
              </defs>
              <path className="w-main" pathLength="1" stroke="url(#hmg-h)" d="M 139.1 263.4 A 150 150 0 1 1 425 200" />
              <path className="w-main" pathLength="1" stroke="url(#hmg-h)" d="M 425 200 A 150 150 0 0 0 725 200" />
              <path className="w-main" pathLength="1" stroke="url(#hmg-h)" d="M 725 200 A 150 150 0 1 1 1010.9 263.4" />
              <circle className="w-dot" cx="425" cy="200" r="10" />
              <circle className="w-dot" cx="725" cy="200" r="10" />
            </svg>
            <svg className="hm-wave hm-wave-v" viewBox="0 0 360 850" aria-hidden="true">
              <defs>
                <linearGradient id="hmg-v" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="830">
                  <stop offset="0" stopColor="#f9a8d4" />
                  <stop offset="0.5" stopColor="#db2777" />
                  <stop offset="1" stopColor="#9d174d" />
                </linearGradient>
              </defs>
              <path className="w-main" pathLength="1" stroke="url(#hmg-v)" d="M 122.9 32.6 A 135 135 0 1 1 180 290" />
              <path className="w-main" pathLength="1" stroke="url(#hmg-v)" d="M 180 290 A 135 135 0 0 0 180 560" />
              <path className="w-main" pathLength="1" stroke="url(#hmg-v)" d="M 180 560 A 135 135 0 1 1 122.9 817.4" />
              <circle className="w-dot" cx="180" cy="290" r="10" />
              <circle className="w-dot" cx="180" cy="560" r="10" />
            </svg>
            {HOME_STEPS.map((st, i) => (
              <div key={st.title} className="hm-orb hm-reveal" style={{ '--c': STEP_COLORS[i], '--i': i + 1 }}>
                <span className="hm-orb-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </div>
            ))}
          </div>

          <button className="hm-btn hm-btn-fill hm-reveal" onClick={() => navigate('/book')}>Book now</button>
        </div>
      </section>

      <section className="hm-section">
        <div className="hm-inner hm-visit">
          <div className="hm-reveal">
            <p className="hm-eyebrow">Find us</p>
            <h2 className="hm-title">Visit the studio</h2>
            <p className="hm-lead">{LOCATION_NAME}</p>
            <ul className="hm-hours">
              <li><span>Monday to Saturday</span><span>9:00 AM to 5:00 PM</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
            <div className="hm-actions">
              <a className="hm-btn hm-btn-fill" href={PHONE_LINK}>Call {PHONE_DISPLAY}</a>
              <a className="hm-btn" href={MAP_OPEN_URL} target="_blank" rel="noreferrer">Get directions</a>
            </div>
          </div>
          <div className="hm-map hm-reveal" style={{ '--i': 2 }}>
            <iframe title="Map" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`sh-shell ${isHome ? 'sh-hero' : 'sh-light'}`}>
      {isHome && (
        <div className="sh-slides" aria-hidden="true">
          {HERO_SLIDES.map((src, k) => (
            <div key={src} className="sh-slide" style={{ '--k': k, backgroundImage: `url('${src}')` }} />
          ))}
        </div>
      )}
      <style>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
        }
        body {
          font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        #root {
          width: 100%;
          max-width: none;
          margin: 0;
          border: 0;
        }

        .sh-shell {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow-x: hidden;
        }
        .sh-light {
          background: #ffffff;
          color: #000000;
        }
        .sh-hero {
          position: relative;
          color: #ffffff;
          background-color: #2a1a28;
        }
        .sh-hero {
          color: #ffffff;
          background-color: #2a1a28;
        }
        .sh-slides {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .sh-slides::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(11, 15, 26, 0.68);
        }
        .sh-slide {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0;
          animation: sh-slide 28s linear infinite;
          animation-delay: calc(var(--k) * 7s - 1.2s);
          will-change: opacity, transform;
        }
        @keyframes sh-slide {
          0% { opacity: 0; transform: scale(1); }
          4% { opacity: 1; }
          25% { opacity: 1; }
          32% { opacity: 0; transform: scale(1.06); }
          100% { opacity: 0; transform: scale(1.06); }
        }
        .sh-hero > :not(.sh-slides) {
          position: relative;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .sh-slide {
            animation: none;
          }
          .sh-slide[style*="--k: 0"] {
            opacity: 1;
          }
        }
        .sh-main {
          flex: 1;
        }
        .sh-hero .sh-main {
          display: flex;
        }

        .sh-header {
          z-index: 100;
        }
        .sh-light .sh-header {
          position: sticky;
          top: 0;
          background: #ffffff;
          border-bottom: 1px solid #fbcfe8;
        }
        .sh-hero .sh-header {
          position: relative;
        }
        .sh-header-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          height: 84px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .sh-logo {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2px;
          line-height: 1.2;
          text-decoration: none;
          white-space: nowrap;
        }
        .sh-light .sh-logo {
          color: #000000;
        }
        .sh-hero .sh-logo {
          color: #ffffff;
        }
        .sh-logo span {
          color: #db2777;
        }
        .sh-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .sh-link {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.25s ease, background-color 0.25s ease;
        }
        .sh-light .sh-link {
          color: #000000;
        }
        .sh-hero .sh-link {
          color: #ffffff;
        }
        .sh-light .sh-link:hover,
        .sh-light .sh-link.active {
          color: #db2777;
        }
        .sh-hero .sh-link:hover,
        .sh-hero .sh-link.active {
          color: #f472b6;
        }
        .sh-link.pill {
          padding: 10px 24px;
          border-radius: 9999px;
          background: #db2777;
          color: #ffffff !important;
          font-size: 14px;
        }
        .sh-link.pill:hover {
          background: #be185d;
        }
        .sh-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          border: none;
          background: none;
          cursor: pointer;
        }
        .sh-light .sh-toggle {
          color: #000000;
        }
        .sh-hero .sh-toggle {
          color: #ffffff;
        }
        .sh-toggle span {
          display: block;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: currentColor;
        }
        .sh-link:focus-visible,
        .sh-logo:focus-visible,
        .sh-toggle:focus-visible,
        .btn-primary:focus-visible,
        .btn-contact:focus-visible {
          outline: 3px solid #db2777;
          outline-offset: 3px;
        }
        .sh-hero .sh-link:focus-visible,
        .sh-hero .sh-logo:focus-visible,
        .sh-hero .sh-toggle:focus-visible,
        .btn-primary:focus-visible,
        .btn-contact:focus-visible {
          outline-color: #f472b6;
        }

        .sh-footer {
          padding: 24px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }
        .sh-light .sh-footer {
          padding: 28px 24px;
          background: #ffffff;
          border-top: 1px solid #fbcfe8;
          color: #000000;
        }
        .sh-hero .sh-footer {
          color: #ffffff;
        }

        .btn-primary {
          background-color: #db2777;
          color: white;
          border: none;
          padding: 14px 34px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(219, 39, 119, 0.4);
        }
        .btn-primary:hover {
          background-color: #be185d;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(190, 24, 93, 0.6);
        }
        .btn-contact {
          background-color: #ffffff;
          color: #db2777;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .button-group:has(.btn-contact:hover) .btn-primary {
          background-color: #ffffff;
          color: #db2777;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .button-group:has(.btn-contact:hover) .btn-contact {
          background-color: #db2777;
          color: #ffffff;
          border-color: #db2777;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(219, 39, 119, 0.5);
        }
        .luxury-gradient-text {
          background: linear-gradient(135deg, #ff94c2 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .sh-header-inner {
            height: 72px;
            padding: 0 16px;
          }
          .sh-logo {
            font-size: 20px;
            letter-spacing: 1px;
          }
          .sh-toggle {
            display: flex;
          }
          .sh-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 8px 16px 20px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-12px);
            transition: opacity 0.28s ease, transform 0.28s ease, visibility 0.28s;
          }
          .sh-nav.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .sh-light .sh-nav {
            background: #ffffff;
            border-bottom: 1px solid #fbcfe8;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          }
          .sh-hero .sh-nav {
            background: rgba(255, 255, 255, 0.14);
            -webkit-backdrop-filter: blur(16px);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          }
          .sh-link {
            padding: 14px 4px;
          }
          .sh-link.pill {
            justify-content: center;
            margin-top: 12px;
            padding: 12px 24px;
          }
        }
      `}</style>

      <Header />
      <main className="sh-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
