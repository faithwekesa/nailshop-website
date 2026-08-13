"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Gallery data — mapped to the real files in /public/french manicure */
/*  NOTE: "short cuties.jpeg" has a space in the filename. Spaces in   */
/*  public asset paths work but are fragile — renaming it to           */
/*  "short-cuties.jpeg" is recommended. Until then it's URL-encoded.   */
/* ------------------------------------------------------------------ */
const FOLDER = "/french manicure";

const TABS = [
  {
    id: "essentials",
    label: "The Essentials",
    images: [
      { src: `${FOLDER}/french.jpg`, alt: "Classic French tips" },
      { src: `${FOLDER}/frech2.jpg`, alt: "Clean solid nude polish" },
      { src: encodeURI(`${FOLDER}/short cuties.jpeg`), alt: "Short natural nails" },
      { src: `${FOLDER}/winerednails.jpg`, alt: "Wine red solid polish" },
    ],
  },
  {
    id: "minimalist",
    label: "Modern Minimalist",
    images: [
      { src: `${FOLDER}/modernswirls.jpg`, alt: "Abstract swirl line art" },
      { src: `${FOLDER}/negativespace.jpg`, alt: "Negative space design" },
      { src: `${FOLDER}/negativespace1.jpg`, alt: "Negative space design" },
      { src: `${FOLDER}/floralallongalmond.jpg`, alt: "Delicate floral almond nails" },
    ],
  },
  {
    id: "dimensional",
    label: "Dimensional Effects",
    images: [
      { src: `${FOLDER}/waterfall.jpg`, alt: "Waterfall chrome effect" },
      { src: `${FOLDER}/stiletto.png`, alt: "Glossy stiletto shape" },
      { src: `${FOLDER}/frenchmanicure1.jpeg`, alt: "French manicure with shine" },
      { src: `${FOLDER}/naildesign1.jpeg`, alt: "Dimensional nail design" },
    ],
  },
  {
    id: "statement",
    label: "Statement & 3D Art",
    images: [
      { src: `${FOLDER}/naildesign2.jpeg`, alt: "3D sculpted nail art" },
      { src: `${FOLDER}/naildesign3.jpeg`, alt: "Hand-painted nail art" },
      { src: `${FOLDER}/naildesign4.jpeg`, alt: "Embellished statement nails" },
      { src: `${FOLDER}/stiletto.png`, alt: "Statement stiletto shape" },
    ],
  },
  {
    id: "seasonal",
    label: "Seasonal Collections",
    images: [
      { src: `${FOLDER}/winerednails.jpg`, alt: "Festive wine red nails" },
      { src: `${FOLDER}/waterfall.jpg`, alt: "Seasonal chrome trend" },
      { src: `${FOLDER}/modernswirls.jpg`, alt: "Seasonal swirl pattern" },
      { src: `${FOLDER}/french.jpg`, alt: "Classic seasonal french tips" },
    ],
  },
];

const SERVICES = [
  { name: "Plain Gel Application", price: "Ksh 500 – 800" },
  { name: "Gel Polish Manicure / Pedicure", price: "Ksh 1,000 – 1,500" },
  { name: "Stick-Ons with Ombré / Art", price: "Ksh 1,500 – 2,500" },
  { name: "Full Acrylic Extensions + Gel Polish", price: "Ksh 2,500 – 4,000" },
];

const NAV_LINKS = [
  { href: "#gallery", label: "Gallery" },
  { href: "#pricing", label: "Pricing" },
  { href: "#booking", label: "Booking" },
  { href: "#location", label: "Location" },
];

/* ------------------------------------------------------------------ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!form.service) nextErrors.service = "Please choose a treatment.";
    if (!form.date) nextErrors.date = "Please choose a date.";
    if (!form.time) nextErrors.time = "Please choose a time.";
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your full name.";

    const phoneDigits = form.phone.replace(/[\s-]/g, "");
    if (!/^(?:\+254|0)(7|1)\d{8}$/.test(phoneDigits)) {
      nextErrors.phone = "Enter a valid Kenyan number, e.g. 07XX XXX XXX.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitted(true);
  }

  function resetForm() {
    setForm({ service: "", date: "", time: "", name: "", phone: "", note: "" });
    setErrors({});
    setSubmitted(false);
  }

  return (
    <main className="bg-[#fdfbf8] text-[#2c2724] font-sans">
      {/* ---------------- HEADER ---------------- */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#fdfbf8]/80 border-b border-black/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <a href="#top" className="font-serif text-xl sm:text-2xl tracking-wide">
            Frank <span className="text-[#bd8a72] italic">Nail Studio</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wide text-[#5c5450] hover:text-[#bd8a72] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="bg-[#2c2724] text-[#fdfbf8] text-sm uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-[#bd8a72] transition-colors"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-7"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="h-0.5 bg-[#2c2724]" />
            <span className="h-0.5 bg-[#2c2724]" />
            <span className="h-0.5 bg-[#2c2724]" />
          </button>
        </div>

        {/* Mobile nav panel */}
        {menuOpen && (
          <div className="md:hidden border-t border-black/5 bg-[#fdfbf8] px-4 pb-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-lg"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="bg-[#2c2724] text-[#fdfbf8] text-sm uppercase tracking-wide px-5 py-2.5 rounded-full text-center"
            >
              Book Now
            </a>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="pt-32 pb-20 px-4 sm:px-6 text-center bg-gradient-to-b from-[#f6dde1]/40 to-transparent">
        <p className="uppercase text-xs tracking-[0.2em] text-[#bd8a72] mb-4">
          Kahawa Wendani · Nairobi
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-2xl mx-auto">
          Elegance at Your <span className="italic text-[#bd8a72]">Fingertips</span>
        </h1>
        <p className="max-w-md mx-auto mt-6 text-[#5c5450]">
          A quiet, considered nail studio built on impeccable hygiene, skilled
          artistry, and genuine care for your nail health.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="#booking"
            className="bg-[#2c2724] text-[#fdfbf8] text-sm uppercase tracking-wide px-7 py-3.5 rounded-full hover:bg-[#bd8a72] transition-colors"
          >
            Reserve Your Seat
          </a>
          <a
            href="#gallery"
            className="border border-black/10 text-sm uppercase tracking-wide px-7 py-3.5 rounded-full hover:border-[#bd8a72] hover:text-[#bd8a72] transition-colors"
          >
            View Gallery
          </a>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section id="gallery" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-10">
          <p className="uppercase text-xs tracking-[0.2em] text-[#bd8a72] mb-3">Our Work</p>
          <h2 className="font-serif text-3xl sm:text-4xl">A Gallery of Finishes</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-sm border transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2c2724] text-[#fdfbf8] border-[#2c2724]"
                  : "border-black/10 text-[#5c5450] hover:border-[#bd8a72]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {TABS.find((t) => t.id === activeTab)?.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#faf5f1]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-10">
            <p className="uppercase text-xs tracking-[0.2em] text-[#bd8a72] mb-3">Investment</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Pricing Menu</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="bg-white border border-black/5 rounded-2xl p-6 flex justify-between items-start gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-serif text-lg">{s.name}</h3>
                <span className="font-serif text-[#bd8a72] whitespace-nowrap">{s.price}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 bg-[#f6dde1] rounded-xl px-5 py-4 text-sm text-[#5c5450]">
            <strong>Customised 3D Art / Embellishments</strong> — priced dynamically
            per nail based on technical design complexity.
          </p>
        </div>
      </section>

      {/* ---------------- BOOKING ---------------- */}
      <section id="booking" className="py-16 sm:py-20 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="uppercase text-xs tracking-[0.2em] text-[#bd8a72] mb-3">Reserve</p>
          <h2 className="font-serif text-3xl sm:text-4xl">Book Your Appointment</h2>
        </div>

        <div className="bg-white border border-black/5 rounded-2xl p-6 sm:p-10 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Service */}
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                  Treatment
                </label>
                <select
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72]"
                >
                  <option value="">Select a treatment…</option>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.price})
                    </option>
                  ))}
                  <option value="Customised 3D Art">Customised 3D Art (priced per design)</option>
                </select>
                {errors.service && <p className="text-xs text-[#a85c53] mt-1">{errors.service}</p>}
              </div>

              {/* Date & time */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72]"
                  />
                  {errors.date && <p className="text-xs text-[#a85c53] mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72]"
                  />
                  {errors.time && <p className="text-xs text-[#a85c53] mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Name & phone */}
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Wanjiru"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72]"
                />
                {errors.name && <p className="text-xs text-[#a85c53] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72]"
                />
                {errors.phone && <p className="text-xs text-[#a85c53] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-[#5c5450] mb-2">
                  Design Inspiration (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the look you have in mind…"
                  value={form.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-4 py-3 bg-[#faf5f1] focus:outline-none focus:border-[#bd8a72] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2c2724] text-[#fdfbf8] text-sm uppercase tracking-wide px-6 py-3.5 rounded-full hover:bg-[#bd8a72] transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#f6dde1] flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#bd8a72" strokeWidth={1.8} className="w-7 h-7">
                  <path d="m20 6-11 11-5-5" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-2">You&apos;re All Set, {form.name.split(" ")[0]}</h3>
              <p className="text-[#5c5450] mb-6">Your seat at Frank Nail Studio is reserved.</p>

              <div className="bg-[#faf5f1] rounded-xl p-5 text-left text-sm space-y-2 mb-5">
                <div className="flex justify-between border-b border-dashed border-black/10 pb-2">
                  <span className="text-[#5c5450]">Treatment</span>
                  <span>{form.service}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-black/10 pb-2">
                  <span className="text-[#5c5450]">Date</span>
                  <span>{form.date}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-black/10 pb-2">
                  <span className="text-[#5c5450]">Time</span>
                  <span>{form.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5c5450]">Contact</span>
                  <span>{form.phone}</span>
                </div>
              </div>

              <p className="bg-[#f6dde1] rounded-xl px-5 py-4 text-sm text-[#5c5450] mb-6">
                No payment is required now — your treatment is securely settled
                offline via <strong>M-Pesa or Cash</strong> at the salon.
              </p>

              <button
                onClick={resetForm}
                className="border border-black/10 text-sm uppercase tracking-wide px-6 py-3 rounded-full hover:border-[#bd8a72] hover:text-[#bd8a72] transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- LOCATION ---------------- */}
      <section id="location" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#faf5f1]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-10">
            <p className="uppercase text-xs tracking-[0.2em] text-[#bd8a72] mb-3">Visit Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Location &amp; Hours</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Real Google Maps embed — no API key required */}
            <div className="rounded-2xl overflow-hidden border border-black/5 aspect-[4/3]">
              <iframe
                title="Frank Nail Studio location on Google Maps"
                src="https://www.google.com/maps?q=Kahawa+Wendani,+Thika+Superhighway,+Nairobi&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg mb-1">Find Us</h4>
                <p className="text-sm text-[#5c5450]">
                  Conveniently situated along the Thika Superhighway corridor in
                  Kahawa Wendani, directly opposite the Kahawa Military Barracks
                  and a short walk from Cleanshelf Supermarket.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">Opening Hours</h4>
                <p className="text-sm text-[#5c5450]">
                  Mon – Sat: 8:00 AM – 8:00 PM<br />
                  Sunday: 11:00 AM – 6:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-serif text-lg mb-1">Reach Us Directly</h4>
                <p className="text-sm text-[#5c5450]">
                  WhatsApp Business or Instagram — links below in the footer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#2c2724] text-[#ecdccb] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8 text-center sm:text-left">
          <div>
            <p className="font-serif text-xl text-[#fdfbf8]">
              Frank <span className="text-[#e6c9b8] italic">Nail Studio</span>
            </p>
            <p className="text-sm text-[#ecdccb]/60 mt-2 max-w-xs">
              A quiet, considered nail studio in Kahawa Wendani.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Business"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#bd8a72] hover:border-[#bd8a72] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5Z" />
                <path d="M8.5 9.5c.3 2.8 2.2 4.7 5 5" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#bd8a72] hover:border-[#bd8a72] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-[#ecdccb]/40 mt-10">
          © 2026 Frank Nail Studio, Kahawa Wendani. All rights reserved.
        </p>
      </footer>
    </main>
  );
}