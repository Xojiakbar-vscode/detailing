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
    title: "Polishing & Ceramic",
    uzName: "Polirovka va Keramika",
    description: "Premium paint correction followed by advanced 9H ceramic coating for lifetime protection and deep mirror shine.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "ximchiska",
    title: "Ximchiska",
    uzName: "Kimyoviy Tozalash",
    description: "Deep chemical interior dry cleaning. Full disinfection of leather, alcantara, and textiles using eco-friendly agents.",
    iconName: "Wind",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "shumka",
    title: "Shumka",
    uzName: "Shovqin Izolyatsiyasi",
    description: "High-grade multi-layer sound and vibration insulation. Eliminate highway noise and engine drone for pure driving luxury.",
    iconName: "VolumeX",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "tonirovka",
    title: "Tonirovka",
    uzName: "Oyna Qoraytirish",
    description: "Premium window tinting with advanced thermal and UV protection nano-ceramic films. Compliance guaranteed.",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "kuzov-himoyasi",
    title: "Kuzov himoyasi",
    uzName: "Kuzov Himoya Plyonkasi",
    description: "Ultra-durable Paint Protection Film (PPF / Armor) protecting against stone chips, scratches, and harsh environmental effects.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "salon-detailing",
    title: "Salon detailing",
    uzName: "Salon Deteylingi",
    description: "Sleek restoration of interior panels, dynamic ambient light installations, and protective coatings for leather and gloss plastics.",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "motor-cleaning",
    title: "Motor cleaning",
    uzName: "Dvigatelni Tozalash",
    description: "Professional engine bay detailing with dielectric gels and steam, followed by hydrophobic plastic and rubber preservation.",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "anti-chrome",
    title: "Anti chrome",
    uzName: "Anti-Xrom",
    description: "Transformation of glossy chrome exterior parts to modern high-gloss black or satin finishes using premium cast vinyl.",
    iconName: "Sliders",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "gentra",
    name: "Chevrolet Gentra",
    category: "sedan",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop", // placeholder car
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
    description: "3-layer vibration damping + sound absorption inside door cards. Vastly improves acoustic insulation and stereo bass quality."
  },
  {
    id: "roof",
    name: "Roof",
    uzName: "Tom",
    price: 600000,
    description: "Premium sound insulation installation. Heavy reduce of rain drum sound and excellent heat preservation."
  },
  {
    id: "trunk",
    name: "Trunk",
    uzName: "Bagaj",
    price: 1000000,
    description: "Sound absorption of wheel wells and flat surfaces inside the trunk. Minimizes exhaust resonance and back tire rumblings."
  },
  {
    id: "hood",
    name: "Hood",
    uzName: "Kapot",
    price: 500000,
    description: "Thermo-acoustic lining under the hood. Shields exterior noise and shields paintwork from extreme engine heat."
  },
  {
    id: "floor",
    name: "Floor",
    uzName: "Pol",
    price: 2000000,
    description: "Comprehensive 4mm high-density vibration dampening across the cabin floor. Dampens road gravel strikes and exhaust hums."
  },
  {
    id: "arches",
    name: "Wheel Arches",
    uzName: "Gildirak Arkalari",
    price: 800000,
    description: "External multi-layer wheel arch isolation. Highly shields tire tread noise and gravel strikes at source."
  }
];

export const FAQS = [
  {
    q: "How long does a full premium ceramic coating service take?",
    a: "Usually, a complete multi-step paint correction and dual-layer ceramic application takes 24 to 48 hours depending on the paint condition. This allows proper curing in our specialized cleanroom."
  },
  {
    q: "What materials do you use for Shumka (Soundproofing)?",
    a: "We use ultra-premium ComfortMat and STP multi-layer sound deadening materials, including specialized vibration dampers, sound absorbers, and thermo-acoustic layers."
  },
  {
    q: "Can I customize which parts to insulate in the Shumka service?",
    a: "Yes! Using our interactive car anatomy customizer, you can select specific zones (like just the Doors, or just the Floor + Arches) and see the exact pricing breakdown before booking."
  },
  {
    q: "Is there any warranty on your Paint Protection Film (Kuzov Himoyasi)?",
    a: "We offer a 5-year to 7-year warranty depending on the chosen PPF film. Our premium films are self-healing (scratches disappear under sun/heat) and don't yellow over time."
  },
  {
    q: "How do I book a detailing slot?",
    a: "You can book directly using our website configurator and clicking 'Book via Telegram' or 'Book via WhatsApp'. We will receive your custom configuration and schedule a convenient time!"
  }
];

export const REVIEWS = [
  {
    name: "Shaxzod Alimov",
    car: "Chevrolet Malibu 2",
    rating: 5,
    comment: "Excellent Shumka service! The doors sound heavy and premium now. Road noise has dropped by at least 60-70%. Highly recommend!",
    date: "12 May, 2026"
  },
  {
    name: "Dmitriy K.",
    car: "BMW X5 M-Sport",
    rating: 5,
    comment: "Amazing ceramic coating. The mirror shine on my black X5 is incredible. Dirt just slides off when washing. Professional crew!",
    date: "08 May, 2026"
  },
  {
    name: "Jasur Raximov",
    car: "Chevrolet Gentra",
    rating: 5,
    comment: "Done full interior detailing (Ximchiska) and standard soundproofing. Feels like a new premium car inside. Exceptional attention to detail.",
    date: "28 April, 2026"
  },
  {
    name: "Nilufar B.",
    car: "Chevrolet Tracker",
    rating: 5,
    comment: "Got standard window tinting and anti-chrome detailing. The styling looks stealth and sleek. The glass keeps out the Uzb summer heat wonderfully!",
    date: "15 April, 2026"
  }
];
