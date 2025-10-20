
import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Calendar, Car, Shield, Phone, MapPin, Sparkles, Menu, X } from "lucide-react";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Input } from "./components/ui/input.jsx";
import { Textarea } from "./components/ui/textarea.jsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select.jsx";

/* =======================
   Business + Email settings
   ======================= */
const PHONE_DISPLAY = "04 1493 4879";
const PHONE_TEL = "0414934879";

const EMAILJS = {
  SERVICE_ID: "service_2nblxpd",
  TEMPLATE_ID: "template_z8iaqab",
  PUBLIC_KEY: "yG9k01tKsSvnyUUwt",
  TO_EMAIL: "mola_d@hotmail.com",
  FROM_NAME: "Bayside Mobile Car Detailing",
};

/* =======================
   Data & content
   ======================= */
const SIZES = [
  { id: "sedan", label: "Hatches & Sedans" },
  { id: "small-suv-wagon", label: "Small SUV / Wagon" },
  { id: "large-suv-4wd", label: "Large SUV / 4WD / 7-Seater" },
];

const SERVICES = [
  {
    id: "mini",
    name: "Mini Detail",
    tagline: "Quick refresh inside & out",
    prices: { sedan: 99, "small-suv-wagon": 119, "large-suv-4wd": 139 },
    time: "~60–75 mins",
    features: [
      "--- Exterior ---",
      "Vehicle pre-rinse to loosen dirt and grime",
      "Bug residue and light road tar safely removed",
      "Wheels, tyres and wheel arches thoroughly cleaned",
      "Door and boot jambs pressure washed & dried",
      "Fuel filler area washed and detailed",
      "Snow foam wash followed by hand wash and dry",
      "Protective gloss sealant applied to paint",
      "Exterior rubbers & plastics restored",
      "Windows & mirrors cleaned for clear visibility",
      "Tyres and guards dressed with satin finish",
      "--- Interior ---",
      "Complete wipe-down of interior surfaces",
      "Detailed vacuum including seats, boot & storage areas",
      "Seat & carpet shampoo + steam sanitation",
      "Leather cleaned & conditioned (if fitted)",
      "Dashboard & console detailed and finished",
      "Air vents & tight areas carefully brushed",
      "Pedals & lower trim cleaned",
      "Interior glass polished streak-free",
      "Deodorised cabin finish",
    ],
    hero:
      "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "interior",
    name: "Interior Detail",
    tagline: "Deep interior restoration & hygiene clean",
    oldPrice: 218,
    prices: { sedan: 149, "small-suv-wagon": 219, "large-suv-4wd": 259 },
    time: "~2–3 hrs",
    features: [
      "Interior plastics, trims and surfaces refreshed",
      "Thorough vacuum including seats, boot and storage areas",
      "Fabric shampoo & steam sanitisation (seats, floors, boot)",
      "Leather treatment – cleanse & nourish (if fitted)",
      "Dashboard & console detailed and rejuvenated",
      "Air vents, seat rails & small crevices carefully brushed",
      "Pedals and kick panels cleaned",
      "Interior glass polished for clarity",
      "Finishing deodoriser for a clean cabin feel",
    ],
    hero:
      "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "premium",
    
    name: "Full Premium Detail",
    oldPrice: 447,
    prices: { sedan: 249, "small-suv-wagon": 329, "large-suv-4wd": 379 },
    time: "~4–5 hrs",
    features: [
      "━━━━━━━━━━ Exterior ━━━━━━━━━━",
      "Vehicle pre-rinse to loosen dirt and grime",
      "Bug residue and light road tar safely removed",
      "Wheels, tyres and wheel arches thoroughly cleaned",
      "Door and boot jambs pressure washed & dried",
      "Fuel filler area washed and detailed",
      "Snow foam wash followed by hand wash and dry",
      "Protective gloss sealant applied to paint",
      "Exterior rubbers & plastics restored",
      "Windows & mirrors cleaned for clear visibility",
      "Tyres and guards dressed with satin finish",
      "━━━━━━━━━━ Interior ━━━━━━━━━━",
      "Complete wipe-down of interior surfaces",
      "Detailed vacuum including seats, boot & storage areas",
      "Seat & carpet shampoo + steam sanitation",
      "Leather cleaned & conditioned (if fitted)",
      "Dashboard & console detailed and finished",
      "Air vents & tight areas carefully brushed",
      "Pedals & lower trim cleaned",
      "Interior glass polished streak-free",
      "Deodorised cabin finish",
    ],
    hero:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "presale",
    
    name: "Pre Sale Detail",
    prices: { sedan: 559, "small-suv-wagon": 499, "large-suv-4wd": 559 },
    time: "~5–7 hrs",
    features: [
      "━━━━━━━━━━ Exterior ━━━━━━━━━━",
      "Complete pre-rinse including wheel arches",
      "Exterior shampoo wash including wheels",
      "High-pressure rinse to remove residue",
      "Hand dry with soft microfiber towels",
      "Door jambs wiped and detailed",
      "Tyres and mud flaps dressed for a clean finish",
      "Exterior paint polished for shine and clarity",
      "Chrome surfaces polished",
      "Plastic trims and exterior rubbers rejuvenated",
      "Windows and mirrors cleaned inside & out",
      "━━━━━━━━━━ Interior ━━━━━━━━━━",
      "Interior vacuum including seats, boot and compartments",
      "Cloth seats & carpets deep shampoo cleaned",
      "Interior roof lining carefully cleaned",
      "Dashboard & console detailed",
      "Interior plastics & trims wiped and dressed",
      "Door panels cleaned",
      "Air vents & tight areas brushed",
      "Mats washed and detailed",
      "Interior deodorised",
      "━━━━━━━━ Engine Bay ━━━━━━━━",
      "Engine bay surface wipe and clean",
    ],
    hero:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2100&q=80",
  },
];

const BENEFITS = [
  { icon: <Car className="w-5 h-5" />, text: "We come to you (home or work)" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Premium products only" },
  { icon: <Shield className="w-5 h-5" />, text: "Fully insured & police checked" },
  { icon: <Calendar className="w-5 h-5" />, text: "Easy online booking" },
];

/* =======================
   Small UI helpers
   ======================= */
function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs bg-[#f8fafc]/70 backdrop-blur border-[#e1e7ef] shadow-sm">
      <CheckCircle2 className="w-4 h-4" /> {children}
    </span>
  );
}
function Price({ amount }) {
  return <span className="font-semibold">${amount}</span>;
}

/* =======================
   Header (CTAs visible + phone in header)
   ======================= */
function Header({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const heroUrl =
    "https://images.unsplash.com/photo-1619975533296-f5c3f8b1db97?auto=format&fit=crop&w=2100&q=80";
  return (
    <header
      className="sticky top-0 z-40 bg-cover bg-center border-b border-[#e1e7ef]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url('${heroUrl}')`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[var(--brand)]" />
          <span className="font-semibold text-white drop-shadow">
            Bayside Mobile Car Detailing
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#gallery" className="hover:text-white">
            Gallery
          </a>
          <a href="#areas" className="hover:text-white">
            Service Areas
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="px-3 py-2 rounded-xl border border-white/30 text-white/90 hover:text-white hover:border-white/60"
            aria-label="Call now"
            title={`Call ${PHONE_DISPLAY}`}
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </span>
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              onBookClick?.();
            }}
            href="#booking"
            className="px-4 py-2 rounded-2xl bg-[var(--brand)] text-white border border-transparent hover:bg-[var(--brand-600)]"
          >
            Book Now
          </a>
        </div>

        <button
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-white/90">
            <a href="#services" onClick={() => setOpen(false)} className="hover:text-white">
              Services
            </a>
            <a href="#gallery" onClick={() => setOpen(false)} className="hover:text-white">
              Gallery
            </a>
            <a href="#areas" onClick={() => setOpen(false)} className="hover:text-white">
              Service Areas
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="px-4 py-2 rounded-2xl border border-white/30 text-white/90 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </span>
            </a>
            <a
              href="#booking"
              onClick={() => {
                setOpen(false);
                setTimeout(() => onBookClick?.(), 50);
              }}
              className="px-4 py-2 rounded-2xl bg-[var(--brand)] text-white border border-transparent hover:bg-[var(--brand-600)]"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* =======================
   Hero (add phone + Call Now + Book a Detail)
   ======================= */
function Hero({ onBookClick }) {
  const FALLBACKS = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=2100&q=80",
  ];
  const [idx, setIdx] = useState(0);

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden">
      <img
        src={FALLBACKS[idx]}
        alt="Mobile car detailing"
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setIdx((i) => (i + 1 < FALLBACKS.length ? i + 1 : i))}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65))" }}
      />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-40 text-white">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
          Premium Mobile Car Detailing in Melbourne’s East
        </h1>

        <div className="mt-3 text-white/90 text-sm">
          <span className="inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
          </span>
        </div>

        <div className="mt-6 inline-block">
          <span className="inline-block px-4 py-2 text-lg font-semibold bg-[var(--brand)] text-white rounded-full animate-bounce-slow shadow-lg">
            No Rush Guarantee – We Take Our Time
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {BENEFITS.map((b, i) => (
            <Pill key={i}>{b.text}</Pill>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              onBookClick?.();
            }}
            className="px-5 py-2 rounded-2xl bg-[var(--brand)] text-white border border-transparent hover:bg-[var(--brand-600)]"
          >
            Book a Detail
          </a>
          <a
            href="#services"
            className="px-5 py-2 rounded-2xl border border-[var(--brand)] text-white bg-[#f8fafc]/10 hover:bg-[#f8fafc]/20"
          >
            View Services
          </a>
          {/* Mobile/desktop inline Call Now button */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="px-5 py-2 rounded-2xl bg-white text-[var(--ink)] hover:bg-gray-50"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

/* =======================
   Services
   ======================= */
function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
      <p className="text-[#4c5563] mt-2">Four curated packages to suit every vehicle and budget.</p>
      <div className="mt-8 overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <Card
              key={s.id}
              className="rounded-2xl overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg snap-start min-w-[85%] md:min-w-0"
            >
              <img src={s.hero} alt={s.name} className="h-40 w-full object-cover" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <span className="text-lg font-bold">
                    {s.id === "interior" ? (
                      <>
                        <s className="text-slate-400 mr-1">${s.oldPrice}</s> ${s.prices.sedan}*
                      </>
                    ) : s.id === "premium" ? (
                      <>
                        <s className="text-slate-400 mr-1">${s.oldPrice}</s> ${s.prices.sedan}*
                      </>
                    ) : (
                      <>${s.prices.sedan}</>
                    )}
                  </span>
                </div>
                <p className="text-[#4c5563] text-sm">{s.tagline}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-slate-700">
                  <div>
                    From <Price amount={s.prices.sedan} /> for Hatches & Sedans
                  </div>
                  <div>Small SUV / Wagon – <Price amount={s.prices["small-suv-wagon"]} /></div>
                  <div>Large SUV / 4WD / 7-Seater – <Price amount={s.prices["large-suv-4wd"]} /></div>
                </div>
                <div className="mt-5">
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("booking")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="block text-center rounded-xl w-full bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent px-4 py-2"
                  >
                    Book Now
                  </a>
                  <div className="text-xs text-slate-500 mt-3">
                    Heavy soiling may incur additional charges.
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =======================
   Gallery (locked to your 6 images in /public)
   ======================= */
function Gallery() {
  const IMAGES = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
  ];
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <p className="text-[#4c5563] mt-2">Recent work and finishes you can expect.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Detail ${i + 1}`}
            className="rounded-2xl w-full h-72 object-cover bg-[#e2e8f0] scale-[0.8]"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

/* =======================
   Service areas
   ======================= */
function Areas() {
  const suburbs = [
    "Beaumaris",
    "Box Hill",
    "Malvern",
    "Caulfield",
    "Camberwell",
    "Hawthorn",
    "Kew",
    "Balwyn",
    "Glen Iris",
    "Mount Waverley",
    "Glen Waverley",
    "Wheelers Hill",
    "Ashburton",
    "Chadstone",
    "Burwood",
    "Templestowe",
    "Doncaster",
    "Donvale",
    "Brighton",
    "Sandringham",
  ];
  return (
    <section id="areas" className="bg-[#f5f7fa] border-y border-[#e1e7ef]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Service Areas</h2>
        <p className="text-[#4c5563] mt-2">
          Melbourne’s East & South-East – we come to your home or workplace.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {suburbs.map((s) => (
            <span key={s} className="text-sm border rounded-xl px-3 py-2 bg-[#f8fafc]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =======================
   Booking form (emails you via EmailJS)
   ======================= */
function useBookingForm() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    suburb: "",
    address: "",
    service: SERVICES[1].id,
    size: SIZES[0].id,
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const price = useMemo(() => {
    const svc = SERVICES.find((s) => s.id === data.service) || SERVICES[0];
    return svc.prices[data.size];
  }, [data.service, data.size]);

  function validate() {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    { // accept 04xxxxxxxx or +61 / 61 format; allow spaces/hyphens
      const digits = (data.phone||'').replace(/\D/g,'');
      const isAU = /^04\d{8}$/.test(digits) || /^614\d{8}$/.test(digits);
      if (!isAU) e.phone = "AU mobile (e.g. 04XXXXXXXX)";
    }
    if (!data.suburb.trim()) e.suburb = "Suburb required";
    if (!data.address.trim()) e.address = "Street address required";
    // date optional
    // time optional
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function niceDate(d) {
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  }
  function niceTime(t) {
    try {
      const [h, m] = t.split(":");
      const dt = new Date();
      dt.setHours(parseInt(h || "0"), parseInt(m || "0"));
      return dt.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    } catch {
      return t;
    }
  }

  async function submit() {
    setSendError("");
    if (!validate()) return false;

    const svc = SERVICES.find((s) => s.id === data.service) || SERVICES[0];
    const vehicle = SIZES.find((x) => x.id === data.size)?.label || data.size;

    const subject = `New Booking – ${svc.name} – ${niceDate(data.date)} ${niceTime(data.time)}`;

    const templateParams = {
      to_email: EMAILJS.TO_EMAIL,
      subject,
      from_name: EMAILJS.FROM_NAME,
      customer_name: data.name,
      customer_phone: data.phone,
      suburb: data.suburb,
      address: data.address,
      service_name: svc.name,
      vehicle_size: vehicle,
      price: `$${price} AUD`,
      preferred_date: niceDate(data.date),
      preferred_time: niceTime(data.time),
      notes: data.notes || "(none)",
      created_at: new Date().toLocaleString(),
    };

    setSending(true);
    try {
      await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS.PUBLIC_KEY,
      });
      setSubmitted(true);
    } catch (err) {
      setSendError("Sorry, the email couldn’t be sent. Please try again in a moment.");
    } finally {
      setSending(false);
    }
    return true;
  }

  return { data, setData, errors, price, submit, submitted, sending, sendError };
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <div className="text-xs text-red-600 mt-1">{msg}</div>;
}

function BookingForm() {
  const { data, setData, errors, price, submit, submitted, sending, sendError } = useBookingForm();
  const service = SERVICES.find((s) => s.id === data.service) || SERVICES[0];

  if (submitted) {
    return (
      <div className="rounded-2xl border p-6 bg-[#f8fafc] text-center">
        <h3 className="text-xl font-semibold">Thanks! Your request has been emailed.</h3>
        <p className="text-[#4c5563] mt-2">We’ll confirm your booking by phone shortly.</p>
        <div className="mt-4 text-sm">
          Selected: <strong>{service.name}</strong> – {SIZES.find((s) => s.id === data.size)?.label} –{" "}
          <strong>${price}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-6 bg-[#f8fafc]">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calendar className="w-5 h-5" /> Book a Mobile Detail
      </h3>
      <p className="text-[#4c5563] text-sm mt-1">
        No payment required now. We’ll confirm availability and final price if extra time is needed.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="text-sm">Name</label>
          <Input value={data.name} onChange={(e) => setData((v) => ({ ...v, name: e.target.value }))} placeholder="Full name" />
          <FieldError msg={errors["name"]} />
        </div>
        <div>
          <label className="text-sm">Mobile</label>
          <Input value={data.phone} onChange={(e) => setData((v) => ({ ...v, phone: e.target.value }))} placeholder="e.g. 0412 345 678" />
          <FieldError msg={errors["phone"]} />
        </div>
        <div>
          <label className="text-sm">Suburb</label>
          <Input value={data.suburb} onChange={(e) => setData((v) => ({ ...v, suburb: e.target.value }))} placeholder="e.g. Berwick" />
          <FieldError msg={errors["suburb"]} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Address</label>
          <Input value={data.address} onChange={(e) => setData((v) => ({ ...v, address: e.target.value }))} placeholder="Street address" />
          <FieldError msg={errors["address"]} />
        </div>
        <div>
          <label className="text-sm">Service</label>
          <Select value={data.service} onValueChange={(val) => setData((v) => ({ ...v, service: val }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Vehicle Size</label>
          <Select value={data.size} onValueChange={(val) => setData((v) => ({ ...v, size: val }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SIZES.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Preferred Date</label>
          <Input type="date" value={data.date} onChange={(e) => setData((v) => ({ ...v, date: e.target.value }))} />
          <FieldError msg={errors["date"]} />
        </div>
        <div>
          <label className="text-sm">Preferred Time</label>
          <Input type="time" value={data.time} onChange={(e) => setData((v) => ({ ...v, time: e.target.value }))} />
          <FieldError msg={errors["time"]} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Notes (optional)</label>
          <Textarea value={data.notes} onChange={(e) => setData((v) => ({ ...v, notes: e.target.value }))} placeholder="Pets, stains, access info, etc." />
        </div>
      </div>

      {sendError && <div className="mt-3 text-sm text-red-600">{sendError}</div>}

      <div className="mt-6 flex items-center justify-between">
        <div className="text-slate-700 text-sm">
          Estimated total: <span className="font-semibold">${price} AUD</span>{" "}
          <span className="text-xs text-slate-500">(subject to inspection)</span>
        </div>
        <button
          onClick={submit}
          disabled={sending}
          className="rounded-2xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent px-4 py-2"
        >
          {sending ? "Sending..." : "Request Booking"}
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
        <Shield className="w-4 h-4" /> Fully insured • Police checked • Secure & private
      </div>
    </div>
  );
}

/* =======================
   Footer
   ======================= */
function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="w-5 h-5" /> <span className="font-semibold">Bayside Mobile Car Detailing</span>
          </div>
          <p className="text-white/70 mt-2 text-sm">Premium mobile detailing across Melbourne’s East & South-East.</p>
          <p className="text-white/60 text-xs mt-2">ABN 00 000 000 000</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <div className="mt-2 text-white/80 text-sm flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Dandenong North, VIC
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <div className="mt-2 text-white/80 text-sm flex flex-col gap-1">
            <a href="#services" className="hover:underline">Services</a>
            <a href="#gallery" className="hover:underline">Gallery</a>
            <a href="#areas" className="hover:underline">Service Areas</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-white/60 text-xs py-4 text-center">
        © {new Date().getFullYear()} Bayside Mobile Car Detailing. All rights reserved.
      </div>
    </footer>
  );
}

/* =======================
   Root
   ======================= */
export default function App() {
  return (
    <>
      <style>{`:root{--brand:#0d6ead;--brand-600:#0a5687;--ink:#0f172a;--muted:#64748b;--accent:#e8eef6}`}</style>
      <div className="text-slate-900 bg-[#eef4fa]">
        <Header
          onBookClick={() => {
            setTimeout(
              () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }),
              50
            );
          }}
        />
        <Hero
          onBookClick={() => {
            setTimeout(
              () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }),
              50
            );
          }}
        />
        <Services />
        <Gallery />
        <Areas />

        <section id="booking" className="max-w-6xl mx-auto px-4 py-16 pb-24 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Book Your Detail</h2>
              <p className="text-[#4c5563] mt-2">
                Choose a service and time that suits. We’ll bring water, power and pro-grade products.
              </p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
            <div className="space-y-6">
              {BENEFITS.map((b, i) => (
                <div key={i} className="rounded-2xl border p-5 bg-[#f5f7fa] flex gap-3 items-start">
                  <div className="shrink-0 bg-[#f8fafc] rounded-xl p-2 border">{b.icon}</div>
                  <div>
                    <div className="font-medium">{b.text}</div>
                    <div className="text-sm text-[#4c5563]">Quality results, friendly service, and clear communication.</div>
                  </div>
                </div>
              ))}
              <Card className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop"
                  alt="Team at work"
                  className="h-40 w-full object-cover"
                />
                <CardContent className="p-5">
                  <div className="font-semibold">About Us</div>
                  <p className="text-sm text-slate-700 mt-1">
                    Family-run, fully insured, police-checked. We service Bayside, Dandenong, Glen Waverley, and surrounds.
                  </p>
                  <div className="text-xs text-slate-500 mt-4">Heavy soiling may incur additional charges.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mobile floating CTA (mobile only as requested) */}
        <div className="fixed md:hidden bottom-4 inset-x-0 px-4">
          <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(
                  () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }),
                  50
                );
              }}
              className="text-center rounded-2xl shadow-xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent px-4 py-3"
            >
              Book Now
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-center rounded-2xl shadow-xl bg-white text-[var(--ink)] hover:bg-gray-50 border px-4 py-3"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .animate-bounce-slow { animation: bounce-slow 2.2s ease-in-out infinite; }
        a, button { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </>
  );
}
