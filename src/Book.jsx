import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase, supabaseReady } from './supabaseClient';

const WHATSAPP_NUMBER = '254712077837';
const TZ = 'Africa/Nairobi';
const MAX_DAYS = 60;
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const OTHER_STYLE = 'Something else (I will describe it)';

const styles = [
  'Modern Swirls Art',
  'Signature French Tip',
  'Luxury Sculpted Stilettos',
  'Floral Almond Inlays',
  'Wine Red Gloss Sets',
  'Classic Crimson Accent',
  'Minimalist Line Art',
  'Waterfall Ombré Drop',
  'Leopard Print Stilettos',
  'Not sure yet',
  OTHER_STYLE,
];

function nairobiToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
}

function nairobiTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

function dayOfWeek(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function monthLabel(iso) {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function shiftMonth(iso, n) {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 10);
}

function monthCells(iso) {
  const [y, m] = iso.split('-').map(Number);
  const offset = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
  const total = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= total; d += 1) {
    cells.push(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return cells;
}

function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

function prettyTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export default function Book() {
  const [params] = useSearchParams();
  const presetStyle = params.get('style');

  const [allSlots, setAllSlots] = useState([]);
  const [closedDows, setClosedDows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [style, setStyle] = useState(styles.includes(presetStyle) ? presetStyle : styles[0]);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [customStyle, setCustomStyle] = useState('');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const today = nairobiToday();

  const minDate = useMemo(() => addDays(today, nairobiTime() >= '17:00' ? 1 : 0), [today]);
  const maxDate = useMemo(() => addDays(today, MAX_DAYS), [today]);
  const [view, setView] = useState(`${minDate.slice(0, 7)}-01`);

  const isDayDisabled = (iso) => iso < minDate || iso > maxDate || closedDows.includes(dayOfWeek(iso));

  useEffect(() => {
    if (!supabaseReady) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      const [slotsRes, closedRes] = await Promise.all([
        supabase.from('time_slots').select('slot').order('slot'),
        supabase.from('closed_days').select('dow'),
      ]);
      if (!active) return;
      if (slotsRes.error || closedRes.error) {
        setLoadError('We could not load available times. Please refresh, or contact Frank directly.');
      } else {
        setAllSlots(slotsRes.data.map((r) => r.slot.slice(0, 5)));
        setClosedDows(closedRes.data.map((r) => r.dow));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading || date) return;
    for (let i = 0; i <= MAX_DAYS; i += 1) {
      const iso = addDays(minDate, i);
      if (iso > maxDate) break;
      if (!closedDows.includes(dayOfWeek(iso))) {
        setDate(iso);
        setView(`${iso.slice(0, 7)}-01`);
        break;
      }
    }
  }, [loading, date, minDate, maxDate, closedDows]);

  const refreshBooked = async (iso) => {
    if (!supabaseReady || !iso) return;
    setSlotsLoading(true);
    const { data, error: err } = await supabase.rpc('get_booked_slots', { p_date: iso });
    setSlotsLoading(false);
    if (err) {
      setBooked([]);
      return;
    }
    setBooked(data.map((r) => r.slot.slice(0, 5)));
  };

  useEffect(() => {
    setSlot('');
    refreshBooked(date);
  }, [date]);

  const nowTime = nairobiTime();
  const isUnavailable = (s) => booked.includes(s) || (date === today && s <= nowTime);
  const anyOpen = allSlots.some((s) => !isUnavailable(s));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!slot) {
      setError('Please pick a time.');
      return;
    }
    const cleanLink = link.trim();
    if (style === OTHER_STYLE && customStyle.trim().length < 3) {
      setError('Please describe the style you want.');
      return;
    }
    if (cleanLink && !/^https?:\/\/\S+$/i.test(cleanLink)) {
      setError('Please paste the full link, starting with https://');
      return;
    }
    const finalStyle = style === OTHER_STYLE ? `Custom: ${customStyle.trim()}` : style;
    const finalNotes = [notes.trim(), cleanLink ? `Inspiration: ${cleanLink}` : ''].filter(Boolean).join('\n');
    setSubmitting(true);
    const { error: err } = await supabase.rpc('create_booking', {
      p_name: name,
      p_phone: phone,
      p_style: finalStyle,
      p_date: date,
      p_slot: `${slot}:00`,
      p_notes: finalNotes || null,
    });
    setSubmitting(false);
    if (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      refreshBooked(date);
      setSlot('');
      return;
    }
    setDone({ name, phone, style: finalStyle, date, slot, notes: finalNotes });
  };

  const reset = () => {
    setDone(null);
    setName('');
    setPhone('');
    setNotes('');
    setCustomStyle('');
    setLink('');
    setSlot('');
    refreshBooked(date);
  };

  const whatsappText = done
    ? `Hello Frank's Nails, I have just booked online.\n\nName: ${done.name}\nPhone: ${done.phone}\nStyle: ${done.style}\nDate: ${longDate(done.date)}\nTime: ${prettyTime(done.slot)}${done.notes ? `\nNotes: ${done.notes}` : ''}`
    : '';

  return (
    <div className="bk-page">
      <style>{`
        .bk-page {
          background: #ffffff;
          color: #000000;
        }
        .bk-wrap {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }
        .bk-title {
          margin-bottom: 32px;
          text-align: center;
        }
        .bk-title h1 {
          margin: 0;
          color: #000000;
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 700;
          letter-spacing: -1px;
        }
        .bk-title p {
          margin: 8px 0 0;
          color: #000000;
          font-size: 17px;
        }
        .bk-card {
          padding: 36px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 24px;
          box-shadow: none;
        }
        .bk-step {
          margin-bottom: 28px;
        }
        .bk-step h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
          color: #000000;
          font-size: 18px;
          font-weight: 700;
        }
        .bk-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fdf2f8;
          color: #db2777;
          font-size: 14px;
          font-weight: 700;
        }
        .bk-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }
        .bk-field label {
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
        .bk-field input,
        .bk-field select,
        .bk-field textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 15px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .bk-field textarea {
          min-height: 90px;
          resize: vertical;
        }
        .bk-field input::placeholder,
        .bk-field textarea::placeholder {
          color: #000000;
          opacity: 0.45;
        }
        .bk-field input:focus,
        .bk-field select:focus,
        .bk-field textarea:focus {
          outline: none;
          border-color: #db2777;
          box-shadow: 0 0 0 4px rgba(219, 39, 119, 0.12);
        }
        .bk-cal {
          padding: 18px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 18px;
        }
        .bk-cal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .bk-cal-title {
          color: #000000;
          font-size: 17px;
          font-weight: 600;
        }
        .bk-cal-nav {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .bk-cal-nav:hover:not(:disabled) {
          border-color: #db2777;
          color: #db2777;
        }
        .bk-cal-nav:disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }
        .bk-cal-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 6px;
        }
        .bk-cal-dow {
          padding-bottom: 6px;
          color: #000000;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
        }
        .bk-day {
          width: 100%;
          height: 44px;
          padding: 0;
          border: 1px solid transparent;
          border-radius: 12px;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .bk-day:hover:not(:disabled) {
          border-color: #db2777;
        }
        .bk-day.today {
          border-color: #000000;
        }
        .bk-day.selected {
          border-color: #db2777;
          background: #db2777;
          color: #ffffff;
        }
        .bk-day:disabled {
          cursor: not-allowed;
          opacity: 0.28;
        }
        .bk-picked {
          margin: 14px 0 0;
          color: #000000;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
        }
        .bk-times {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 10px;
        }
        .bk-time {
          padding: 12px 8px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .bk-time:hover:not(:disabled) {
          border-color: #db2777;
        }
        .bk-time.selected {
          border-color: #db2777;
          background: #db2777;
          color: #ffffff;
        }
        .bk-time:disabled {
          cursor: not-allowed;
          opacity: 0.35;
          text-decoration: line-through;
        }
        .bk-note {
          margin: 12px 0 0;
          color: #000000;
          font-size: 14px;
        }
        .bk-error {
          margin: 0 0 16px;
          padding: 12px 16px;
          border: 1px solid #db2777;
          border-radius: 12px;
          background: #fdf2f8;
          color: #000000;
          font-size: 14px;
        }
        .bk-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px 20px;
          border: 1.5px solid transparent;
          border-radius: 9999px;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .bk-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .bk-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .bk-btn-pink {
          background: #db2777;
          color: #ffffff;
        }
        .bk-btn-pink:hover:not(:disabled) {
          background: #be185d;
        }
        .bk-btn-green {
          background: #00875a;
          color: #ffffff;
        }
        .bk-btn-green:hover {
          background: #00664f;
        }
        .bk-btn-big {
          padding: 16px 20px;
          font-size: 17px;
          font-weight: 700;
        }
        .bk-reserved {
          margin: 0;
          color: #000000;
          font-size: 14px;
          text-align: center;
        }
        .bk-btn-outline {
          background: transparent;
          border-color: #000000;
          color: #000000;
        }
        .bk-btn-outline:hover {
          background: #fdf2f8;
          border-color: #db2777;
          color: #db2777;
        }
        .bk-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bk-done {
          text-align: center;
        }
        .bk-tick {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          margin-bottom: 16px;
          border-radius: 50%;
          background: #fdf2f8;
          color: #db2777;
          font-size: 28px;
          font-weight: 700;
        }
        .bk-done h2 {
          margin: 0 0 8px;
          color: #000000;
          font-size: 24px;
          font-weight: 700;
        }
        .bk-summary {
          margin: 20px 0 24px;
          padding: 18px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          text-align: left;
        }
        .bk-summary p {
          margin: 0 0 6px;
          color: #000000;
          font-size: 15px;
        }
        .bk-summary p:last-child {
          margin-bottom: 0;
        }
        .bk-actions {
          display: grid;
          gap: 12px;
        }
        @media (max-width: 520px) {
          .bk-wrap {
            padding: 28px 16px 56px;
          }
          .bk-card {
            padding: 26px 20px;
          }
          .bk-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="bk-wrap">
        <div className="bk-title">
          <h1>Book an appointment</h1>
          <p>Choose a style, pick a date and time, and you are booked in.</p>
        </div>

        <div className="bk-card">
          {!supabaseReady && (
            <div className="bk-error">
              Online booking is not set up yet. Please contact Frank on WhatsApp or by phone.
            </div>
          )}

          {loading && supabaseReady && <p className="bk-note">Loading available times…</p>}
          {loadError && <div className="bk-error">{loadError}</div>}

          {done ? (
            <div className="bk-done">
              <div className="bk-tick">✓</div>
              <h2>Almost done, {done.name.split(' ')[0]}</h2>
              <p>Your time is saved. One last step: send your details to Frank on WhatsApp so he sees your booking right away.</p>

              <div className="bk-summary">
                <p><strong>Style:</strong> {done.style}</p>
                <p><strong>Date:</strong> {longDate(done.date)}</p>
                <p><strong>Time:</strong> {prettyTime(done.slot)}</p>
                <p><strong>Phone:</strong> {done.phone}</p>
                {done.notes && <p style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}><strong>Notes:</strong> {done.notes}</p>}
              </div>

              <div className="bk-actions">
                <a
                  className="bk-btn bk-btn-green bk-btn-big"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send to Frank on WhatsApp
                </a>
                <p className="bk-reserved">Your slot at the shop in Kahawa Wendani is reserved.</p>
                <button type="button" className="bk-btn bk-btn-outline" onClick={reset}>
                  Book another time
                </button>
              </div>
            </div>
          ) : (
            supabaseReady &&
            !loading &&
            !loadError && (
              <form onSubmit={handleSubmit}>
                <div className="bk-step">
                  <h2>
                    <span className="bk-num">1</span> Choose a style
                  </h2>
                  <div className="bk-field">
                    <select value={style} onChange={(e) => setStyle(e.target.value)} aria-label="Nail style">
                      {styles.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  {style === OTHER_STYLE && (
                    <div className="bk-field">
                      <label htmlFor="bk-custom">Describe your style</label>
                      <input
                        id="bk-custom"
                        type="text"
                        maxLength={60}
                        placeholder="For example: short square, chrome pink with gems"
                        value={customStyle}
                        onChange={(e) => setCustomStyle(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="bk-field">
                    <label htmlFor="bk-link">Inspiration link (optional)</label>
                    <input
                      id="bk-link"
                      type="text"
                      inputMode="url"
                      maxLength={150}
                      placeholder="Paste a Pinterest or Instagram link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bk-step">
                  <h2>
                    <span className="bk-num">2</span> Pick a date
                  </h2>
                  <div className="bk-cal">
                    <div className="bk-cal-head">
                      <button
                        type="button"
                        className="bk-cal-nav"
                        aria-label="Previous month"
                        disabled={view <= `${minDate.slice(0, 7)}-01`}
                        onClick={() => setView(shiftMonth(view, -1))}
                      >
                        ‹
                      </button>
                      <span className="bk-cal-title">{monthLabel(view)}</span>
                      <button
                        type="button"
                        className="bk-cal-nav"
                        aria-label="Next month"
                        disabled={view >= `${maxDate.slice(0, 7)}-01`}
                        onClick={() => setView(shiftMonth(view, 1))}
                      >
                        ›
                      </button>
                    </div>
                    <div className="bk-cal-grid">
                      {WEEKDAYS.map((w) => (
                        <span key={w} className="bk-cal-dow">
                          {w}
                        </span>
                      ))}
                      {monthCells(view).map((iso, i) =>
                        iso ? (
                          <button
                            type="button"
                            key={iso}
                            disabled={isDayDisabled(iso)}
                            className={`bk-day ${date === iso ? 'selected' : ''} ${iso === today ? 'today' : ''}`}
                            onClick={() => setDate(iso)}
                            aria-pressed={date === iso}
                          >
                            {Number(iso.slice(8))}
                          </button>
                        ) : (
                          <span key={`pad-${i}`} />
                        )
                      )}
                    </div>
                  </div>
                  {date && <p className="bk-picked">{longDate(date)}</p>}
                </div>

                <div className="bk-step">
                  <h2>
                    <span className="bk-num">3</span> Pick a time
                  </h2>
                  <div className="bk-times">
                    {allSlots.map((s) => (
                      <button
                        type="button"
                        key={s}
                        disabled={slotsLoading || isUnavailable(s)}
                        className={`bk-time ${slot === s ? 'selected' : ''}`}
                        onClick={() => setSlot(s)}
                        aria-pressed={slot === s}
                      >
                        {prettyTime(s)}
                      </button>
                    ))}
                  </div>
                  {!slotsLoading && !anyOpen && (
                    <p className="bk-note">No times left on this day. Please pick another date.</p>
                  )}
                </div>

                <div className="bk-step">
                  <h2>
                    <span className="bk-num">4</span> Your details
                  </h2>
                  <div className="bk-row">
                    <div className="bk-field">
                      <label htmlFor="bk-name">Full name</label>
                      <input
                        id="bk-name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="bk-field">
                      <label htmlFor="bk-phone">Phone number</label>
                      <input
                        id="bk-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="bk-field">
                    <label htmlFor="bk-notes">Notes (optional)</label>
                    <textarea
                      id="bk-notes"
                      maxLength={300}
                      placeholder="Shape, length or anything else Frank should know"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                {error && <div className="bk-error">{error}</div>}

                <button type="submit" className="bk-btn bk-btn-pink" disabled={submitting}>
                  {submitting ? 'Booking…' : 'Confirm booking'}
                </button>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
