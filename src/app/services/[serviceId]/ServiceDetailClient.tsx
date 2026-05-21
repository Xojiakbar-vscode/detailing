"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Heart, 
  ArrowLeft, 
  Sparkles, 
  Wind, 
  VolumeX, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sliders, 
  ArrowRight,
  Gauge
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Service, VEHICLES } from "@/data";

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

interface ClientProps {
  service: Service;
}

type CategoryFilter = "all" | "sedan" | "suv" | "crossover" | "hatchback" | "coupe";

export default function ServiceDetailClient({ service }: ClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const ServiceIcon = IconMap[service.iconName] || Sparkles;

  // Toggle favorite car
  const toggleFavorite = (e: React.MouseEvent, vehicleId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.includes(vehicleId)) {
      setFavorites(favorites.filter(id => id !== vehicleId));
    } else {
      setFavorites([...favorites, vehicleId]);
    }
  };

  // Filter vehicles by search & category
  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || vehicle.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList: { name: string; value: CategoryFilter }[] = [
    { name: "Barcha avtomobillar", value: "all" },
    { name: "Sedanlar", value: "sedan" },
    { name: "Yo'ltanlamaslar (SUV)", value: "suv" },
    { name: "Krossoverlar", value: "crossover" },
    { name: "Xetchbeklar", value: "hatchback" },
    { name: "Kupelar", value: "coupe" },
  ];

  // Helper for UZS pricing format
  const formatUZS = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6">
      {/* Glow background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button & Intro Title */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#00c2ff] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xizmatlarga Qaytish</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/5 border border-white/5 p-6 sm:p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
            {/* Embedded glowing light */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 max-w-3xl relative z-10">
              <div className="inline-flex items-center space-x-3 text-[#00c2ff]">
                <ServiceIcon className="w-6 h-6 animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-[0.2em]">{service.uzName}</span>
              </div>
              <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.uzName} <span className="text-[#00c2ff]">Narxlari</span>
              </h1>
              <p className="text-xs sm:text-base text-gray-400 font-light leading-relaxed">
                {service.description} Avtomobilingiz rusumini quyida tanlab, individual detailing paketlarini o'zingizga moslab sozlang va aniq narxlarni bilib oling.
              </p>
            </div>
            
            {/* Quick trust metrics */}
            <div className="shrink-0 flex flex-col justify-center space-y-3 relative z-10">
              <div className="bg-black/30 px-6 py-4 rounded-2xl border border-white/5 text-center">
                <p className="text-xl sm:text-2xl font-black text-white">4.9 ★</p>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-1">O'rtacha Baho</p>
              </div>
              <div className="bg-black/30 px-6 py-4 rounded-2xl border border-white/5 text-center">
                <p className="text-xl sm:text-2xl font-black text-[#00c2ff]">100%</p>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-1">Sifat Kafolati</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sticky Filter Panel */}
        <div className="sticky top-[80px] z-30 bg-[#050505]/80 backdrop-blur-md border border-white/5 p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg transition-all duration-300">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Avtomobil modelini qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 focus:border-[#00c2ff]/50 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {categoriesList.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#0070f3]/10 text-[#00c2ff] border-[#00c2ff]/30 shadow-[0_0_10px_rgba(0,194,255,0.15)]"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid: 2 columns on mobile side-by-side, 3 columns on large screens */}
        <AnimatePresence mode="popLayout">
          {filteredVehicles.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8"
            >
              {filteredVehicles.map((vehicle) => {
                const isFav = favorites.includes(vehicle.id);
                const vehiclePrice = vehicle.basePrices[service.id] || 0;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={vehicle.id}
                  >
                    <Link
                      href={`/services/${service.id}/${vehicle.id}`}
                      className="group relative flex flex-col h-[260px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel glass-panel-hover"
                    >
                      {/* Vehicle Image */}
                      <div className="relative h-24 sm:h-48 w-full overflow-hidden bg-black/40">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Shadow Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] to-transparent" />

                        {/* Favorite Heart Toggler */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(e, vehicle.id)}
                          className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-gray-400 hover:text-white cursor-pointer"
                          aria-label="Sevimlilarga qo'shish"
                        >
                          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                        </button>

                        {/* Category Badge */}
                        <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 inline-block bg-white/5 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-gray-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          {vehicle.category}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="flex-grow p-3.5 sm:p-6 flex flex-col justify-between">
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-xs sm:text-xl font-bold text-white group-hover:text-[#00c2ff] transition-colors truncate">
                            {vehicle.name}
                          </h3>
                          <p className="text-[8px] sm:text-[10px] text-gray-500 font-light flex items-center space-x-1">
                            <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00c2ff] shrink-0" />
                            <span className="truncate">O'lchamlarga mos aniq konfiguratsiya</span>
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-3 sm:pt-4 flex items-center justify-between">
                          <div>
                            <p className="text-[7px] sm:text-[9px] uppercase tracking-wider text-gray-500 font-bold">Boshlang'ich narxi</p>
                            <p className="text-xs sm:text-lg font-black text-[#00c2ff] mt-0.5 whitespace-nowrap">
                              {formatUZS(vehiclePrice)}
                            </p>
                          </div>
                          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0 ml-1">
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Accent glow border */}
                      <div className="absolute inset-0 border border-transparent rounded-2xl sm:rounded-3xl group-hover:border-[#00c2ff]/20 pointer-events-none transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm"
            >
              <p className="text-gray-400 font-light text-base">Sizning so'rovingizga mos keladigan avtomobil topilmadi.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-4 text-xs font-bold text-[#00c2ff] hover:underline focus:outline-none cursor-pointer"
              >
                Filtrlarni tozalash
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
