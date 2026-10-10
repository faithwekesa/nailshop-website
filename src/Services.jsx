import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const lookbookData = [
  { 
    id: 'l1', 
    name: 'Modern Swirls Art', 
    price: 'Ksh 3,500', 
    image: '/french manicure/modernswirls.jpg',
    desc: 'Intricate custom line art patterns finished by hand to match your exact vibe.' 
  },
  { 
    id: 'l2', 
    name: 'Signature French Tip', 
    price: 'Ksh 2,500', 
    image: '/french manicure/frenchmanicure1.jpeg',
    desc: 'A pristine, premium take on the timeless classic French tip aesthetic.' 
  },
  { 
    id: 'l3', 
    name: 'Luxury Sculpted Stilettos', 
    price: 'Ksh 4,000', 
    image: '/french manicure/stiletto.png',
    desc: 'Extravagant high-fashion structural extensions crafted for ultimate drama.' 
  },
  { 
    id: 'l4', 
    name: 'Floral Almond Inlays', 
    price: 'Ksh 3,200', 
    image: '/french manicure/florallongalmond.jpg',
    desc: 'Delicate hand-painted botanical art embedded beautifully within structured gel.' 
  },
  { 
    id: 'l5', 
    name: 'Wine Red Gloss Sets', 
    price: 'Ksh 2,200', 
    image: '/french manicure/winerednails.jpg',
    desc: 'Deep, luxurious wine tones finished with an ultra-high shine protective armor.' 
  },
  { 
    id: 'l6', 
    name: 'Classic Crimson Accent', 
    price: 'Ksh 2,000', 
    image: '/french manicure/french.jpg',
    desc: 'Precision nail shaping, cuticle care, and nourishing spa hydration therapy.' 
  },
  { 
    id: 'l7', 
    name: 'Minimalist Line Art', 
    price: 'Ksh 2,600', 
    image: '/french manicure/another.jpg',
    desc: 'Sleek geometric clean lines for a beautiful contemporary style profile.'
  },
  { 
    id: 'l8', 
    name: 'Waterfall Ombré Drop', 
    price: 'Ksh 3,400', 
    image: '/french manicure/waterfall.jpg',
    desc: 'Smooth cascading gradient tones transitioning seamlessly into customized tips.' 
  },
  { 
    id: 'l9', 
    name: 'Red French Luxe', 
    price: 'Ksh 2,800', 
    image: '/french manicure/Red French Nails .jpeg',
    desc: 'Bold luxury crimson lining overlay crafted onto pristine shaped silhouettes.' 
  }
];

export default function Services() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🚀 LOCKS BACKGROUND SCROLL WHEN MODAL IS OPEN
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#0f172a',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100vw',
      overflowX: 'hidden'
    }}>
      <style>{`
        .menu-link {
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.25s ease;
        }
        .menu-link:hover {
          color: #db2777;
        }
        
        .lookbook-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 416px));
          justify-content: center;
          gap: 40px;
          width: 100%;
          padding: 0 48px;
          box-sizing: border-box;
          margin-bottom: 60px;
        }
        
        .gallery-card {
          background-color: #ffffff;
          border: 1px solid #fbcfe8;
          border-radius: 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          height: auto; 
          padding-bottom: 20px;
        }
        
        .gallery-card:hover {
          transform: translateY(-5px);
          border-color: #db2777;
          box-shadow: 0 16px 32px rgba(219, 39, 119, 0.08);
        }

        .card-image-area {
          width: 100%;
          height: 260px;
          position: relative;
          overflow: hidden;
          background-color: #fff5f7;
          border-bottom: 1px solid #fbcfe8;
          margin-bottom: 16px;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-card:hover .card-image {
          transform: scale(1.04);
        }

        .card-content-area {
          width: 100%;
          padding: 0 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-nav-book {
          background-color: #db2777;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-nav-book:hover {
          background-color: #be185d;
        }

        /* 🚀 CLEAN FIXED MODAL CANVAS TINT OVERLAY */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(11, 15, 26, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          cursor: zoom-out;
        }

        .modal-image-container {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-zoom-img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '24px', fontWeight: '900', letterSpacing: '2px' }}>
          FRANK'S <span style={{ color: '#db2777' }}>NAILS</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <nav style={{ display: 'flex', gap: '36px', fontSize: '16px' }}>
            <Link to="/" className="menu-link">Home</Link>
            <Link to="/services" className="menu-link" style={{ color: '#db2777' }}>Gallery</Link>
            <Link to="/" className="menu-link">Contact</Link>
          </nav>
          <button className="btn-nav-book">Book Appointment</button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ width: '100%', padding: '30px 0', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '44px', fontWeight: '900', margin: '0', letterSpacing: '-1.5px', color: '#0f172a' }}>Gallery</h2>
        </div>

        <div className="lookbook-grid">
          {lookbookData.map(item => (
            <div key={item.id} className="gallery-card" onClick={() => setSelectedImage(item.image)}>
              
              <div className="card-image-area">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="card-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.backgroundColor = '#fce7f3';
                  }} 
                />
              </div>

              <div className="card-content-area">
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#000000', margin: '0 0 6px 0' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#55657e', fontSize: '13.5px', margin: 0, lineHeight: '1.45', fontWeight: '400' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  alignItems: 'center', 
                  borderTop: '1px solid #f8fafc', 
                  paddingTop: '12px'
                }}>
                  <span style={{ fontSize: '21px', fontWeight: '800', color: '#db2777' }}>
                    {item.price}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* 🛠️ FIXED STRUCTURAL MODAL ZOOM VIEWER */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Zoomed View" 
              className="modal-zoom-img" 
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '28px', fontSize: '14px', color: '#64748b', borderTop: '1px solid #f1f5f9', backgroundColor: '#ffffff', fontWeight: '500' }}>
        © {new Date().getFullYear()} Frank's Nails. All rights reserved.
      </footer>
    </div>
  );
}
