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
          "To'liq salon (Eshiklar, pol, bagaj, tom, kapot, arkalar)",
          "ComfortMat Standard vibro-damping va shovqin yutuvchi materiallari",
          "3 qavatli izolyatsiya texnologiyasi",
          "Og'irlik va samaradorlikning optimal balansi"
        ]
      : [
          "To'liq salon (Eshiklar, pol, bagaj, tom, kapot, arkalar)",
          "ComfortMat Premium ko'p qavatli yengil materiallar (Extreme/Viper)",
          "4 qavatgacha kengaytirilgan professional izolyatsiya",
          "Maksimal shovqin va issiqlik himoyasi (95% gacha samaradorlik)"
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

  // Material factor: 1.7 multiplier for premium ComfortMat Extreme/Viper series
  const materialFactor = isShumka && selectedTier === "premium" ? 1.7 : 1.0;

  // Base Package prices (Sum of all parts * vehicleFactor * materialFactor)
  const totalAnatomyBase = ANATOMY_PARTS.reduce((acc, part) => acc + part.price, 0);
  const standardBase = isShumka 
    ? Math.round(totalAnatomyBase * vehicleFactor) 
    : Math.round((vehicle.basePrices[service.id] || 0));
  const premiumBase = isShumka 
    ? Math.round(totalAnatomyBase * vehicleFactor * 1.7) 
    : Math.round((vehicle.basePrices[service.id] || 0) * 1.5);

  // Set default active parts (Standard and Premium both include all parts by default)
  useEffect(() => {
    if (!isShumka) {
      setSelectedParts([]);
      return;
    }
    setSelectedParts(["doors", "floor", "trunk", "roof", "hood", "arches"]);
  }, [isShumka]);

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
      // Shumka price is the sum of selected custom parts * vehicle factor * material factor
      let sum = 0;
      ANATOMY_PARTS.forEach((part) => {
        if (selectedParts.includes(part.id)) {
          sum += Math.round(part.price * vehicleFactor * materialFactor);
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
      .map((part) => `• ${part.uzName} (+${formatUZS(Math.round(part.price * vehicleFactor * materialFactor))})`)
      .join("\n");

    const message = `✨ Elegant Auto Studio Buyurtmasi ✨\n\n` +
                    `👤 Mijoz: ${clientName || "Ko'rsatilmagan"}\n` +
                    `📞 Telefon: ${clientPhone || "Ko'rsatilmagan"}\n` +
                    `🛠️ Xizmat turi: ${service.uzName}\n` +
                    `🚗 Avtomobil: ${vehicle.name}\n` +
                    `📦 Paket turi: ${selectedTier === "standard" ? "STANDARD" : "PREMIUM"}\n` +
                    (isShumka ? `\n🔧 Izolyatsiya qismlari:\n${partsList}\n` : "") +
                    `\n💰 Jami hisoblangan narx: ${formatUZS(getRunningTotal())}\n\n` +
                    `Mening buyurtmamni tasdiqlang va detailing uchun vaqt belgilang! Rahmat.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://t.me/elegant_auto_admin?text=${encoded}`, "_blank");
  };

  const activePart = ANATOMY_PARTS.find(p => p.id === activePartId);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 text-gray-900">
      {/* Background radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation / Breadcrumb */}
        <div className="space-y-4">
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#0066cc] hover:text-[#0099ff] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>📂 {service.uzName} bo'limiga qaytish</span>
          </Link>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
              {vehicle.name}
            </h1>
            <span className="text-xl sm:text-2xl text-gray-400 font-light">
              / {service.uzName} konstruktori
            </span>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Center Work Area: Packages & Anatomy */}
          <div className="lg:col-span-8 space-y-12">
            {!isShumka ? (
              /* Beautiful Details Card for Non-Shumka Services */
              <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gray-200/50 space-y-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Cover Image */}
                <div className="w-full h-56 sm:h-80 rounded-2xl overflow-hidden border border-gray-200/50 relative">
                  <img
                    src={service.image}
                    alt={service.uzName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0066cc]">Kiritilgan xizmatlar to'plami</span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900">{service.uzName}</h3>
                  </div>

                  <p className="text-xs sm:text-base text-gray-600 font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <h4 className="text-xs sm:text-sm uppercase font-bold text-gray-900 tracking-wider flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#0066cc]" />
                      <span>Xizmat doirasida amalga oshiriladigan ishlar:</span>
                    </h4>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-gray-600">
                      {getServiceBullets(service.id, "standard").map((bullet, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust metrics */}
                  <div className="border-t border-gray-100 pt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-55 p-4 rounded-xl border border-gray-200/50 shadow-sm bg-gray-50/50">
                      <span className="block text-gray-900 font-extrabold text-xs sm:text-sm">Premium</span>
                      <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider mt-1">Materiallar</span>
                    </div>
                    <div className="bg-gray-55 p-4 rounded-xl border border-gray-200/50 shadow-sm bg-gray-50/50">
                      <span className="block text-[#0066cc] font-extrabold text-xs sm:text-sm">100%</span>
                      <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider mt-1">Kafolat</span>
                    </div>
                    <div className="bg-gray-55 p-4 rounded-xl border border-gray-200/50 shadow-sm bg-gray-50/50">
                      <span className="block text-gray-900 font-extrabold text-xs sm:text-sm">Tezkor</span>
                      <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider mt-1">Va xavfsiz</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Packages Grid (only for Shumka) */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-widest text-[#0066cc]">
                    1-bosqich: Asosiy paketni tanlang
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {/* Standard Package Card */}
                  <div
                    onClick={() => setSelectedTier("standard")}
                    className={`relative flex flex-col justify-between p-4 sm:p-8 rounded-2xl sm:rounded-3xl cursor-pointer glass-panel shadow-sm transition-all duration-300 ${
                      selectedTier === "standard"
                        ? "border-[#0066cc] bg-[#0066cc]/5 shadow-[0_4px_20px_rgba(0,102,204,0.08)]"
                        : "hover:border-gray-300 border-gray-200/50"
                    }`}
                  >
                    {selectedTier === "standard" && (
                      <div className="absolute top-3 right-3 bg-[#0066cc] text-white text-[7px] sm:text-[9px] font-bold tracking-widest uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
                        Faol
                      </div>
                    )}

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900">Standard Paket</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">ComfortMat Standard materiallari</p>
                      </div>

                      <div className="text-base sm:text-3xl font-black text-[#0066cc]">
                        {formatUZS(standardBase)}
                      </div>

                      <ul className="space-y-2 sm:space-y-3.5 border-t border-gray-100 pt-3 sm:pt-6 text-[10px] sm:text-sm text-gray-600">
                        {getServiceBullets(service.id, "standard").map((bullet, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5 sm:space-x-2">
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Premium Package Card */}
                  <div
                    onClick={() => setSelectedTier("premium")}
                    className={`relative flex flex-col justify-between p-4 sm:p-8 rounded-2xl sm:rounded-3xl cursor-pointer glass-panel shadow-sm transition-all duration-300 relative overflow-hidden ${
                      selectedTier === "premium"
                        ? "border-[#0066cc] bg-[#0066cc]/5 shadow-[0_4px_25px_rgba(0,102,204,0.12)]"
                        : "hover:border-gray-300 border-gray-200/50"
                    }`}
                  >
                    {/* Glowing light borders */}
                    <div className={`absolute inset-0 border border-[#0066cc]/20 animate-glow-pulse pointer-events-none rounded-2xl sm:rounded-3xl ${selectedTier === "premium" ? "opacity-100" : "opacity-0"}`} />

                    {selectedTier === "premium" && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0066cc] to-[#0099ff] text-white text-[7px] sm:text-[9px] font-bold tracking-widest uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm border border-blue-200/20">
                        Eng zo'r tanlov
                      </div>
                    )}

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900">Premium Paket</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">ComfortMat Premium materiallari</p>
                      </div>

                      <div className="text-base sm:text-3xl font-black text-[#0066cc]">
                        {formatUZS(premiumBase)}
                      </div>

                      <ul className="space-y-2 sm:space-y-3.5 border-t border-gray-100 pt-3 sm:pt-6 text-[10px] sm:text-sm text-gray-600">
                        {getServiceBullets(service.id, "premium").map((bullet, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5 sm:space-x-2">
                            <Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 sm:mt-0 text-[#0066cc]`} />
                            <span className="text-gray-900 font-medium">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Anatomy section */}
            {isShumka && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/50 pb-4">
                  <div>
                    <h2 className="text-xs uppercase font-bold tracking-widest text-[#0066cc]">
                      2-bosqich: Izolyatsiya hududlarini sozlash
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Kerakli qismlarni tanlash uchun kartalarni bosing yoki ularning batafsil ma'lumoti bilan tanishing.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0066cc]" />
                      <span>Tanlangan qismlar</span>
                    </div>
                  </div>
                </div>

                {/* Grid of Anatomy Parts Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {ANATOMY_PARTS.map((part) => {
                    const isSelected = selectedParts.includes(part.id);
                    const partPrice = Math.round(part.price * vehicleFactor * materialFactor);

                    return (
                      <div
                        key={part.id}
                        onClick={() => togglePart(part.id)}
                        className={`group relative flex flex-col justify-between h-[235px] sm:h-[310px] rounded-2xl overflow-hidden glass-panel glass-panel-hover shadow-sm transition-all duration-300 border cursor-pointer ${
                          isSelected
                            ? "border-[#0066cc] bg-[#0066cc]/5 shadow-[0_4px_20px_rgba(0,102,204,0.08)]"
                            : "border-gray-200/50 hover:border-gray-300"
                        }`}
                      >
                        {/* Image banner with selection tick */}
                        <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={part.image}
                            alt={part.uzName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Shadow Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                          {/* Checkbox Tick Overlap */}
                          <div
                            className={`absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isSelected
                                ? "bg-[#0066cc] border-[#0066cc] text-white shadow-sm"
                                : "bg-white/70 backdrop-blur-md border-gray-300 text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                          </div>

                          {/* Info Button trigger inside image */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePartId(part.id);
                            }}
                            className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] font-semibold text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer animate-pulse"
                          >
                            <Info className="w-3 h-3 text-[#00c2ff]" />
                            <span>Batafsil</span>
                          </button>
                        </div>

                        {/* Content block */}
                        <div className="flex-grow p-3 sm:p-5 flex flex-col justify-between space-y-2">
                          <div className="space-y-1">
                            <h3 className="text-xs sm:text-base font-bold text-gray-900 group-hover:text-[#0066cc] transition-colors truncate">
                              {part.uzName}
                            </h3>
                            <p className="text-[9px] sm:text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
                              {part.description}
                            </p>
                          </div>

                          <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
                            <div>
                              <p className="text-[7px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-bold">Narxi</p>
                              <p className="text-xs sm:text-base font-black text-[#0066cc] mt-0.5 whitespace-nowrap">
                                +{formatUZS(partPrice)}
                              </p>
                            </div>
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "bg-[#0066cc] border-[#0066cc] text-white"
                                  : "bg-gray-100 border-gray-200 text-gray-400 group-hover:text-gray-600"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Sticky Console: Price Breakdown & Intake Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-[96px] space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-gray-200/50 shadow-md relative">
              <div className="absolute inset-0 rounded-3xl border border-[#0066cc]/10 animate-glow-pulse pointer-events-none" />

              <h3 className="text-xl font-bold text-gray-900 mb-6">Buyurtma tafsilotlari</h3>

              <div className="space-y-6">
                {/* Active additions breakdown */}
                <div className="bg-gray-55 p-5 rounded-2xl border border-gray-200/50 shadow-sm bg-gray-50/50 space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between text-xs text-gray-400 uppercase font-semibold">
                    <span>Xizmat / Hudud</span>
                    <span>Narxi</span>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {isShumka ? (
                      ANATOMY_PARTS.map((part) => {
                        const isSelected = selectedParts.includes(part.id);
                        if (!isSelected) return null;
                        return (
                          <div key={part.id} className="flex justify-between items-center text-gray-800">
                            <span>{part.uzName}</span>
                            <span className="font-semibold text-xs text-gray-900">{formatUZS(Math.round(part.price * vehicleFactor * materialFactor))}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-between items-center text-gray-800">
                        <span>To'liq xizmat paketi</span>
                        <span className="font-semibold text-xs text-gray-900">{formatUZS(getRunningTotal())}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200/50 pt-4 flex justify-between items-baseline">
                    <span className="text-gray-500 font-bold text-xs uppercase">Jami:</span>
                    <span className="text-2xl font-black text-[#0066cc]">
                      {formatUZS(getRunningTotal())}
                    </span>
                  </div>
                </div>

                {/* Intake Form */}
                <form onSubmit={handleTelegramCheckout} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="user-name" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sizning ismingiz</label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Toshpo'latov Sanjar"
                      className="w-full bg-white border border-gray-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]/30 text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="user-phone" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Telefon raqamingiz</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        id="user-phone"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+998 (90) 123-45-67"
                        className="w-full bg-white border border-gray-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]/30 text-gray-900 pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0066cc] to-[#0099ff] hover:from-[#0099ff] hover:to-[#0066cc] text-white font-bold py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePartId(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Side sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[460px] bg-white border-l border-gray-200/50 shadow-2xl p-8 sm:p-10 flex flex-col justify-between"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0066cc]">Qism tafsilotlari</span>
                    <h3 className="text-2xl font-black text-gray-900">{activePart.uzName}</h3>
                  </div>
                  <button
                    onClick={() => setActivePartId(null)}
                    className="p-2 text-gray-400 hover:text-gray-900 rounded-full bg-gray-50 border border-gray-200/50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Realistic soundproofing process preview image */}
                {activePart.image && (
                  <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200/50 relative shadow-inner">
                    <img
                      src={activePart.image}
                      alt={activePart.uzName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                )}

                {/* Cost card */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/50 shadow-sm flex items-baseline justify-between">
                  <span className="text-xs uppercase font-bold text-gray-400">Individual o'rnatish narxi</span>
                  <span className="text-xl font-extrabold text-[#0066cc]">{formatUZS(Math.round(activePart.price * vehicleFactor * materialFactor))}</span>
                </div>

                {/* Specs text */}
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
                  <p>{activePart.description}</p>
                  
                  <div className="border-t border-gray-100 pt-6 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-gray-900 tracking-wider">O'rnatish standartlari:</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sirtni to'liq yog'sizlantirish va professional tayyorlash</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          {selectedTier === "premium" 
                            ? "ComfortMat Premium Extreme/Viper seriyali ultra samarali materiallar"
                            : "ComfortMat Standard tebranish va shovqin yutuvchi materiallari"
                          }
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Maxsus roliklar va issiqlik feni yordamida to'liq texnologik presslash</span>
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
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                  selectedParts.includes(activePart.id)
                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/50"
                    : "bg-gradient-to-r from-[#0066cc] to-[#0099ff] hover:from-[#0099ff] hover:to-[#0066cc] text-white shadow-sm hover:shadow-md"
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
