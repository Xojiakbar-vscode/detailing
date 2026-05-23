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
  image: string; // Realistic soundproofing process photo
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
    id: "motor-cleaning",
    title: "Dvigatelni tozalash",
    uzName: "Dvigatelni Tozalash",
    description: "Dvigatel bo'lmasini maxsus dielektrik gellar va bug' yordamida 100% xavfsiz tozalash hamda gidrofob himoya vositalari bilan konservatsiya qilish.",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop"
  },

];

export const VEHICLES: Vehicle[] = [
  {
    id: "sedan-m",
    name: "Sedan M (Nexia 1-2-3, Cobalt, Gentra, Onix va hokazo)",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 1700000,
      "ximchiska": 750000,
      "shumka": 3800000,
      "tonirovka": 850000,
      "kuzov-himoyasi": 11000000,
      "salon-detailing": 900000,
      "motor-cleaning": 320000,
      "anti-chrome": 550000
    }
  },
  {
    id: "sedan-inomarka",
    name: "Sedan Inomarka (Malibu, K5, Sonata, BYD Han va hokazo)",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1617813730247-86b0c9796797?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 2400000,
      "ximchiska": 950000,
      "shumka": 4900000,
      "tonirovka": 1150000,
      "kuzov-himoyasi": 15500000,
      "salon-detailing": 1450000,
      "motor-cleaning": 420000,
      "anti-chrome": 850000
    }
  },
  {
    id: "crossover",
    name: "Krossover (Tracker, Captiva, BYD Song Plus va hokazo)",
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
    id: "suv",
    name: "Yo'ltanlamas / SUV (Tahoe, BMW X5, Land Cruiser va hokazo)",
    category: "suv",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 4200000,
      "ximchiska": 1700000,
      "shumka": 7800000,
      "tonirovka": 1900000,
      "kuzov-himoyasi": 26000000,
      "salon-detailing": 2750000,
      "motor-cleaning": 750000,
      "anti-chrome": 1650000
    }
  },
  {
    id: "hatchback",
    name: "Kichik / Xetchbek (Spark, Golf, Matiz va hokazo)",
    category: "hatchback",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop",
    basePrices: {
      "polishing-ceramic": 1700000,
      "ximchiska": 700000,
      "shumka": 3700000,
      "tonirovka": 800000,
      "kuzov-himoyasi": 11000000,
      "salon-detailing": 900000,
      "motor-cleaning": 300000,
      "anti-chrome": 500000
    }
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: "doors",
    name: "Doors",
    uzName: "Eshiklar",
    price: 1500000,
    description: "Eshik kartalarining ichki qismida 3 qavatli shovqin va vibratsiya yutuvchi ComfortMat materiallarini o'rnatish. Akustika tizimining ovoz sifatini va baslarni sezilarli darajada yaxshilaydi.",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "roof",
    name: "Roof",
    uzName: "Tom",
    price: 600000,
    description: "Avtomobil tom qismini shovqindan to'liq izolyatsiya qilish. Yomg'ir shovqini va yo'l shovqinlarini kamaytiradi, qishda issiq va yozda salqin haroratni saqlashga yordam beradi.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "trunk",
    name: "Trunk",
    uzName: "Bagaj",
    price: 1000000,
    description: "Bagaj qismi va g'ildirak arkalarining ichki yuzalarini shovqin yutuvchi qatlam bilan qoplash. Glushitel rezonsansi va orqa g'ildirak shovqinlarini maksimal darajada kamaytiradi.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "hood",
    name: "Hood",
    uzName: "Kapot",
    price: 500000,
    description: "Kapot ostiga maxsus termo-akustik qoplama o'rnatish. Dvigatel shovqinining tashqariga chiqishini kamaytiradi va kapot bo'yog'ini dvigatelning kuchli issiqligidan himoya qiladi.",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "floor",
    name: "Floor",
    uzName: "Pol",
    price: 2000000,
    description: "Salon pol qismiga 4 mm qalinlikdagi yuqori zichlikli ComfortMat tebranish amortizatorlarini to'liq o'rnatish. Yo'l shovqini, shag'al urilishi va g'ildirak vibratsiyasini yo'qotadi.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "arches",
    name: "Wheel Arches",
    uzName: "G'ildirak Arkalari",
    price: 800000,
    description: "G'ildirak arkalarining tashqi qismiga ko'p qavatli shovqin to'sig'ini o'rnatish. Shinalar protektori shovqini va yo'l toshlarining urilish tovushini manbaida bloklaydi.",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop"
  }
];

export const FAQS = [];
export const REVIEWS = [];
