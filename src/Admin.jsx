import React, { useCallback, useEffect, useState } from 'react';
import { supabase, supabaseReady } from './supabaseClient';

const TZ = 'Africa/Nairobi';

function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
}

function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

function prettyTime(value) {
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function withLinks(text) {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    if (!supabaseReady) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    let query = supabase
      .from('bookings')
      .select('id, name, phone, style, booking_date, slot, notes, status')
      .order('booking_date', { ascending: true })
      .order('slot', { ascending: true });
    if (!showPast) query = query.gte('booking_date', today());
    const { data, error: err } = await query;
    setLoading(false);
    if (err) {
      setError('Could not load bookings.');
      return;
    }
    setBookings(data);
  }, [showPast]);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  const signIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setSigningIn(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (err) setAuthError('Wrong email or password.');
  };

  const setStatus = async (id, status) => {
    const { error: err } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (err) {
      setError('Could not update that booking.');
      return;
    }
    load();
  };

  const grouped = bookings.reduce((acc, b) => {
    (acc[b.booking_date] = acc[b.booking_date] || []).push(b);
    return acc;
  }, {});

  return (
    <div className="ad-page">
      <style>{`
        .ad-page {
          background: #ffffff;
          color: #000000;
        }
        .ad-wrap {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }
        .ad-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }
        .ad-head h1 {
          margin: 0;
          color: #000000;
          font-size: clamp(28px, 5vw, 38px);
          font-weight: 700;
          letter-spacing: -1px;
        }
        .ad-card {
          padding: 32px;
          background: #ffffff;
          border: 1px solid #fbcfe8;
          border-radius: 24px;
          box-shadow: 0 20px 40px -12px rgba(219, 39, 119, 0.12);
        }
        .ad-login {
          max-width: 420px;
          margin: 0 auto;
        }
        .ad-login h1 {
          margin: 0 0 20px;
          color: #000000;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
        }
        .ad-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }
        .ad-field label {
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
        .ad-field input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          background: #ffffff;
          color: #000000;
          font: inherit;
          font-size: 15px;
        }
        .ad-field input:focus {
          outline: none;
          border-color: #db2777;
          box-shadow: 0 0 0 4px rgba(219, 39, 119, 0.12);
        }
        .ad-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border: 1.5px solid #000000;
          border-radius: 9999px;
          background: transparent;
          color: #000000;
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .ad-btn:hover {
          background: #fdf2f8;
          border-color: #db2777;
          color: #db2777;
        }
        .ad-btn-pink {
          width: 100%;
          border-color: #db2777;
          background: #db2777;
          color: #ffffff;
        }
        .ad-btn-pink:hover {
          background: #be185d;
          border-color: #be185d;
          color: #ffffff;
        }
        .ad-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .ad-error {
          margin: 0 0 16px;
          padding: 12px 16px;
          border: 1px solid #db2777;
          border-radius: 12px;
          background: #fdf2f8;
          color: #000000;
          font-size: 14px;
        }
        .ad-tools {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }
        .ad-check {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #000000;
          font-size: 14px;
          cursor: pointer;
        }
        .ad-day {
          margin: 28px 0 10px;
          color: #db2777;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .ad-item {
          display: grid;
          grid-template-columns: 90px 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 16px;
          margin-bottom: 10px;
          border: 1px solid #fbcfe8;
          border-radius: 16px;
        }
        .ad-item.cancelled {
          opacity: 0.5;
        }
        .ad-time {
          color: #000000;
          font-size: 16px;
          font-weight: 700;
        }
        .ad-info strong {
          display: block;
          color: #000000;
          font-size: 16px;
          font-weight: 600;
        }
        .ad-info span,
        .ad-info a {
          display: block;
          color: #000000;
          font-size: 14px;
        }
        .ad-info a:hover {
          color: #db2777;
        }
        .ad-tag {
          display: inline-block;
          margin-top: 4px;
          color: #db2777;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .ad-empty {
          padding: 24px 0;
          color: #000000;
          text-align: center;
        }
        @media (max-width: 600px) {
          .ad-card {
            padding: 24px 18px;
          }
          .ad-item {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      <div className="ad-wrap">
        {!supabaseReady && (
          <div className="ad-card">
            <div className="ad-error">Supabase is not connected yet. Add the two keys in your environment settings.</div>
          </div>
        )}

        {supabaseReady && checking && <p>Loading…</p>}

        {supabaseReady && !checking && !session && (
          <div className="ad-card ad-login">
            <h1>Frank's bookings</h1>
            <form onSubmit={signIn}>
              <div className="ad-field">
                <label htmlFor="ad-email">Email</label>
                <input
                  id="ad-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="ad-field">
                <label htmlFor="ad-password">Password</label>
                <input
                  id="ad-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {authError && <div className="ad-error">{authError}</div>}
              <button type="submit" className="ad-btn ad-btn-pink" disabled={signingIn}>
                {signingIn ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        )}

        {supabaseReady && !checking && session && (
          <>
            <div className="ad-head">
              <h1>Bookings</h1>
              <div className="ad-tools">
                <label className="ad-check">
                  <input type="checkbox" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} />
                  Include past
                </label>
                <button type="button" className="ad-btn" onClick={load}>
                  Refresh
                </button>
                <button type="button" className="ad-btn" onClick={() => supabase.auth.signOut()}>
                  Sign out
                </button>
              </div>
            </div>

            {error && <div className="ad-error">{error}</div>}
            {loading && <p>Loading…</p>}

            {!loading && bookings.length === 0 && (
              <div className="ad-card ad-empty">
                No bookings to show. If you expect some, make sure this email is in the admins table.
              </div>
            )}

            {Object.keys(grouped).map((day) => (
              <div key={day}>
                <div className="ad-day">{longDate(day)}</div>
                {grouped[day].map((b) => (
                  <div key={b.id} className={`ad-item ${b.status === 'cancelled' ? 'cancelled' : ''}`}>
                    <div className="ad-time">{prettyTime(b.slot)}</div>
                    <div className="ad-info">
                      <strong>{b.name}</strong>
                      <span>{b.style}</span>
                      <a href={`tel:${b.phone.replace(/\s/g, '')}`}>{b.phone}</a>
                      {b.notes && (
                        <span style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{withLinks(b.notes)}</span>
                      )}
                      {b.status !== 'confirmed' && <span className="ad-tag">{b.status}</span>}
                    </div>
                    <div>
                      {b.status === 'confirmed' && (
                        <button type="button" className="ad-btn" onClick={() => setStatus(b.id, 'cancelled')}>
                          Cancel
                        </button>
                      )}
                      {b.status === 'cancelled' && (
                        <button type="button" className="ad-btn" onClick={() => setStatus(b.id, 'confirmed')}>
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
