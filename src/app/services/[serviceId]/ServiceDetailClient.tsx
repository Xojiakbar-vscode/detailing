"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
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
  Gauge,
  Play
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

interface ProcessStep {
  title: string;
  desc: string;
  image: string;
  video?: string;
}

const SERVICE_PROCESSES: { [serviceId: string]: ProcessStep[] } = {
  "shumka": [
    {
      title: "1. Demontaj va Tayyorlash",
      desc: "Salon to'liq qismlarga (o'rindiqlar, plastik qoplamalar) ajratiladi. Metall yuzalar chang va yog'lardan maxsus erituvchilar yordamida mukammal tozalanadi va yog'sizlantiriladi.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Vibro-izolyatsiya (1-qavat)",
      desc: "Tebranish va struktura shovqinlarini so'ndirish uchun yuqori zichlikdagi ComfortMat vibro-amortizatorlari sirtlarga o'rnatiladi. Maxsus roliklar bilan havo qolmaguncha to'liq presslanadi.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Shovqin Yutish (2-qavat)",
      desc: "Vibratsiyadan o'tgan tovush to'lqinlarini yutish uchun ComfortMat Standard yoki Premium tovush yutuvchi gubkalar va yengil peno-polimer qatlamlari to'liq qoplanadi.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Akustik Membrana (3-qavat)",
      desc: "Salon poli va g'ildirak arkalari kabi eng shovqinli zonalarga uchinchi qavat - tovushni qaytaruvchi og'ir akustik membrana qatlami o'rnatiladi. Bu shovqinni 95% gacha yo'qotadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Sifat Nazorati va Montaj",
      desc: "Barcha salon qismlari zavod standartlari bo'yicha to'liq qayta yig'iladi. Simlar va fiksatorlar mustahkamligi, oraliqlar (gaplar) va elektronika to'liq tekshiriladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "polishing-ceramic": [
    {
      title: "1. Detailing Yuvish va Tozalash",
      desc: "Kuzov ikki bosqichli deteyling yuvishdan o'tadi, so'ngra sirt bitum, smola va metall changlaridan maxsus sintetik loy (clay bar) yordamida chuqur tozalanadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Ko'p Bosqichli Jilolash (Polirovka)",
      desc: "Professional jilolash mashinalari va abraziv pastalar yordamida bo'yoq qatlamidagi mayda chiziqlar, tirnalishlar va oksidlanishlar 90-95% gacha to'liq yo'qotiladi.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Yuzani Tayyorlash (Yog'sizlantirish)",
      desc: "Polirovka pastalari qoldiqlari maxsus spirtli degreaserlar yordamida to'liq artib tashlanadi. Keramika lak qatlami bilan mukammal darajada bog'lanishi uchun sirt ideal holga keltiriladi.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Keramika Qoplamasini Surtish",
      desc: "Kuzov yuzasiga premium 9H yoki 9H+ keramika suyuqligi bir tekisda surtiladi. U lak ustida chuqur ko'zgu effekti, gidrofob (suv qaytarish) va kimyoviy himoya qobig'ini hosil qiladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Infraqizil Lampa yordamida Quritish",
      desc: "Keramika qoplamasi maksimal qattiqlikka erishishi va kuzovga singishi uchun maxsus infraqizil quritish lampalari ostida qizdiriladi. Bu qoplamaning chidamliligini 2 barobarga oshiradi.",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "ximchiska": [
    {
      title: "1. Demontaj va Quruq Tozalash",
      desc: "Salon qismlari (o'rindiqlar va tagliklar) zaruratga qarab yechiladi. Yuqori bosimli Tornado pistoletlari va kuchli vakuum yordamida chang va quruq chiqindilar chiqariladi.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Premium Kimyoviy Tozalash",
      desc: "Teri, alkantara va mato qismlarga ekologik xavfsiz va sertifikatlangan nemis kimyoviy ko'piklari qo'llaniladi. Maxsus yumshoq cho'tkalar bilan chuqur kir va dog'lar yumshatilib, ekstraktor yordamida tortib olinadi.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Teri va Plastik Parvarishi",
      desc: "Teri detallar qurib, yorilib ketmasligi uchun premium krem-konditsionerlar bilan oziqlantiriladi. Plastik elementlar antistatik va ultrabinafsha nurlardan asrovchi losyonlar bilan qoplanadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Ozonatsiya va Dezinfeksiya",
      desc: "Salondagi barcha yoqimsiz hidlar, zamburug' va bakteriyalarni 99.9% yo'qotish uchun professional ozon generatori qo'yiladi. Havo yo'llari va shishalar antiseptik bilan tozalanadi.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Texnologik Quritish",
      desc: "Namlik qolib, hid yoki chirish yuzaga kelmasligi uchun maxsus kuchli issiq havo puflagichlar (avtofenlar) bilan salon 100% ideal holatda to'liq quritiladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "tonirovka": [
    {
      title: "1. Oynalarni Detailing Tayyorlash",
      desc: "Oynalar maxsus gil (clay bar) va xavfsiz skreperlarlar yordamida har qanday chang, bo'yoq nuqtalari va mayda zarrachalardan ideal darajada tozalanadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Plyonkani Kuzov Ustida Shakllantirish",
      desc: "Premium atermal yoki nano-keramik plyonka oynaning tashqi tomonidan professional fen yordamida qizdirilib, oynaning egri shakliga 100% moslab shakllantiriladi.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Plyonkani Ichki Tomdan O'rnatish",
      desc: "Oynaning ichki yuzasiga maxsus montaj eritmasi sepilib, plyonka o'ta ehtiyotkorlik bilan yopishtiriladi va havo-suv qoldiqlari professional spatulalar yordamida butkul chiqariladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Qirralarni Tekislash va Quritish",
      desc: "Plyonkaning chet qismlari zargarlik aniqligida tekislanadi va havo pufakchalari qolmasligi uchun maxsus quritgichlar yordamida qizdirilib, fiksatsiya qilinadi.",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "kuzov-himoyasi": [
    {
      title: "1. Detailing Yuvish va Tayyorlash",
      desc: "Kuzov to'liq ikki bosqichli deteyling yuvish, bitum va metall kukunlaridan tozalash (clay bar) hamda maxsus vositalar bilan to'liq yog'sizlantirishdan o'tadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Plotter orqali Zargarlik Kesimi",
      desc: "Premium anti-shag'al PPF polimer zirhli plyonkasi maxsus kompyuter dasturida avtomobil modeli o'lchamlari bo'yicha nuqsonlarsiz aniq kesib tayyorlanadi.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Ho'l Usulda O'rnatish (Squeezing)",
      desc: "Maxsus montaj geli yordamida plyonka kuzov detallariga joylashtiriladi va havo hamda suv qoldiqlari professional rezina spatulalar yordamida to'liq chiqariladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Burchaklarni Bukish va Fiksatsiya",
      desc: "Plyonkaning chekka qismlari detallarning ichki tarafiga ehtiyotkorlik bilan qayriladi va plyonka ko'chib ketmasligi uchun yuqori harorat ostida mukammal yopishtiriladi.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Sifat Nazorati va Termo-fiksatsiya",
      desc: "Plyonka to'liq tekshirilib, maxsus fen yordamida termo-fiksatsiya qilinadi. Avtomobilingiz kuzovi toshlar va tirnalishlardan 100% himoyalangan bo'ladi.",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "salon-detailing": [
    {
      title: "1. Nozik Changsizlantirish va Tozalash",
      desc: "Salon plastik panellari, oyna yuzalari, asboblar paneli va multimedia ekranlari eng nozik cho'tkalar va mikrofibralar yordamida changlardan tozalanadi.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Detallarni Himoya Plyonkasi bilan Qoplash",
      desc: "Salondagi yaltiroq qora (piano black) plastiklar, konsol va sensor ekranlar tirnalib ketmasligi uchun maxsus yaltiroq yoki mot himoya plyonkalari bilan o'raladi.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Ambient Light Tizimini O'rsatish",
      desc: "Salon eshik kartalari, oyoq qismi va torpedaga telefon yoki ekran orqali ranglari boshqariladigan premium dinamik Ambient Light yoritgichlari zargarlik aniqligida o'rnatiladi.",
      image: "https://images.unsplash.com/photo-1617813730247-86b0c9796797?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Parvarish va Konservatsiya",
      desc: "Teri qismlar maxsus kremlar bilan oziqlantiriladi, plastiklar esa chang to'plamasligi uchun premium antistatik va ultrabinafsha nurlardan asrovchi losyonlar bilan qoplanadi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "motor-cleaning": [
    {
      title: "1. Elektronikani To'liq Himoyalash",
      desc: "Generator, dvigatel kompyuter bloki va barcha ochiq elektron datchiklar, sim ulagichlari maxsus suv o'tmas fiksatsiya lentalari bilan 100% himoyalanadi.",
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Professional Dielektrik Gel surtish",
      desc: "Dvigatel bo'lmasiga suv bilan reaksiyaga kirishmaydigan professional dielektrik gel sepiladi. Bu gel elektr tizimini saqlagan holda motor kirlarini oson eritadi.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Professional Quruq Bug' bilan Yuvish",
      desc: "Suv bosimi o'rniga maxsus quruq bug' apparatidan foydalanib motor bo'lmasi yuviladi. Bu usul elektronikaning ziyon ko'rish xavfini butunlay yo'qotadi.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Turbodryer yordamida Quritish",
      desc: "Dvigatel bo'limi o'ta kuchli issiq havo puflagichlari yordamida 100% ideal darajada quritilib, barcha namliklardan xoli qilinadi.",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Detailing Konservatsiya",
      desc: "Dvigatel plastiklari va quvurlari yangidek turishi, chang yopishmasligi va yorilib ketmasligi uchun yuqori haroratga chidamli premium konservatorlar bilan qoplanadi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    }
  ],
  "anti-chrome": [
    {
      title: "1. Detallarni Gil bilan Chuqur Tozalash",
      desc: "Tashqi xrom detallar bitum va yo'l kirlaridan tozalash gil yordamida tozalanadi hamda ideal silliq holatga keltiriladi.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ef51a373be22b55f1f7e71e7bd48f7236a&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "2. Yuzani Tayyorlash va Yog'sizlantirish",
      desc: "Vinil plyonkaning yopishqoqlik kuchi maksimal darajada bo'lishi uchun barcha xrom yuzalar maxsus spirtli degreaserlar bilan yog'sizlantiriladi.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/485640321.sd.mp4?s=d852a3a5a415ffcdb221051515efbb56dc6dbb01&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "3. Premium Vinil Plyonka bilan Qoplash",
      desc: "Xrom detallarga yuqori chidamli porloq qora (gloss black) yoki mot qora vinil plyonkalar o'rnatilib, maxsus fen yordamida ehtiyotkorlik bilan tortiladi.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "4. Zargarlik Kesimi (Edge Wrapping)",
      desc: "Kuzov lakiga ziyon yetkazmagan holda, ortiqcha plyonka qirralari zargarlik o'tkirligida kesiladi va detallarning ichki tarafiga qayirib yopishtiriladi.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/435674703.sd.mp4?s=a7102e34273574c8e7efb0451e06fa531b7d598e&profile_id=164&oauth2_token_id=57447761"
    },
    {
      title: "5. Termo-fiksatsiya va Nazorat",
      desc: "Plyonkaning barcha chet burchaklari yuqori harorat ostida termo-fiksatsiya qilinadi. Bu plyonka yillar davomida ko'chmasdan xizmat qilishini kafolatlaydi.",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
      video: "https://player.vimeo.com/external/510850877.sd.mp4?s=d00e84ecf2382c4224c8038b3017ed7c0f1b2cc7&profile_id=164&oauth2_token_id=57447761"
    }
  ]
};

const DEFAULT_PROCESS: ProcessStep[] = [
  {
    title: "1. Professional Maslahat va Qabul",
    desc: "Avtomobil holati mutaxassislarimiz tomonidan to'liq tekshiriladi, lak qalinligi o'lchanadi va mijoz bilan birgalikda eng optimal ish rejasi belgilab olinadi.",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "2. Tayyorgarlik va Yuvish",
    desc: "Avtomobilning barcha tashqi va ichki qismlari detailing standartlari asosida tozalanadi, ish olib borilmaydigan hududlar maxsus yopishqoq lentalar bilan himoyalanadi.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "3. Professional Jarayon",
    desc: "Tanlangan xizmat (Zirh plyonka, tonirovka, dvigatel tozalash yoki boshqa) professional ustalarimiz tomonidan maxsus asbob va premium materiallar yordamida o'rnatiladi.",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "4. Ikki Bosqichli Sifat Nazorati",
    desc: "Bajarilgan ish sifat nazorati bo'yicha usta va administrator tomonidan maxsus yorug'lik ostida ikki marta to'liq tekshiruvdan o'tkaziladi.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
  }
];

interface ClientProps {
  service: Service;
}

type CategoryFilter = "all" | "sedan" | "suv" | "crossover" | "hatchback" | "coupe";

export default function ServiceDetailClient({ service }: ClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5.0);

  const processSteps = SERVICE_PROCESSES[service.id] || DEFAULT_PROCESS;

  React.useEffect(() => {
    if (isInterrupted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          return 0.0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isInterrupted]);

  React.useEffect(() => {
    if (timeLeft <= 0.0) {
      setActiveStepIdx((current) => (current + 1) % processSteps.length);
      setTimeLeft(5.0);
    }
  }, [timeLeft, processSteps.length]);

  const handleStepClick = (idx: number) => {
    setActiveStepIdx(idx);
    setIsInterrupted(true);
    setTimeLeft(5.0);
  };

  const ServiceIcon = IconMap[service.iconName] || Sparkles;

  // Filter vehicles by search & category
  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || vehicle.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList: { name: string; value: CategoryFilter }[] = [
    { name: "Barcha kuzov turlari", value: "all" },
    { name: "Sedanlar", value: "sedan" },
    { name: "Krossoverlar", value: "crossover" },
    { name: "Yo'ltanlamaslar (SUV)", value: "suv" },
    { name: "Xetchbeklar", value: "hatchback" },
  ];

  // Helper for UZS pricing format
  const formatUZS = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6">
      {/* Glow background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button & Intro Title */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#0066cc] hover:text-[#0099ff] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xizmatlarga Qaytish</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/70 border border-gray-200/50 p-6 sm:p-8 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-sm">
            {/* Embedded glowing light */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 max-w-3xl relative z-10">
              <div className="inline-flex items-center space-x-3 text-[#0066cc]">
                <ServiceIcon className="w-6 h-6 animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-[0.2em]">{service.uzName}</span>
              </div>
              <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {service.uzName} <span className="text-[#0066cc]">Narxlari</span>
              </h1>
              <p className="text-xs sm:text-base text-gray-600 font-light leading-relaxed">
                {service.description} Kuzov turini quyida tanlab, individual detailing paketlarini o'zingizga moslab sozlang va aniq narxlarni bilib oling.
              </p>
            </div>
            
            {/* Quick trust metrics */}
            <div className="shrink-0 flex flex-col justify-center space-y-3 relative z-10">
              <div className="bg-white/85 px-6 py-4 rounded-2xl border border-gray-200/50 text-center shadow-sm">
                <p className="text-xl sm:text-2xl font-black text-gray-900">4.9 ★</p>
                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest mt-1">O'rtacha Baho</p>
              </div>
              <div className="bg-white/85 px-6 py-4 rounded-2xl border border-gray-200/50 text-center shadow-sm">
                <p className="text-xl sm:text-2xl font-black text-[#0066cc]">100%</p>
                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest mt-1">Sifat Kafolati</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Process Steps Section */}
        <div className="bg-white/70 border border-gray-200/50 p-6 sm:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-sm space-y-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0066cc] bg-[#0066cc]/5 px-3 py-1.5 rounded-full border border-[#0066cc]/10">Texnologiya va Jarayon</span>
            <h2 className="text-xl sm:text-4xl font-black text-gray-900 mt-2">
              Ishni Bajarish Bosqichlari
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
              Elegant Auto Studio har bir xizmatni Namangandagi eng yuqori standartlar asosida, zargarlik aniqligi bilan amalga oshiradi. Avtomobilingiz keyingi bosqichga o'tishini jonli kuzating:
            </p>

         
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Left Column: Clean Premium Video Player with frame */}
            <div className="lg:col-span-5 h-[260px] sm:h-[400px] rounded-3xl overflow-hidden border border-gray-200/50 relative shadow-inner shrink-0 bg-black flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  {processSteps[activeStepIdx].video ? (
                    <video
                      src={processSteps[activeStepIdx].video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-all"
                    />
                  ) : (
                    <img
                      src={processSteps[activeStepIdx].image}
                      alt={processSteps[activeStepIdx].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none z-10">
                <div className="inline-flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-wider text-[#00c2ff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff] animate-ping" />
                  <span>Jarayon Tafsiloti</span>
                </div>
                <p className="text-sm sm:text-lg font-black truncate mt-2">{processSteps[activeStepIdx].title}</p>
              </div>
            </div>

            {/* Right Column: Steps Interactive Timeline List */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
              {processSteps.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className={`flex items-start p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                      isActive
                        ? "bg-[#0066cc]/5 border-[#0066cc]/30 shadow-sm"
                        : "bg-white/40 border-gray-200/50 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs sm:text-sm font-bold transition-colors ${
                            isActive ? "text-[#0066cc]" : "text-gray-900"
                          }`}
                        >
                          {step.title}
                        </h4>
                        
                        {/* Video label with small circular progress countdown under it! */}
                        {step.video && (
                          <div className="flex flex-col items-center space-y-1 shrink-0 ml-2">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-[#00c2ff] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                              Video
                            </span>
                            
                            {/* Small circular countdown progress indicator right under the video label! */}
                            {isActive && (
                               <button
                                 onClick={(e) => {
                                   if (isInterrupted) {
                                     e.stopPropagation(); // Avoid triggering parent card click
                                     setIsInterrupted(false);
                                     setTimeLeft(5.0);
                                   }
                                 }}
                                 className={`relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border-0 p-0 focus:outline-none transition-all duration-300 ${
                                   isInterrupted 
                                     ? "cursor-pointer hover:scale-115 active:scale-95 bg-blue-500/10 hover:bg-blue-500/20 text-[#0066cc]" 
                                     : "cursor-default text-gray-500"
                                 }`}
                                 title={isInterrupted ? "Avtomatik o'ynatishni tiklash" : undefined}
                               >
                                 <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                                   <circle
                                     cx="10"
                                     cy="10"
                                     r="7"
                                     className="stroke-gray-100"
                                     strokeWidth="1.5"
                                     fill="transparent"
                                   />
                                   {!isInterrupted ? (
                                     <motion.circle
                                       cx="10"
                                       cy="10"
                                       r="7"
                                       fill="transparent"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       style={{
                                         stroke: timeLeft > 3 ? "#10b981" : timeLeft > 1.5 ? "#f59e0b" : "#f43f5e"
                                       }}
                                       animate={{ 
                                         strokeDasharray: `${2 * Math.PI * 7}`, 
                                         strokeDashoffset: `${2 * Math.PI * 7 * (1 - timeLeft / 5.0)}` 
                                       }}
                                       transition={{ duration: 0.1, ease: "linear" }}
                                     />
                                   ) : (
                                     <circle
                                       cx="10"
                                       cy="10"
                                       r="7"
                                       fill="transparent"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       stroke="#0066cc"
                                     />
                                   )}
                                 </svg>
                                 {isInterrupted ? (
                                   <Play className="absolute w-2 h-2 fill-current text-[#0066cc] ml-[0.5px]" />
                                 ) : (
                                   <span className={`absolute text-[7px] font-black font-mono transition-colors duration-300 ${
                                     timeLeft > 3 ? "text-emerald-500" : timeLeft > 1.5 ? "text-amber-500" : "text-rose-500"
                                   }`}>
                                     {Math.ceil(timeLeft)}
                                   </span>
                                 )}
                               </button>
                             )}
                          </div>
                        )}
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="text-[10px] sm:text-xs text-gray-600 font-light leading-relaxed pr-2 pt-1"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Sticky Filter Panel */}
        <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border border-gray-200/50 p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-all duration-300">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Kuzov turini qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200/50 focus:border-[#0066cc]/50 text-gray-900 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full max-w-full md:w-auto no-scrollbar py-1">
            {categoriesList.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/30 shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200/50 hover:border-gray-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid: stacked on mobile, 2 columns on tablet (md+), 3 columns on desktop */}
        <AnimatePresence mode="popLayout">
          {filteredVehicles.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8"
            >
              {filteredVehicles.map((vehicle) => {
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
                      className="group relative flex flex-col h-[230px] sm:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel glass-panel-hover shadow-sm"
                    >
                      {/* Vehicle Image */}
                      <div className="relative h-32 sm:h-56 w-full overflow-hidden bg-gray-100">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Shadow Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 inline-block bg-black/40 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          {vehicle.category}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="flex-grow p-3.5 sm:p-6 flex flex-col justify-between">
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-xs sm:text-xl font-bold text-gray-900 group-hover:text-[#0066cc] transition-colors truncate">
                            {vehicle.name}
                          </h3>
                          <p className="text-[8px] sm:text-[10px] text-gray-500 font-light flex items-center space-x-1">
                            <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0066cc] shrink-0" />
                            <span className="truncate">Kuzov turiga mos professional yondashuv</span>
                          </p>
                        </div>

                        <div className="border-t border-gray-100 pt-3 sm:pt-4 flex items-center justify-between">
                          <div>
                            <p className="text-[7px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-bold">Boshlang'ich narxi</p>
                            <p className="text-xs sm:text-lg font-black text-[#0066cc] mt-0.5 whitespace-nowrap">
                              {formatUZS(vehiclePrice)}
                            </p>
                          </div>
                          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-100 border border-gray-200/50 flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-all duration-300 shadow-sm shrink-0 ml-1">
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Accent glow border */}
                      <div className="absolute inset-0 border border-transparent rounded-2xl sm:rounded-3xl group-hover:border-[#0066cc]/20 pointer-events-none transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 border border-gray-200/50 rounded-3xl backdrop-blur-sm shadow-sm"
            >
              <p className="text-gray-600 font-light text-base">Sizning so'rovingizga mos keladigan kuzov turi topilmadi.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-4 text-xs font-bold text-[#0066cc] hover:underline focus:outline-none cursor-pointer"
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
