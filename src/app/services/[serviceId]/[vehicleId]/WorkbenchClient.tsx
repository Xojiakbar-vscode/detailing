"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  Send, 
  Phone, 
  Sparkles, 
  Info,
  Layers,
  Shield,
  HelpCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Service, Vehicle, ANATOMY_PARTS, AnatomyPart } from "@/data";

const getServiceBullets = (serviceId: string, tier: "standard" | "premium") => {
  if (serviceId === "shumka") {
    return tier === "standard" 
      ? [
          "Eshiklar (3 qavatli shovqin izolyatsiyasi)",
          "Salon poli (Vibratsiyani kamaytirish va shovqin to'sig'i)",
          "Bagaj qismi va g'ildirak arkalari izolyatsiyasi"
        ]
      : [
          "Eshiklar, pol va bagaj to'liq izolyatsiyasi",
          "Tom qismi maxsus yengil ovoz yutuvchi qoplama",
          "Kapot qismi issiqlik va shovqin qalqoni",
          "G'ildirak arkalari tashqi shovqin blokirovkasi"
        ];
  }
  
  if (serviceId === "polishing-ceramic") {
    return tier === "standard"
      ? [
          "Kuzov yuzasini tayyorlash va chuqur tozalash",
          "1 bosqichli professional jilo berish (polirovka)",
          "1 qavatli premium 9H keramika himoya qoplamasi",
          "1 yillik rasmiy sifat kafolati"
        ]
      : [
          "Ko'p bosqichli chuqur abraziv polirovka",
          "2 qavatli premium 9H+ gidrofob keramika qoplamasi",
          "G'ildirak disklari va oynalarni to'liq himoyalash",
          "3 yillik rasmiy sifat kafolati"
        ];
  }

  if (serviceId === "ximchiska") {
    return tier === "standard"
      ? [
          "Salon yuzalarini to'liq quruq kimyoviy tozalash",
          "Ekologik toza va xavfsiz vositalar qo'llanilishi",
          "Plastik va rezina qismlarga maxsus ishlov berish",
          "Salonni mukammal quritish va hidlarni yo'qotish"
        ]
      : [
          "O'rindiq va qismlarni yechish orqali chuqur tozalash",
          "Ozon generatori yordamida bakteriyalarni yo'qotish",
          "Teri detallarini premium kremlar bilan oziqlantirish",
          "Shisha va havo tizimlarini to'liq dezinfeksiya qilish"
        ];
  }

  if (serviceId === "tonirovka") {
    return tier === "standard"
      ? [
          "Nano-keramik plyonka yordamida oyna qoraytirish",
          "99% gacha zararli ultrabinafsha (UV) nurlardan himoya",
          "Tungi haydash uchun yuqori shaffoflik va qulaylik",
          "1 yillik sifat kafolati"
        ]
      : [
          "Premium atermal plyonka (quyosh issiqligini 95% gacha qaytarish)",
          "Old oyna va yon oynalarni to'liq atermal himoyalash",
          "Maksimal issiqlik izolyatsiyasi va salqinlik",
          "Muddatsiz kafolat va yuqori estetika"
        ];
  }

  if (serviceId === "kuzov-himoyasi") {
    return tier === "standard"
      ? [
          "Avtomobil old qismini himoya qilish (Bumper, faralar, kapot)",
          "Premium o'z-o'zini tiklovchi (self-healing) PPF plyonka",
          "Tosh, chiziq va mayda zarbalardan mustahkam qalqon",
          "5 yillik rasmiy kafolat"
        ]
      : [
          "Butun kuzov yuzasini to'liq PPF zirhli plyonka bilan qoplash",
          "190 mikron qalinlikdagi o'z-o'zini tiklovchi premium plyonka",
          "Avtomobil kuzovining 100% kafolatlangan himoyasi",
          "7 dan 10 yilgacha rasmiy kafolat"
        ];
  }

  if (serviceId === "salon-detailing") {
    return tier === "standard"
      ? [
          "Salon plastik va yaltiroq qismlarini himoyalash",
          "Teri qismlarini tozalash va maxsus konditsionerlash",
          "Ekranlar va nozik detallarni jilolash",
          "Professional darajadagi ichki parvarish"
        ]
      : [
          "Dinamik premium Ambient Light yorug'lik o'rnatish",
          "Teri va alkantara qismlarni keramika bilan himoyalash",
          "Porloq qora (piano black) detallarni PPF bilan qoplash",
          "Maksimal darajadagi premium interyer estetikasi"
        ];
  }

  if (serviceId === "motor-cleaning") {
    return tier === "standard"
      ? [
          "Dvigatel bo'lmasini maxsus dielektrik gellar bilan yuvish",
          "Bug' generatori yordamida 100% xavfsiz tozalash",
          "Plastik va shlanglarni gidrofob himoya qoplash",
          "Xavfsiz va kafolatlangan ishga tushirish"
        ]
      : [
          "Dvigatel osti qismini va radiatorlarni chuqur yuvish",
          "Barcha simlar va elektr ulagichlarini maxsus laklash",
          "Dvigatel bo'lmasini mukammal ko'rgazma darajasiga keltirish",
          "Kengaytirilgan xavfsizlik va uzoq muddatli kafolat"
        ];
  }

  if (serviceId === "anti-chrome") {
    return tier === "standard"
      ? [
          "Xrom detallarni porloq qora vinil plyonka bilan qoplash",
          "Premium sifatli quyma (cast) vinil materiallari",
          "Barcha ko'rinadigan xrom chiziqlarni to'liq yashirish",
          "Zamonaviy va sportcha tashqi ko'rinish"
        ]
      : [
          "Barcha xrom detallar, logotiplar va yozuvlarni qoraytirish",
          "Old panjara va yozuvlarni maxsus bo'yoq bilan qoplash",
          "Uzoq muddatli chidamlilik va chizilmaslik kafolati",
          "Maksimal 'Shadow Line' yoki 'Night Package' ko'rinishi"
        ];
  }

  return [];
};

interface WorkbenchClientProps {
  service: Service;
  vehicle: Vehicle;
}

export default function WorkbenchClient({ service, vehicle }: WorkbenchClientProps) {
  // Active package selection
  const [selectedTier, setSelectedTier] = useState<"standard" | "premium">("standard");
  
  // Custom configured parts (starts with standard parts preselected)
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  
  // Side modal / details sheet for clicked anatomy part
  const [activePartId, setActivePartId] = useState<string | null>(null);
  
  // User booking info
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const isShumka = service.id === "shumka";

  // Scale base prices relative to vehicle class
  const vehicleFactor = vehicle.id === "tahoe" || vehicle.id === "bmw-x5" ? 1.8 : 
                        vehicle.id === "porsche-911" ? 1.5 : 1.0;

  // Base Package prices
  const standardBase = isShumka ? Math.round(4000000 * vehicleFactor) : Math.round((vehicle.basePrices[service.id] || 0));
  const premiumBase = isShumka ? Math.round(7000000 * vehicleFactor) : Math.round((vehicle.basePrices[service.id] || 0) * 1.5);

  // Set default active parts based on tier
  useEffect(() => {
    if (!isShumka) {
      setSelectedParts([]);
      return;
    }
    if (selectedTier === "standard") {
      // Standard includes: Doors, Floor, Trunk
      setSelectedParts(["doors", "floor", "trunk"]);
    } else {
      // Premium includes: Doors, Floor, Trunk, Roof, Hood, Arches
      setSelectedParts(["doors", "floor", "trunk", "roof", "hood", "arches"]);
    }
  }, [selectedTier, isShumka]);

  // Handle manual part toggling from anatomy customizer
  const togglePart = (partId: string) => {
    if (selectedParts.includes(partId)) {
      setSelectedParts(selectedParts.filter((id) => id !== partId));
    } else {
      setSelectedParts([...selectedParts, partId]);
    }
  };

  // Calculate live running total
  const getRunningTotal = () => {
    if (isShumka) {
      // Shumka price is the sum of selected custom parts * vehicle factor
      let sum = 0;
      ANATOMY_PARTS.forEach((part) => {
        if (selectedParts.includes(part.id)) {
          sum += Math.round(part.price * vehicleFactor);
        }
      });
      return sum;
    } else {
      // For other services, standard = base, premium = 1.5 * base
      return selectedTier === "standard" ? standardBase : premiumBase;
    }
  };

  // Helper for UZS currency formatting
  const formatUZS = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  // Build and execute Telegram checkout
  const handleTelegramCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    const partsList = ANATOMY_PARTS
      .filter((part) => selectedParts.includes(part.id))
      .map((part) => `• ${part.uzName} (+${formatUZS(Math.round(part.price * vehicleFactor))})`)
      .join("\n");

    const message = `✨ APEX Detailing Buyurtmasi ✨\n\n` +
                    `👤 Mijoz: ${clientName || "Ko'rsatilmagan"}\n` +
                    `📞 Telefon: ${clientPhone || "Ko'rsatilmagan"}\n` +
                    `🛠️ Xizmat turi: ${service.uzName}\n` +
                    `🚗 Avtomobil: ${vehicle.name}\n` +
                    `📦 Paket turi: ${selectedTier === "standard" ? "STANDARD" : "PREMIUM"}\n` +
                    (isShumka ? `\n🔧 Izolyatsiya qismlari:\n${partsList}\n` : "") +
                    `\n💰 Jami hisoblangan narx: ${formatUZS(getRunningTotal())}\n\n` +
                    `Mening buyurtmamni tasdiqlang va detailing uchun vaqt belgilang! Rahmat.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://t.me/apex_detailing_demo?text=${encoded}`, "_blank");
  };

  const activePart = ANATOMY_PARTS.find(p => p.id === activePartId);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 bg-[#050505] text-gray-100">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation / Breadcrumb */}
        <div className="space-y-4">
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#00c2ff] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>📂 {service.uzName} bo'limiga qaytish</span>
          </Link>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {vehicle.name}
            </h1>
            <span className="text-xl sm:text-2xl text-gray-500 font-light">
              / {service.uzName} konstruktori
            </span>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Center Work Area: Packages & Anatomy */}
          <div className="lg:col-span-8 space-y-12">
            {/* Packages Grid */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xs uppercase font-bold tracking-widest text-[#00c2ff]">
                  {isShumka ? "1-bosqich: Asosiy paketni tanlang" : "Asosiy xizmat paketini tanlang"}
                </h2>
                {!isShumka && (
                  <p className="text-xs text-gray-500 mt-1">
                    Ushbu xizmat avtomobilingiz uchun to'liq (kompleks) holda amalga oshiriladi.
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Package Card */}
                <div
                  onClick={() => setSelectedTier("standard")}
                  className={`relative flex flex-col justify-between p-8 rounded-3xl cursor-pointer glass-panel transition-all duration-300 ${
                    selectedTier === "standard"
                      ? "border-[#0070f3]/50 bg-[#0070f3]/5 shadow-[0_0_20px_rgba(0,112,243,0.2)]"
                      : "hover:border-white/10"
                  }`}
                >
                  {selectedTier === "standard" && (
                    <div className="absolute top-4 right-4 bg-[#0070f3] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                      Faol
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">Standard Paket</h3>
                      <p className="text-xs text-gray-500 mt-1">Mukammal sifat va zaruriy elementlar</p>
                    </div>

                    <div className="text-3xl font-black text-[#00c2ff]">
                      {formatUZS(standardBase)}
                    </div>

                    <ul className="space-y-3.5 border-t border-white/5 pt-6 text-sm text-gray-400">
                      {getServiceBullets(service.id, "standard").map((bullet, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Premium Package Card */}
                <div
                  onClick={() => setSelectedTier("premium")}
                  className={`relative flex flex-col justify-between p-8 rounded-3xl cursor-pointer glass-panel transition-all duration-300 relative overflow-hidden ${
                    selectedTier === "premium"
                      ? "border-[#00c2ff]/60 bg-[#00c2ff]/5 shadow-[0_0_25px_rgba(0,194,255,0.25)]"
                      : "hover:border-white/10"
                  }`}
                >
                  {/* Glowing light borders */}
                  <div className={`absolute inset-0 border border-[#00c2ff]/20 animate-glow-pulse pointer-events-none rounded-3xl ${selectedTier === "premium" ? "opacity-100" : "opacity-0"}`} />

                  {selectedTier === "premium" && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0070f3] to-[#00c2ff] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md border border-white/10">
                      Eng zo'r tanlov
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">Premium Paket</h3>
                      <p className="text-xs text-gray-500 mt-1">To'liq va maksimal darajadagi natija</p>
                    </div>

                    <div className="text-3xl font-black text-[#00c2ff]">
                      {formatUZS(premiumBase)}
                    </div>

                    <ul className="space-y-3.5 border-t border-white/5 pt-6 text-sm text-gray-400">
                      {getServiceBullets(service.id, "premium").map((bullet, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Check className={`w-4 h-4 shrink-0 ${service.id === "shumka" ? "text-[#a855f7]" : "text-[#00c2ff]"}`} />
                          <span className="text-white font-medium">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Anatomy section */}
            {isShumka && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-xs uppercase font-bold tracking-widest text-[#00c2ff]">
                      2-bosqich: Interaktiv chizma va qo'shimcha hududlar
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Mashina chizmasidagi hududlarni bosib, xohlagan qismlarni qo'shishingiz yoki olib tashlashingiz mumkin.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0070f3]" />
                      <span>Kiritilgan</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00c2ff] animate-pulse" />
                      <span>Qo'shilgan</span>
                    </div>
                  </div>
                </div>

                {/* Blueprint Layout Panel */}
                <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] text-gray-500 font-semibold bg-black/40 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <Info className="w-3.5 h-3.5 text-[#00c2ff]" />
                    <span>CAD chizma: kuzov izolyatsiyasi konfiguratsiyasi</span>
                  </div>

                  {/* Left/Right controls (quick buttons if user doesn't want to use SVG) */}
                  <div className="grid grid-cols-2 gap-3 w-full md:w-56 shrink-0 relative z-10 order-2 md:order-1">
                    {ANATOMY_PARTS.map((part) => {
                      const isSelected = selectedParts.includes(part.id);
                      return (
                        <button
                          key={part.id}
                          onClick={() => {
                            togglePart(part.id);
                            setActivePartId(part.id);
                          }}
                          className={`text-left p-3 rounded-xl border text-xs flex flex-col justify-between h-20 transition-all duration-200 ${
                            isSelected
                              ? "bg-white/10 text-white border-[#00c2ff] shadow-[0_0_8px_rgba(0,194,255,0.15)]"
                              : "bg-white/5 text-gray-500 border-white/5 hover:border-white/10 hover:text-gray-300"
                          }`}
                        >
                          <span className="font-bold">{part.uzName}</span>
                          <span className="text-[10px] text-[#00c2ff]">+{formatUZS(Math.round(part.price * vehicleFactor))}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SVG Blueprint vector */}
                  <div className="w-64 h-96 relative z-10 order-1 md:order-2">
                    <svg
                      viewBox="0 0 400 600"
                      className="w-full h-full text-gray-800 drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                    >
                      {/* Background grid indicators */}
                      <line x1="50" y1="0" x2="50" y2="600" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <line x1="200" y1="0" x2="200" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="350" y1="0" x2="350" y2="600" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="450" x2="400" y2="450" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                      {/* Wheel arch Front Left */}
                      <g 
                        onClick={() => { togglePart("arches"); setActivePartId("arches"); }}
                        className="cursor-pointer"
                      >
                        <rect x="75" y="110" width="30" height="60" rx="4" fill="#0d0d0d" stroke={selectedParts.includes("arches") ? "#00c2ff" : "#262626"} strokeWidth="2" className="transition-all" />
                        <circle cx="90" cy="140" r="10" fill={selectedParts.includes("arches") ? "rgba(0,194,255,0.1)" : "transparent"} />
                      </g>

                      {/* Wheel arch Front Right */}
                      <g 
                        onClick={() => { togglePart("arches"); setActivePartId("arches"); }}
                        className="cursor-pointer"
                      >
                        <rect x="295" y="110" width="30" height="60" rx="4" fill="#0d0d0d" stroke={selectedParts.includes("arches") ? "#00c2ff" : "#262626"} strokeWidth="2" className="transition-all" />
                        <circle cx="310" cy="140" r="10" fill={selectedParts.includes("arches") ? "rgba(0,194,255,0.1)" : "transparent"} />
                      </g>

                      {/* Wheel arch Back Left */}
                      <g 
                        onClick={() => { togglePart("arches"); setActivePartId("arches"); }}
                        className="cursor-pointer"
                      >
                        <rect x="75" y="430" width="30" height="60" rx="4" fill="#0d0d0d" stroke={selectedParts.includes("arches") ? "#00c2ff" : "#262626"} strokeWidth="2" className="transition-all" />
                        <circle cx="90" cy="460" r="10" fill={selectedParts.includes("arches") ? "rgba(0,194,255,0.1)" : "transparent"} />
                      </g>

                      {/* Wheel arch Back Right */}
                      <g 
                        onClick={() => { togglePart("arches"); setActivePartId("arches"); }}
                        className="cursor-pointer"
                      >
                        <rect x="295" y="430" width="30" height="60" rx="4" fill="#0d0d0d" stroke={selectedParts.includes("arches") ? "#00c2ff" : "#262626"} strokeWidth="2" className="transition-all" />
                        <circle cx="310" cy="460" r="10" fill={selectedParts.includes("arches") ? "rgba(0,194,255,0.1)" : "transparent"} />
                      </g>

                      {/* Main Body Chassis Outer */}
                      <path
                        d="M 130 60 Q 200 40 270 60 L 290 150 L 310 180 L 310 420 L 290 450 L 270 540 Q 200 560 130 540 L 110 450 L 90 420 L 90 180 L 110 150 Z"
                        fill="rgba(255,255,255,0.01)"
                        stroke="#404040"
                        strokeWidth="2"
                      />

                      {/* HOOD zone */}
                      <path
                        d="M 135 70 Q 200 55 265 70 L 280 145 L 120 145 Z"
                        fill={selectedParts.includes("hood") ? "rgba(0,112,243,0.15)" : "transparent"}
                        stroke={selectedParts.includes("hood") ? "#0070f3" : "#262626"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-blue-500/10"
                        onClick={() => { togglePart("hood"); setActivePartId("hood"); }}
                      />

                      {/* CABIN FLOOR zone */}
                      <rect
                        x="115"
                        y="160"
                        width="170"
                        height="260"
                        fill={selectedParts.includes("floor") ? "rgba(0,194,255,0.08)" : "transparent"}
                        stroke={selectedParts.includes("floor") ? "#00c2ff" : "#262626"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-cyan-500/10"
                        onClick={() => { togglePart("floor"); setActivePartId("floor"); }}
                      />

                      {/* ROOF overlay on top of Floor */}
                      <rect
                        x="130"
                        y="210"
                        width="140"
                        height="160"
                        rx="8"
                        fill={selectedParts.includes("roof") ? "rgba(168,85,247,0.15)" : "transparent"}
                        stroke={selectedParts.includes("roof") ? "#a855f7" : "#404040"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-purple-500/10"
                        onClick={() => { togglePart("roof"); setActivePartId("roof"); }}
                      />

                      {/* DOORS left */}
                      <path
                        d="M 90 185 L 110 185 L 110 300 L 90 300 Z M 90 305 L 110 305 L 110 415 L 90 415 Z"
                        fill={selectedParts.includes("doors") ? "rgba(16,185,129,0.15)" : "transparent"}
                        stroke={selectedParts.includes("doors") ? "#10b981" : "#262626"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-emerald-500/10"
                        onClick={() => { togglePart("doors"); setActivePartId("doors"); }}
                      />

                      {/* DOORS right */}
                      <path
                        d="M 290 185 L 310 185 L 310 300 L 290 300 Z M 290 305 L 310 305 L 310 415 L 290 415 Z"
                        fill={selectedParts.includes("doors") ? "rgba(16,185,129,0.15)" : "transparent"}
                        stroke={selectedParts.includes("doors") ? "#10b981" : "#262626"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-emerald-500/10"
                        onClick={() => { togglePart("doors"); setActivePartId("doors"); }}
                      />

                      {/* TRUNK zone */}
                      <path
                        d="M 125 435 L 275 435 L 265 530 Q 200 545 135 530 Z"
                        fill={selectedParts.includes("trunk") ? "rgba(239,68,68,0.12)" : "transparent"}
                        stroke={selectedParts.includes("trunk") ? "#ef4444" : "#262626"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-red-500/10"
                        onClick={() => { togglePart("trunk"); setActivePartId("trunk"); }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Sticky Console: Price Breakdown & Intake Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-[96px] space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-[#00c2ff]/15 relative">
              <div className="absolute inset-0 rounded-3xl border border-[#00c2ff]/10 animate-glow-pulse pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-6">Buyurtma tafsilotlari</h3>

              <div className="space-y-6">
                {/* Active additions breakdown */}
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-4 text-sm text-gray-400">
                  <div className="flex justify-between text-xs text-gray-500 uppercase font-semibold">
                    <span>Xizmat / Hudud</span>
                    <span>Narxi</span>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {isShumka ? (
                      ANATOMY_PARTS.map((part) => {
                        const isSelected = selectedParts.includes(part.id);
                        if (!isSelected) return null;
                        return (
                          <div key={part.id} className="flex justify-between items-center text-white">
                            <span>{part.uzName}</span>
                            <span className="font-semibold text-xs">{formatUZS(Math.round(part.price * vehicleFactor))}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-between items-center text-white">
                        <span>{selectedTier === "standard" ? "Standard to'liq paket" : "Premium to'liq paket"}</span>
                        <span className="font-semibold text-xs">{formatUZS(getRunningTotal())}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
                    <span className="text-gray-400 font-bold text-xs uppercase">Jami:</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00c2ff]">
                      {formatUZS(getRunningTotal())}
                    </span>
                  </div>
                </div>

                {/* Intake Form */}
                <form onSubmit={handleTelegramCheckout} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="user-name" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Sizning ismingiz</label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Toshpo'latov Sanjar"
                      className="w-full bg-white/5 border border-white/5 focus:border-[#00c2ff] text-white px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="user-phone" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Telefon raqamingiz</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                      <input
                        id="user-phone"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
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
                    <span>Telegram orqali buyurtma berish</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Side Drawer / Slide Sheet for Anatomy Parts Info */}
      <AnimatePresence>
        {activePartId && activePart && (
          <>
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePartId(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Side sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[460px] bg-[#0c0c0e] border-l border-white/5 shadow-2xl p-8 sm:p-10 flex flex-col justify-between"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#00c2ff]">Qism tafsilotlari</span>
                    <h3 className="text-2xl font-black text-white">{activePart.uzName}</h3>
                  </div>
                  <button
                    onClick={() => setActivePartId(null)}
                    className="p-2 text-gray-500 hover:text-white rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cost card */}
                <div className="bg-[#121214] p-6 rounded-2xl border border-white/5 flex items-baseline justify-between">
                  <span className="text-xs uppercase font-bold text-gray-500">Individual o'rnatish narxi</span>
                  <span className="text-xl font-extrabold text-[#00c2ff]">{formatUZS(Math.round(activePart.price * vehicleFactor))}</span>
                </div>

                {/* Specs text */}
                <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-light">
                  <p>{activePart.description}</p>
                  
                  <div className="border-t border-white/5 pt-6 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-white tracking-wider">O'rnatish standartlari:</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Sirtni to'liq yog'sizlantirish va tayyorlash</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Premium ComfortMat ko'p qavatli shovqin to'siqlari</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Issiqlik feni va maxsus rolik yordamida to'liq presslash</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Toggle control button inside drawer */}
              <button
                type="button"
                onClick={() => {
                  togglePart(activePart.id);
                  setActivePartId(null);
                }}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  selectedParts.includes(activePart.id)
                    ? "bg-red-600/10 text-red-500 hover:bg-red-600/20 border border-red-500/20"
                    : "bg-gradient-to-r from-[#0070f3] to-[#00c2ff] hover:from-[#00c2ff] hover:to-[#0070f3] text-white"
                }`}
              >
                {selectedParts.includes(activePart.id) ? "Konfiguratsiyadan olib tashlash" : "Konfiguratsiyaga qo'shish"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
