export interface Service {
  id: string;
  title: string;
  uzName: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'sedan' | 'suv' | 'crossover' | 'hatchback' | 'coupe';
  image: string;
  basePrices: { [serviceId: string]: number };
}

export interface AnatomyPart {
  id: string;
  name: string;
  uzName: string;
  price: number;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: "polishing-ceramic",
    title: "Polirovka va Keramika",
    uzName: "Polirovka va Keramika",
    description: "Kuzovni professional darajada abraziv polirovka qilish va 9H premium keramika qoplamasi yordamida chuqur ko'zgu kabi yorqin jilo hamda uzoq muddatli himoya berish.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "ximchiska",
    title: "Kimyoviy tozalash (Ximchiska)",
    uzName: "Kimyoviy Tozalash",
    description: "Salon yuzalarini to'liq kimyoviy quruq tozalash. Teri, alkantara va mato detallarini ekologik xavfsiz vositalar bilan chuqur tozalash hamda dezinfeksiya qilish.",
    iconName: "Wind",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "shumka",
    title: "Shovqin izolyatsiyasi (Shumka)",
    uzName: "Shovqin Izolyatsiyasi",
    description: "Premium ComfortMat materiallari bilan ko'p qavatli shovqin va vibratsiya izolyatsiyasi. Yo'l va dvigatel shovqinlarini maksimal darajada bartaraf etish.",
    iconName: "VolumeX",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "tonirovka",
    title: "Oyna qoraytirish (Tonirovka)",
    uzName: "Oyna Qoraytirish",
    description: "Premium atermal va nano-keramik plyonkalar yordamida oyna qoraytirish. Quyosh issiqligi hamda zararli ultrabinafsha nurlardan 99% gacha kafolatlangan himoya.",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "kuzov-himoyasi",
    title: "Kuzov himoyasi (Zirh plyonka)",
    uzName: "Kuzov Himoya Plyonkasi",
    description: "Kuzovni toshlar, tirnalishlar va tashqi muhit salbiy ta'siridan asrovchi o'ta bardoshli, o'z-o'zini tiklovchi premium PPF polimer zirhli plyonkasi.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "salon-detailing",
    title: "Salon deteylingi",
    uzName: "Salon Deteylingi",
    description: "Salon plastiklari, ekranlari va porloq qismlarini himoyalash, premium interyer Ambient Light chiroqlarini o'rnatish hamda teri detallarni parvarishlash.",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "motor-cleaning",
    title: "Dvigatelni tozalash",
    uzName: "Dvigatelni Tozalash",
    description: "Dvigatel bo'lmasini maxsus dielektrik gellar va bug' yordamida 100% xavfsiz tozalash hamda gidrofob himoya vositalari bilan konservatsiya qilish.",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "anti-chrome",
    title: "Anti-xrom",
    uzName: "Anti-Xrom",
    description: "Tashqi yaltiroq xrom detallarni premium porloq qora (gloss black) vinil plyonkalar bilan qoplash orqali zamonaviy sport uslubiga keltirish.",
    iconName: "Sliders",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "gentra",
    name: "Chevrolet Gentra",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 1800000,
      "ximchiska": 800000,
      "shumka": 4000000,
      "tonirovka": 900000,
      "kuzov-himoyasi": 12000000,
      "salon-detailing": 1000000,
      "motor-cleaning": 350000,
      "anti-chrome": 600000
    }
  },
  {
    id: "cobalt",
    name: "Chevrolet Cobalt",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 1600000,
      "ximchiska": 700000,
      "shumka": 3800000,
      "tonirovka": 800000,
      "kuzov-himoyasi": 10000000,
      "salon-detailing": 800000,
      "motor-cleaning": 300000,
      "anti-chrome": 500000
    }
  },
  {
    id: "malibu",
    name: "Chevrolet Malibu 2",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 2500000,
      "ximchiska": 1000000,
      "shumka": 5000000,
      "tonirovka": 1200000,
      "kuzov-himoyasi": 16000000,
      "salon-detailing": 1500000,
      "motor-cleaning": 450000,
      "anti-chrome": 900000
    }
  },
  {
    id: "tracker",
    name: "Chevrolet Tracker",
    category: "crossover",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 2200000,
      "ximchiska": 950000,
      "shumka": 4500000,
      "tonirovka": 1100000,
      "kuzov-himoyasi": 14000000,
      "salon-detailing": 1300000,
      "motor-cleaning": 400000,
      "anti-chrome": 850000
    }
  },
  {
    id: "tahoe",
    name: "Chevrolet Tahoe",
    category: "suv",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 4000000,
      "ximchiska": 1600000,
      "shumka": 7500000,
      "tonirovka": 1800000,
      "kuzov-himoyasi": 24000000,
      "salon-detailing": 2500000,
      "motor-cleaning": 700000,
      "anti-chrome": 1500000
    }
  },
  {
    id: "bmw-x5",
    name: "BMW X5 M-Sport",
    category: "suv",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 4500000,
      "ximchiska": 1800000,
      "shumka": 8000000,
      "tonirovka": 2000000,
      "kuzov-himoyasi": 28000000,
      "salon-detailing": 3000000,
      "motor-cleaning": 800000,
      "anti-chrome": 1800000
    }
  },
  {
    id: "kia-k5",
    name: "Kia K5 GT-Line",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1617813730247-86b0c9796797?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 2400000,
      "ximchiska": 950000,
      "shumka": 4800000,
      "tonirovka": 1150000,
      "kuzov-himoyasi": 15000000,
      "salon-detailing": 1400000,
      "motor-cleaning": 400000,
      "anti-chrome": 800000
    }
  },
  {
    id: "porsche-911",
    name: "Porsche 911 Carrera GTS",
    category: "coupe",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 5000000,
      "ximchiska": 1500000,
      "shumka": 6000000,
      "tonirovka": 1800000,
      "kuzov-himoyasi": 32000000,
      "salon-detailing": 3500000,
      "motor-cleaning": 1000000,
      "anti-chrome": 2000000
    }
  },
  {
    id: "golf-r",
    name: "Volkswagen Golf 8 R",
    category: "hatchback",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 2000000,
      "ximchiska": 800000,
      "shumka": 4200000,
      "tonirovka": 900000,
      "kuzov-himoyasi": 13000000,
      "salon-detailing": 1100000,
      "motor-cleaning": 350000,
      "anti-chrome": 700000
    }
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: "doors",
    name: "Doors",
    uzName: "Eshiklar",
    price: 1500000,
    description: "Eshik kartalarining ichki qismida 3 qavatli shovqin va vibratsiya yutuvchi ComfortMat materiallarini o'rnatish. Akustika tizimining ovoz sifatini va baslarni sezilarli darajada yaxshilaydi."
  },
  {
    id: "roof",
    name: "Roof",
    uzName: "Tom",
    price: 600000,
    description: "Avtomobil tom qismini shovqindan to'liq izolyatsiya qilish. Yomg'ir shovqini va yo'l shovqinlarini kamaytiradi, qishda issiq va yozda salqin haroratni saqlashga yordam beradi."
  },
  {
    id: "trunk",
    name: "Trunk",
    uzName: "Bagaj",
    price: 1000000,
    description: "Bagaj qismi va g'ildirak arkalarining ichki yuzalarini shovqin yutuvchi qatlam bilan qoplash. Glushitel rezonsansi va orqa g'ildirak shovqinlarini maksimal darajada kamaytiradi."
  },
  {
    id: "hood",
    name: "Hood",
    uzName: "Kapot",
    price: 500000,
    description: "Kapot ostiga maxsus termo-akustik qoplama o'rnatish. Dvigatel shovqinining tashqariga chiqishini kamaytiradi va kapot bo'yog'ini dvigatelning kuchli issiqligidan himoya qiladi."
  },
  {
    id: "floor",
    name: "Floor",
    uzName: "Pol",
    price: 2000000,
    description: "Salon pol qismiga 4 mm qalinlikdagi yuqori zichlikli ComfortMat tebranish amortizatorlarini to'liq o'rnatish. Yo'l shovqini, shag'al urilishi va g'ildirak vibratsiyasini yo'qotadi."
  },
  {
    id: "arches",
    name: "Wheel Arches",
    uzName: "G'ildirak Arkalari",
    price: 800000,
    description: "G'ildirak arkalarining tashqi qismiga ko'p qavatli shovqin to'sig'ini o'rnatish. Shinalar protektori shovqini va yo'l toshlarining urilish tovushini manbaida bloklaydi."
  }
];

export const FAQS = [
  {
    q: "Keramika qoplash xizmati qancha vaqt oladi?",
    a: "Kuzovni tayyorlash, abraziv polirovka qilish va 2 qavatli premium keramika qoplash xizmati avtomobilning bo'yoq holatiga qarab 24 dan 48 soatgacha vaqt oladi. Bu vaqt keramika qatlamining maxsus yopiq xonada to'liq quritilishi uchun zarur."
  },
  {
    q: "Shumka (Shovqin izolyatsiyasi) uchun qanday materiallardan foydalanasiz?",
    a: "Biz faqat yuqori sifatli ComfortMat va STP premium ko'p qavatli shovqin va vibratsiya yutuvchi materiallaridan foydalanamiz. Bunga tebranishga qarshi mastikalar, tovush yutuvchi gubkalar va termo-akustik qatlamlar kiradi."
  },
  {
    q: "Shovqin izolyatsiyasida qaysi qismlarni qilishni o'zim tanlasam bo'ladimi?",
    a: "Albatta! Saytdagi interaktiv chizma orqali siz faqat o'zingizga kerakli qismlarni (masalan, faqat eshiklar yoki pol va g'ildirak arkalari) belgilab, buyurtma qilishingiz va narxini hisoblashingiz mumkin."
  },
  {
    q: "Kuzov himoya plyonkasi (PPF zirh) uchun kafolat bormi?",
    a: "Biz taklif qiladigan premium PPF zirhli plyonkalarimiz uchun 5 yildan 10 yilgacha rasmiy kafolat beramiz. Ushbu plyonkalar o'z-o'zini tiklash (chiziqlar quyosh issig'ida yo'qolishi) xususiyatiga ega va sarg'ayib ketmaydi."
  },
  {
    q: "Buyurtma berish qanday amalga oshiriladi?",
    a: "Siz o'zingiz xohlagan xizmat va avtomobil modelingizni tanlab, paketni sozlaganingizdan so'ng, ismingiz va telefon raqamingizni kiritib 'Telegram orqali buyurtma berish' tugmasini bosasiz. Biz sizga bog'lanib, qulay vaqtni belgilaymiz."
  }
];

export const REVIEWS = [
  {
    name: "Shaxzod Alimov",
    car: "Chevrolet Malibu 2",
    rating: 5,
    comment: "Shumka xizmati shunchaki dahshat! Eshiklar endi og'ir va premium yopilyapti. Yo'l shovqini kamida 60-70% ga kamaydi. Hamma detailing ishqibozlariga tavsiya qilaman!",
    date: "12-may, 2026-yil"
  },
  {
    name: "Dmitriy K.",
    car: "BMW X5 M-Sport",
    rating: 5,
    comment: "Keramika qoplamasi ajoyib chiqdi. Qora rangli X5 avtomobilimning ko'zgudek jilosi lol qoldiradi. Yuvganda ham loy va kir o'zi sirg'alib tushib ketyapti. Professional jamoa!",
    date: "08-may, 2026-yil"
  },
  {
    name: "Jasur Raximov",
    car: "Chevrolet Gentra",
    rating: 5,
    comment: "To'liq kimyoviy tozalash (Ximchiska) va standart shovqin izolyatsiyasini qildirdim. Mashina ichi yangi chiqqan premium mashinadek hidlanyapti va juda tinch. Ishlariga juda e'tiborli ekan.",
    date: "28-aprel, 2026-yil"
  },
  {
    name: "Nilufar B.",
    car: "Chevrolet Tracker",
    rating: 5,
    comment: "Oynalarni tonirovka qildirdim va anti-xrom xizmatidan foydalandim. Tashqi ko'rinishi juda sportcha va chiroyli chiqdi. Quyosh issig'ini ham o'tkazmayapti, yozda juda asqatadi!",
    date: "15-aprel, 2026-yil"
  }
];
