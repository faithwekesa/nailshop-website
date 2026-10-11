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
const LOCATION_NAME = 'Kahawa Wendani, Nairobi';

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
          FRANK'S <span>NAILS</span>
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
          <NavLink to="/contact" className={({ isActive }) => `sh-link pill ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="sh-footer">
      © {new Date().getFullYear()} Frank's Nails. All rights reserved.
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
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
        <button className="btn-contact" onClick={() => navigate('/contact')}>
          Contact Frank
        </button>
      </div>
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
          color: #ffffff;
          background:
            linear-gradient(rgba(11, 15, 26, 0.68), rgba(11, 15, 26, 0.68)),
            url('/french manicure/modernswirls.jpg') center / cover no-repeat;
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
            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 8px 16px 20px;
          }
          .sh-nav.open {
            display: flex;
          }
          .sh-light .sh-nav {
            background: #ffffff;
            border-bottom: 1px solid #fbcfe8;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          }
          .sh-hero .sh-nav {
            background: rgba(11, 15, 26, 0.96);
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}