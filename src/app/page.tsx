"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Wind, 
  VolumeX, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sliders, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Send, 
  Phone, 
  Calculator,
  ChevronRight
} from "lucide-react";
import { SERVICES, VEHICLES, FAQS, REVIEWS, Service, Vehicle } from "@/data";

// Map service icon name strings to Lucide components
const IconMap: { [key: string]: any } = {
  Sparkles,
  Wind,
  VolumeX,
  ShieldAlert,
  ShieldCheck,
  Layers,
  Cpu,
  Sliders
};

export default function HomePage() {
  // Before/After Slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Accordion active FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Booking Calculator state
  const [calcService, setCalcService] = useState<string>("shumka");
  const [calcVehicle, setCalcVehicle] = useState<string>("gentra");
  const [calcPackage, setCalcPackage] = useState<"standard" | "premium">("standard");
  const [calcName, setCalcName] = useState("");
  const [calcPhone, setCalcPhone] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Live calculator price computation
  useEffect(() => {
    const vehicleObj = VEHICLES.find((v) => v.id === calcVehicle);
    if (!vehicleObj) return;

    let base = vehicleObj.basePrices[calcService] || 0;

    // Special packages handling for Shumka or others
    if (calcService === "shumka") {
      // Standard = 4,000,000 UZS base, Premium = 7,000,000 UZS base for Cobalt/Gentra level, let's scale relative to vehicle
      const factor = vehicleObj.id === "tahoe" || vehicleObj.id === "bmw-x5" ? 1.8 : 
                     vehicleObj.id === "porsche-911" ? 1.5 : 1.0;
      if (calcPackage === "standard") {
        base = Math.round(4000000 * factor);
      } else {
        base = Math.round(7000000 * factor);
      }
    } else {
      // For other services, standard is base, premium adds 50%
      if (calcPackage === "premium") {
        base = Math.round(base * 1.5);
      }
    }

    setCalculatedPrice(base);
  }, [calcService, calcVehicle, calcPackage]);

  // Handle Before/After slider dragging
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  // Helper for formatting price in UZS
  const formatUZS = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  // Telegram direct booking generator
  const triggerTelegramBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = SERVICES.find(s => s.id === calcService)?.title || calcService;
    const vehicleName = VEHICLES.find(v => v.id === calcVehicle)?.name || calcVehicle;
    
    const message = `✨ APEX Detailing Booking Order ✨\n\n` +
                    `👤 Name: ${calcName || "Not specified"}\n` +
                    `📞 Phone: ${calcPhone || "Not specified"}\n` +
                    `🛠️ Service: ${serviceName}\n` +
                    `🚗 Car Model: ${vehicleName}\n` +
                    `📦 Package: ${calcPackage.toUpperCase()}\n` +
                    `💰 Total Cost: ${formatUZS(calculatedPrice)}\n\n` +
                    `Please schedule my detailing appointment. Thank you!`;
    
    const encodedText = encodeURIComponent(message);
    window.open(`https://t.me/apex_detailing_demo?text=${encodedText}`, "_blank");
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Car Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-[1.03]"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop')", // High quality dark Mercedes/Porsche look
          }}
        >
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#050505]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="inline-block bg-white/5 backdrop-blur-md text-xs font-semibold tracking-[0.2em] uppercase text-[#00c2ff] px-4 py-2 rounded-full border border-white/10">
              The Gold Standard of Car Care
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-none">
              Professional Auto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00c2ff]">
                Detailing Services
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the pinnacle of automotive care. Unleash a mirror-like shine, advanced paint protection, and premium comfort for your luxury vehicle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#121214]/80 backdrop-blur-md hover:bg-[#1a1a1e]/90 text-white font-semibold px-8 py-4 rounded-full border border-white/10 hover:border-[#00c2ff]/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-[#00c2ff]" />
                <span>Calculate Price</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 opacity-70 z-10 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-[#00c2ff]" />
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="relative py-32 px-6 bg-[#050505] z-10">
        {/* Glow accent */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00c2ff]">
              Bespoke Treatments
            </h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Signature Detailing Services
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] mx-auto rounded-full" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => {
              const ServiceIcon = IconMap[service.iconName] || Sparkles;

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group relative flex flex-col justify-between h-[360px] rounded-3xl overflow-hidden glass-panel glass-panel-hover"
                >
                  {/* Card Background image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/80 to-transparent" />
                  </div>

                  {/* Top content */}
                  <div className="relative z-10 p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00c2ff] group-hover:bg-[#00c2ff] group-hover:text-black transition-all duration-300">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#00c2ff] transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="relative z-10 p-8 pt-0 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                    <span className="font-semibold tracking-wider uppercase">Configure Packages</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Premium glowing hover border */}
                  <div className="absolute inset-0 border border-transparent rounded-3xl group-hover:border-[#00c2ff]/30 pointer-events-none transition-all duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BEFORE / AFTER INTERACTIVE SLIDER */}
      <section id="gallery" className="relative py-32 px-6 bg-[#0b0b0d] border-y border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00c2ff]">
              Quality Visualized
            </h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Uncompromising Results
            </p>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
              Drag the center slider handles to compare the professional paint correction detailing. Left side is Before (heavily oxidized, swirled), right side is After (APEX Multi-Step Polish).
            </p>
          </div>

          {/* Draggable Slider Container */}
          <div 
            ref={sliderContainerRef}
            className="relative max-w-4xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onTouchStart={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onTouchEnd={() => { isDragging.current = false; }}
          >
            {/* Before (Background) - Swirled Red/Black Sports Car */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1600&auto=format&fit=crop" // Golf / Hatchback dark shot
                alt="Before Detailing" 
                className="w-full h-full object-cover filter grayscale sepia-30 contrast-90 brightness-75"
              />
              <div className="absolute top-6 left-6 bg-red-600/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-red-500/20">
                BEFORE (Neglected Paint)
              </div>
            </div>

            {/* After (Foreground, Clipped) - Shiny sports car */}
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1600&auto=format&fit=crop"
                alt="After Detailing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-[#0070f3]/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-[#00c2ff]/30">
                AFTER APEX CERAMIC
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white backdrop-blur-sm shadow-[0_0_10px_rgba(0,194,255,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle circle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/90 border border-white/20 shadow-[0_0_15px_rgba(0,194,255,0.4)] flex items-center justify-center text-white">
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS */}
      <section className="relative py-32 px-6 bg-[#050505] z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00c2ff]">
              Testimonials
            </h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What Our Clients Say
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] mx-auto rounded-full" />
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={review.name}
                className="glass-panel p-8 rounded-3xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex text-amber-400 space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col">
                  <span className="text-sm font-semibold text-white">{review.name}</span>
                  <span className="text-xs text-[#00c2ff]">{review.car}</span>
                  <span className="text-[10px] text-gray-500 mt-1">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE BOOKING CALCULATOR */}
      <section id="prices" className="relative py-32 px-6 bg-[#0b0b0d] border-y border-white/5 z-10">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[250px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00c2ff]">
              Live Pricing Matrix
            </h2>
            <p id="calculator" className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Instant Package Estimator
            </p>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
              Select your vehicle size and desired detailing package. See instant transparent price quotes in Uzbek UZS currency, and request direct booking slot.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            {/* Input Config Form */}
            <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl space-y-8">
              <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4 flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-[#00c2ff]" />
                <span>Configure Your Detail Package</span>
              </h3>

              <div className="space-y-6">
                {/* 1. Service Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    1. Select Service
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setCalcService(s.id)}
                        className={`text-xs text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                          calcService === s.id
                            ? "bg-white/10 text-white border-[#00c2ff] shadow-[0_0_12px_rgba(0,194,255,0.2)]"
                            : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Vehicle Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    2. Select Vehicle Model
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {VEHICLES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setCalcVehicle(v.id)}
                        className={`text-xs text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                          calcVehicle === v.id
                            ? "bg-white/10 text-white border-[#00c2ff] shadow-[0_0_12px_rgba(0,194,255,0.2)]"
                            : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15"
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Package Tier Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    3. Detailing Package Tier
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCalcPackage("standard")}
                      className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                        calcPackage === "standard"
                          ? "bg-[#0070f3]/10 text-white border-[#0070f3] shadow-[0_0_15px_rgba(0,112,243,0.3)]"
                          : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <span className="text-sm font-bold text-white">Standard Tier</span>
                      <span className="text-[10px] text-gray-500 mt-1">Essential coverage & premium coatings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcPackage("premium")}
                      className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                        calcPackage === "premium"
                          ? "bg-[#00c2ff]/10 text-white border-[#00c2ff] shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                          : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <span className="text-sm font-bold text-[#00c2ff]">Premium Tier</span>
                      <span className="text-[10px] text-gray-500 mt-1">Full vehicle treatment + extended warranty</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary & Booking Intake */}
            <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-[#00c2ff]/15 relative">
              {/* Outer active glow highlight */}
              <div className="absolute inset-0 rounded-3xl border border-[#00c2ff]/20 animate-glow-pulse pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <span>Estimated Cost</span>
              </h3>

              <div className="space-y-6">
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Service:</span>
                    <span className="text-white font-medium">
                      {SERVICES.find(s => s.id === calcService)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Car Size:</span>
                    <span className="text-white font-medium">
                      {VEHICLES.find(v => v.id === calcVehicle)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tier:</span>
                    <span className="text-[#00c2ff] font-bold capitalize">
                      {calcPackage}
                    </span>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
                    <span className="text-gray-400 text-xs uppercase font-bold">Total:</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00c2ff] tracking-tight">
                      {formatUZS(calculatedPrice)}
                    </span>
                  </div>
                </div>

                {/* Intake Form */}
                <form onSubmit={triggerTelegramBooking} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="user-name" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Your Name</label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={calcName}
                      onChange={(e) => setCalcName(e.target.value)}
                      placeholder="Shaxzod Alimov"
                      className="w-full bg-white/5 border border-white/5 focus:border-[#00c2ff] text-white px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="user-phone" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                      <input
                        id="user-phone"
                        type="tel"
                        required
                        value={calcPhone}
                        onChange={(e) => setCalcPhone(e.target.value)}
                        placeholder="+998 (90) 123-45-67"
                        className="w-full bg-white/5 border border-white/5 focus:border-[#00c2ff] text-white pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] hover:from-[#00c2ff] hover:to-[#0070f3] text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,112,243,0.3)] transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm & Book via Telegram</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section id="faq" className="relative py-32 px-6 bg-[#050505] z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00c2ff]">
              Information
            </h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] mx-auto rounded-full" />
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div 
                  key={idx}
                  className="rounded-2xl glass-panel overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <span className="font-bold text-white text-base sm:text-lg pr-4">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#00c2ff] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#00c2ff] text-black" : ""}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 sm:p-8 pt-0 border-t border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & INTAKE WRAPPER */}
      <section id="contact" className="relative py-32 px-6 bg-[#0b0b0d] border-t border-white/5 z-10 text-center">
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-8">
          <span className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#00c2ff] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Send className="w-6 h-6 animate-pulse" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">Ready for a Mirror Shine?</h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Get premium detailing care for your luxury car today. Talk directly to our detailing masters, get instant package consultations, or lock down a slot via Telegram or Phone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://t.me/apex_detailing_demo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] text-white font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(0,112,243,0.3)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Book via Telegram</span>
            </a>
            <a
              href="tel:+998901234567"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/10 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4 text-[#00c2ff]" />
              <span>Call Us: +998 (90) 123-45-67</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
