import React, { useState, useEffect } from 'react';
const WHATSAPP_NUMBER = '254712077837';

const lookbookData = [
  { id: 'l1', name: 'Modern Swirls Art', price: 'Ksh 3,500', image: '/french manicure/modernswirls.jpg', desc: 'Intricate custom line art patterns finished by hand to match your exact vibe.' },
  { id: 'l2', name: 'Signature French Tip', price: 'Ksh 2,000', image: '/french manicure/frenchmanicure1.jpeg', desc: 'A pristine, premium take on the timeless classic French tip aesthetic.' },
  { id: 'l3', name: 'Luxury Sculpted Stilettos', price: 'Ksh 2,500', image: '/french manicure/stiletto.png', desc: 'Extravagant high-fashion structural extensions crafted for ultimate drama.' },
  { id: 'l4', name: 'Floral Almond Inlays', price: 'Ksh 2,500', image: '/french manicure/florallongalmond.jpg', desc: 'Delicate hand-painted botanical art embedded beautifully within structured gel.' },
  { id: 'l5', name: 'Wine Red Gloss Sets', price: 'Ksh 2,500', image: '/french manicure/winerednails.jpg', desc: 'Deep, luxurious wine tones finished with an ultra-high shine protective armor.' },
  { id: 'l6', name: 'Classic Crimson Accent', price: 'Ksh 2,000', image: '/french manicure/french.jpg', desc: 'Precision nail shaping, cuticle care, and nourishing spa hydration therapy.' },
  { id: 'l7', name: 'Minimalist Line Art', price: 'Ksh 2,500', image: '/french manicure/another.jpg', desc: 'Sleek geometric clean lines for a beautiful contemporary style profile.' },
  { id: 'l8', name: 'Waterfall Ombré Drop', price: 'Ksh 3,000', image: '/french manicure/waterfall.jpg', desc: 'Smooth cascading gradient tones transitioning seamlessly into customized tips.' },
  { id: 'l9', name: 'Leopard Print Stilettos', price: 'Ksh 3,500', image: '/french manicure/negativespace1.jpg', desc: 'Fierce custom leopard print patterns paired with rich chocolate gloss accents on structural extensions.' },
];

export default function Services() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const bookLink = (name) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hello Frank's Nails, I'd like to book the "${name}" set.`
    )}`;

  return (
    <div className="gl-page">
      <style>{`
        .gl-page {
          color: #000000;
          background: #ffffff;
        }
        .gl-main {
          width: 100%;
          padding: 28px 0 60px;
        }
        .gl-title {
          margin: 0 0 32px;
          text-align: center;
          color: #000000;
          font-size: clamp(34px, 6vw, 44px);
          font-weight: 900;
          letter-spacing: -1.5px;
        }
        .gl-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 416px));
          justify-content: center;
          gap: 40px;
          width: 100%;
          padding: 0 48px;
          box-sizing: border-box;
        }
        .gl-card {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          overflow: hidden;
          height: auto;
          padding-bottom: 20px;
          background: #ffffff;
          border: 1px solid #fbcfe8;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gl-card:hover {
          transform: translateY(-5px);
          border-color: #db2777;
          box-shadow: 0 16px 32px rgba(219, 39, 119, 0.08);
        }
        .gl-image {
          width: 100%;
          height: 260px;
          margin-bottom: 16px;
          overflow: hidden;
          background: #fff5f7;
          border-bottom: 1px solid #fbcfe8;
        }
        .gl-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gl-card:hover .gl-image img {
          transform: scale(1.04);
        }
        .gl-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 24px;
        }
        .gl-body h3 {
          margin: 0 0 6px;
          color: #000000;
          font-size: 19px;
          font-weight: 800;
        }
        .gl-body p {
          margin: 0;
          color: #000000;
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.45;
        }
        .gl-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid #fdf2f8;
        }
        .gl-price {
          color: #db2777;
          font-size: 21px;
          font-weight: 800;
        }
        .gl-book {
          color: #000000;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }
        .gl-book:hover {
          color: #db2777;
          text-decoration: underline;
        }
        .gl-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(11, 15, 26, 0.88);
          backdrop-filter: blur(8px);
          cursor: zoom-out;
        }
        .gl-overlay img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          cursor: default;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .gl-close {
          position: absolute;
          top: 16px;
          right: 20px;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
        }
        @media (max-width: 1000px) {
          .gl-grid {
            grid-template-columns: repeat(2, minmax(0, 416px));
            gap: 28px;
            padding: 0 24px;
          }
        }
        @media (max-width: 680px) {
          .gl-grid {
            grid-template-columns: repeat(1, minmax(0, 416px));
            padding: 0 16px;
          }
        }
      `}</style>

      <div className="gl-main">
        <h1 className="gl-title">Gallery</h1>

        <div className="gl-grid">
          {lookbookData.map((item) => (
            <article key={item.id} className="gl-card" onClick={() => setSelected(item)}>
              <div className="gl-image">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="gl-body">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="gl-foot">
                  <a
                    className="gl-book"
                    href={bookLink(item.name)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Book on WhatsApp
                  </a>
                  <span className="gl-price">{item.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="gl-overlay" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
          <button type="button" className="gl-close" aria-label="Close" onClick={() => setSelected(null)}>
            ×
          </button>
          <img src={selected.image} alt={selected.name} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}