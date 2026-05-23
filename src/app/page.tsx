"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  ChevronRight, 
  Phone, 
  MapPin, 
  Compass, 
  Clock, 
  PhoneCall,
  Apple
} from "lucide-react";
import { SERVICES } from "@/data";

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

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  phoneRaw: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  embedUrl: string;
}

const BRANCHES: Branch[] = [
  {
    id: "axsikent-3",
    name: "Elegant Auto studio 3-filiali",
    address: "1-axsikent dasaf sivetafori ro'parasida",
    phone: "+998 (90) 123-45-67",
    phoneRaw: "+998901234567",
    hours: "09:00 - 20:00 (Dushanba - Shanba)",
    coordinates: { lat: 41.2779, lng: 69.2052 },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0828956976694!2d69.2025!3d41.2779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a1575c32ab9%3A0x6e9f45f65342a!2sBunyodkor%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2sub!4v1700000000000"
  },
  {
    id: "axsikent-4",
    name: "Elegant Auto studio 4-filiali",
    address: "1-axsikent dasaf sivetafori ro'parasida",
    phone: "+998 (95) 987-65-43",
    phoneRaw: "+998959876543",
    hours: "09:00 - 20:00 (Dushanba - Shanba)",
    coordinates: { lat: 41.3541, lng: 69.2886 },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789012!2d69.2886!3d41.3541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b543210fedb%3A0x123456789abcdef!2sAmir%20Temur%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2sub!4v1700000000000"
  },
  {
    id: "oromgoh-5",
    name: "Elegant Auto studio 5-filiali",
    address: "Oromgoh kalsavoyga yetmasdan axsikent hoteli orqasida",
    phone: "+998 (99) 555-55-55",
    phoneRaw: "+998995555555",
    hours: "09:00 - 20:00 (Dushanba - Shanba)",
    coordinates: { lat: 41.2227, lng: 69.2144 },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.123456789012!2d69.2144!3d41.2227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a87654321ba%3A0xfedcba987654321!2sYangi%20Sergeli%20Street%2C%20Tashkent!5e0!3m2!1sen!2sub!4v1700000000000"
  },
  {
    id: "sergeli-6",
    name: "Elegant Auto studio 6-filiali",
    address: "eski sobiq pitlitka parvina oshxonasi yonida moljal: Turon universiteti oldida",
    phone: "+998 (99) 555-55-55",
    phoneRaw: "+998995555555",
    hours: "09:00 - 20:00 (Dushanba - Shanba)",
    coordinates: { lat: 41.2227, lng: 69.2144 },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.123456789012!2d69.2144!3d41.2227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a87654321ba%3A0xfedcba987654321!2sYangi%20Sergeli%20Street%2C%20Tashkent!5e0!3m2!1sen!2sub!4v1700000000000"
  }
];

export default function HomePage() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Car Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-[1.03]"
          style={{ 
            backgroundImage: "url('/background.png')",
          }}
        >
          {/* Deep dark gradient overlay transitioning to white */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-none">
              Elegant Auto Studio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#00c2ff]">
                Xizmatlari
              </span>
            </h1>

            <p className="text-sm sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Avtomobilingiz uchun premium darajadagi parvarish. Ko'zgudek yorqin jilo, ilg'or himoya va shovqinsiz, tinch haydash davomida mislsiz qulaylikni his eting.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0066cc] to-[#0099ff] hover:from-[#0099ff] hover:to-[#0066cc] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-[0_4px_20px_rgba(0,102,204,0.2)]"
              >
                <span>Xizmatlarni ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-background z-10 border-t border-gray-100">
        {/* Glow accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 sm:mb-20">
           
            <p className="text-2xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Bizning  Xizmatlarimiz
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0066cc] to-[#0099ff] mx-auto rounded-full" />
          </div>

          {/* Cards Grid: 2 columns on mobile, 4 columns on large screens */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {SERVICES.map((service, idx) => {
              const ServiceIcon = IconMap[service.iconName] || Sparkles;

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group relative flex flex-col justify-between h-auto rounded-2xl sm:rounded-3xl overflow-hidden glass-panel glass-panel-hover pb-1"
                >
                  {/* Card Background image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.image}
                      alt={service.uzName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-5 group-hover:opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent" />
                  </div>

                  {/* Top content */}
                  <div className="relative z-10 p-3 sm:p-8 space-y-2 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-100/85 border border-gray-200/40 flex items-center justify-center text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-all duration-300">
                        <ServiceIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-xl font-bold text-gray-900 group-hover:text-[#0066cc] transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-[9px] sm:text-xs text-gray-600 leading-relaxed font-light line-clamp-3 sm:line-clamp-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="relative z-10 p-3 sm:p-8 pt-0 mt-6 sm:mt-10 flex items-center justify-between text-[8px] sm:text-xs text-gray-500 group-hover:text-[#0066cc] transition-colors">
                    <span className="font-semibold tracking-wider uppercase text-[8px] sm:text-[10px]">Paketni sozlash</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100/80 border border-gray-200/50 flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Premium glowing hover border */}
                  <div className="absolute inset-0 border border-transparent rounded-2xl sm:rounded-3xl group-hover:border-[#0066cc]/20 pointer-events-none transition-all duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BRANCH LOCATIONS (FILIALLAR) SECTION */}
      <section id="locations" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gray-50/50 border-t border-gray-100 z-10">
        {/* Glow accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 sm:mb-20">
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#0066cc]">
              Biz sizga yaqinmiz
            </h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Namangan bo'ylab {BRANCHES.length} ta Filialimiz
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0066cc] to-[#0099ff] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto mt-4">
              Markazlarimiz zamonaviy jihozlar, professional usta jamoasi hamda to'liq sifat nazorati bilan xizmatingizga tayyor. O'zingizga qulay filialni tanlang.
            </p>
          </div>

          {/* Locations Cards Container */}
          <div className="flex flex-col gap-8 lg:flex-row lg:overflow-x-auto lg:pb-6 lg:snap-x lg:snap-mandatory scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {BRANCHES.map((branch) => (
              <div 
                key={branch.id}
                className="relative flex flex-col justify-between rounded-3xl glass-panel border border-gray-200/50 p-6 hover:border-[#0066cc]/30 transition-all duration-500 w-full lg:w-[380px] lg:shrink-0 lg:snap-start"
              >
                <div className="space-y-6">
                  {/* Branch Title & details */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <Compass className="w-5 h-5 text-[#0066cc]" />
                      <span>{branch.name}</span>
                    </h3>
                    
                    <div className="space-y-2.5 text-xs text-gray-600 font-light">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Google Map Frame */}
                  <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-250/50 relative group shadow-inner">
                    <iframe
                      src={branch.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${branch.name} Xaritasi`}
                    />
                  </div>

                  {/* Phone Call Link */}
                  <a
                    href={`tel:${branch.phoneRaw}`}
                    className="flex items-center space-x-3 bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 px-4 py-3 rounded-2xl text-xs text-gray-700 justify-center font-bold transition-all transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#0066cc] animate-bounce" />
                    <span>{branch.phone}</span>
                  </a>
                </div>

                {/* Maps Direct Shortcuts */}
                <div className="mt-8 pt-6 border-t border-gray-150 space-y-3.5">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Manzilga navigatsiya qilish:</p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* Google Maps */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 bg-white hover:bg-emerald-50/20 border border-gray-200/85 hover:border-emerald-500/35 py-2.5 rounded-xl text-[9px] font-bold text-gray-600 hover:text-emerald-600 transition-all duration-300 shadow-sm"
                    >
                      <img
                        src="/google-maps.svg"
                        alt="Google Maps"
                        className="w-4 h-4 shrink-0 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                      <span>Google</span>
                    </a>

                    {/* Yandex Maps */}
                    <a
                      href={`https://yandex.com/maps/?text=${branch.coordinates.lat},${branch.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 bg-white hover:bg-red-50/20 border border-gray-200/85 hover:border-red-500/35 py-2.5 rounded-xl text-[9px] font-bold text-gray-600 hover:text-red-600 transition-all duration-300 shadow-sm"
                    >
                      <img
                        src="/yandex-maps.svg"
                        alt="Yandex Maps"
                        className="w-4 h-4 shrink-0 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                      <span>Yandex</span>
                    </a>

                    {/* Apple Maps */}
                    <a
                      href={`https://maps.apple.com/?q=${encodeURIComponent(branch.name)}&ll=${branch.coordinates.lat},${branch.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 bg-white hover:bg-gray-50/60 border border-gray-200/85 hover:border-gray-800/30 py-2.5 rounded-xl text-[9px] font-bold text-gray-600 hover:text-gray-900 transition-all duration-300 shadow-sm"
                    >
                      <img
                        src="/apple-maps.svg"
                        alt="Apple Maps"
                        className="w-4 h-4 shrink-0 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                      <span>Apple</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLOATING BRAND SOCIAL BAR (STICKY - ZERO OVERLAP WITH RIGHT SIDE) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3.5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6">
        {/* Telegram */}
        <a
          href="https://t.me/auto_studio_elegant"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-11 h-11 rounded-full bg-[#0088cc] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-115 hover:shadow-[0_4px_15px_rgba(0,136,204,0.4)]"
          title="Telegram Kanalimiz"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.33 3.68-1.52 4.44-1.78 4.94-1.79.11 0 .36.03.52.16.14.12.18.28.2.44-.02.07 0 .2-.02.26z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/elegant_auto.studio?igsh=MzRlODBiNWFlZA=="
          target="_blank"
          rel="noopener noreferrer"
          className="group w-11 h-11 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-115 hover:shadow-[0_4px_15px_rgba(238,42,123,0.4)]"
          title="Instagram Sahifamiz"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none transition-transform duration-300 group-hover:scale-110" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <path d="M17.5 6.5 H17.51" strokeWidth="3.2" strokeLinecap="round"></path>
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@elegantautostudio4141?si=E0ndlDmyFJNqhXIq"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-11 h-11 rounded-full bg-[#ff0000] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-115 hover:shadow-[0_4px_15px_rgba(255,0,0,0.4)]"
          title="YouTube Kanalimiz"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-6">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
