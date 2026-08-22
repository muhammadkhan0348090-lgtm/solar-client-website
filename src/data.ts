import { PinItem } from './types';

export const initialPins: PinItem[] = [
  {
    id: 'pin-main-1',
    title: 'Longi Hi-MO X6 / Hi-MO 7 585W N-Type Tier-1 Bifacial Solar Panel',
    description: 'Original A-Grade Longi Hi-MO X6 N-Type HPBC Bifacial Solar Panels with dual-glass coating. Optimized for high-ambient Pakistani summer temperatures (up to 50°C) with 22.8% cell efficiency and 25-year official performance warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=85',
    author: {
      name: 'Maria Segovia',
      initial: 'M',
      bgColor: 'bg-fuchsia-600',
      followers: '14.2k'
    },
    saves: 489,
    tags: ['solar-panel', 'longi-585w', 'price-pkr', 'lahore-solar', 'tier-1', 'net-metering'],
    solarPrice: {
      brand: 'Longi Solar (Hi-MO X6)',
      model: 'LR5-72HGD-585M Dual Glass',
      wattage: 585,
      pricePerWattPkr: 29.5,
      pricePerPlatePkr: 17250,
      technology: 'N-Type TOPCon',
      systemSizeKw: 10,
      estimatedSystemCostPkr: 1080000,
      inverterRecommendation: 'Nitrox / Knox 10kW On-Grid & Hybrid',
      monthlySavingsPkr: 72000,
      warrantyYears: '12 Yrs Product / 25 Yrs Performance',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: [
      {
        id: 'c1',
        author: 'giuli',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: '¡Me encanta! The price of Rs. 29.5/W is super competitive! ❤️',
        timestamp: '2h ago',
        likes: 12,
        isLiked: true,
      },
      {
        id: 'c2',
        author: 'Engr. Tariq Mehmood (Lahore)',
        initial: 'T',
        authorColor: 'bg-emerald-600',
        text: 'Best rate in Hall Road / Lahore market right now. Running 18 plates of 585W with Nitrox 10kW hybrid inverter smoothly for 2 ACs.',
        timestamp: '5h ago',
        likes: 14,
      },
      {
        id: 'c3',
        author: 'Hamza Khan (Islamabad)',
        initial: 'H',
        authorColor: 'bg-amber-600',
        text: 'Is the per watt rate Rs. 29.5 inclusive of GST and IESCO green meter testing barcode?',
        timestamp: '1d ago',
        likes: 8,
      },
      {
        id: 'c4',
        author: 'Pak Solar Traders (Karachi)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Container stock arrived at Karachi Port Qasim. Full pallet price: Rs. 620,000 for 36 plates.',
        timestamp: '2d ago',
        likes: 19,
      }
    ]
  },
  {
    id: 'pin-jinko-tiger',
    title: 'Jinko Solar Tiger Neo N-Type 585W Bifacial Double-Glass Solar Panel',
    description: 'Jinko Tiger Neo 72HL4-BDV with SMBB multi-busbar technology and anti-PID certification. Delivers up to 30% additional yield from ground albedo reflection.',
    imageUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=85',
    isLastVisited: true,
    author: {
      name: 'Jinko Official Partner PK',
      initial: 'J',
      bgColor: 'bg-blue-600',
      followers: '8.9k'
    },
    saves: 312,
    tags: ['solar-panel', 'jinko-tiger-neo', 'price-pkr', '585w', 'bifacial'],
    solarPrice: {
      brand: 'Jinko Solar (Tiger Neo)',
      model: 'JKM585N-72HL4-BDV 585W',
      wattage: 585,
      pricePerWattPkr: 31.0,
      pricePerPlatePkr: 18135,
      technology: 'N-Type TOPCon',
      systemSizeKw: 5,
      estimatedSystemCostPkr: 620000,
      inverterRecommendation: 'Inverex Yukon 5.2kW / Knox 6kW',
      monthlySavingsPkr: 38000,
      warrantyYears: '15 Yrs Product / 30 Yrs Linear',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-canadian-600',
    title: 'Canadian Solar TopHiKu6 N-Type 600W Mono-Crystalline Solar Plate',
    description: 'Ultra-high power Canadian Solar 600W module designed for large residential & agricultural tube well systems. Super low degradation rate of 0.4% per year.',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Canadian Solar Distributor PK',
      initial: 'C',
      bgColor: 'bg-red-600',
      followers: '11.4k'
    },
    saves: 425,
    tags: ['solar-panel', 'canadian-solar', '600w', 'price-pkr', 'tube-well'],
    solarPrice: {
      brand: 'Canadian Solar',
      model: 'CS6W-600T (TopHiKu6)',
      wattage: 600,
      pricePerWattPkr: 30.5,
      pricePerPlatePkr: 18300,
      technology: 'N-Type TOPCon',
      systemSizeKw: 15,
      estimatedSystemCostPkr: 1590000,
      inverterRecommendation: 'Huawei 15KTL / Growatt 15kW',
      monthlySavingsPkr: 110000,
      warrantyYears: '12 Yrs Product / 25 Yrs Performance',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-ja-solar-580',
    title: 'JA Solar DeepBlue 4.0 Pro 580W N-Type Half-Cell Solar Panel',
    description: 'JA Solar JAM72D40 with Bycium+ cell technology. Outstanding weak-light performance during foggy winter days in Punjab and cloudy monsoon seasons.',
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Solar Hub Faisalabad',
      initial: 'S',
      bgColor: 'bg-emerald-600',
      followers: '6.2k'
    },
    saves: 218,
    tags: ['solar-panel', 'ja-solar', '580w', 'price-pkr', 'half-cell'],
    solarPrice: {
      brand: 'JA Solar',
      model: 'JAM72D40-580/GB',
      wattage: 580,
      pricePerWattPkr: 29.0,
      pricePerPlatePkr: 16820,
      technology: 'N-Type TOPCon',
      systemSizeKw: 5,
      estimatedSystemCostPkr: 590000,
      inverterRecommendation: 'Inverex Veyron II 6kW / Knox 6kW',
      monthlySavingsPkr: 36000,
      warrantyYears: '12 Yrs Product / 30 Yrs Linear Power',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-trina-vertex',
    title: 'Trina Solar Vertex N 595W-600W Dual-Glass Bifacial Solar Panel',
    description: 'Trina Solar 210mm silicon wafer Vertex module with high structural load tolerance (5400 Pa front / 2400 Pa back). Tier-1 Bloomberg rated.',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-8b8353f473c2?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Apex Green Energy PK',
      initial: 'T',
      bgColor: 'bg-indigo-600',
      followers: '9.1k'
    },
    saves: 345,
    tags: ['solar-panel', 'trina-solar', '600w', 'price-pkr', 'vertex'],
    solarPrice: {
      brand: 'Trina Solar',
      model: 'TSM-NEG19RC.20 Vertex N',
      wattage: 600,
      pricePerWattPkr: 31.5,
      pricePerPlatePkr: 18900,
      technology: 'N-Type TOPCon',
      systemSizeKw: 10,
      estimatedSystemCostPkr: 1120000,
      inverterRecommendation: 'FoxESS / Solis 10kW On-Grid',
      monthlySavingsPkr: 74000,
      warrantyYears: '15 Yrs Product / 30 Yrs Power',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-astronergy-585',
    title: 'Astronergy Astro N5s 585W TOPCon High-Density Solar Plate',
    description: 'Astronergy CHSM72N bifacial module featuring zero busbar micro-gap interconnection, maximizing rooftop surface area for 5kW & 10kW homes.',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Chint Solar Pakistan',
      initial: 'A',
      bgColor: 'bg-violet-600',
      followers: '4.8k'
    },
    saves: 184,
    tags: ['solar-panel', 'astronergy', '585w', 'price-pkr'],
    solarPrice: {
      brand: 'Astronergy (Chint)',
      model: 'CHSM72N(DG)/F-BH 585W',
      wattage: 585,
      pricePerWattPkr: 29.0,
      pricePerPlatePkr: 16965,
      technology: 'N-Type TOPCon',
      systemSizeKw: 7,
      estimatedSystemCostPkr: 820000,
      inverterRecommendation: 'Knox 8kW Hybrid / Solis 4G',
      monthlySavingsPkr: 52000,
      warrantyYears: '12 Yrs Product / 25 Yrs Performance',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-risen-titan',
    title: 'Risen Energy Titan N-Type 590W Monocrystalline Solar Panel',
    description: 'Risen Energy 132-half-cut cell Titan Series with low temperature coefficient (-0.30%/°C) ensuring optimal generation during peak summer afternoons.',
    imageUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Rawalpindi Solar Importers',
      initial: 'R',
      bgColor: 'bg-amber-600',
      followers: '5.3k'
    },
    saves: 276,
    tags: ['solar-panel', 'risen-solar', '590w', 'price-pkr'],
    solarPrice: {
      brand: 'Risen Energy',
      model: 'RSM132-8-590N Titan',
      wattage: 590,
      pricePerWattPkr: 29.5,
      pricePerPlatePkr: 17405,
      technology: 'N-Type TOPCon',
      systemSizeKw: 10,
      estimatedSystemCostPkr: 1090000,
      inverterRecommendation: 'Inverex Yukon 10kW / Nitrox',
      monthlySavingsPkr: 73000,
      warrantyYears: '12 Yrs Product / 25 Yrs Linear',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-inverter-nitrox',
    title: 'Inverex Nitrox 10kW 3-Phase Hybrid Solar Inverter (IP65)',
    description: 'Pure sine wave IP65 waterproof inverter with dual MPPT trackers, built-in Wi-Fi monitoring, generator input, and seamless LiFePO4 battery communication.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Inverex Power Pakistan',
      initial: 'I',
      bgColor: 'bg-teal-600',
      followers: '22.1k'
    },
    saves: 612,
    tags: ['inverter', 'nitrox-10kw', 'hybrid', 'price-pkr'],
    solarPrice: {
      brand: 'Inverex (Nitrox)',
      model: '10kW-3P-EU Hybrid IP65',
      wattage: 10000,
      pricePerWattPkr: 28.5,
      pricePerPlatePkr: 285000,
      technology: 'N-Type TOPCon',
      systemSizeKw: 10,
      estimatedSystemCostPkr: 1250000,
      inverterRecommendation: 'Connects to 18x 585W Solar Panels',
      monthlySavingsPkr: 76000,
      warrantyYears: '5 Years Official Warranty',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-residential-rooftop',
    title: '10kW Residential Rooftop Solar Installation with 585W Panels (Lahore DHA)',
    description: 'Complete elevated L3 structure installation with 18x Longi 585W bifacial solar panels, LESCO green meter Net Metering, and lightning protection.',
    imageUrl: 'https://images.unsplash.com/photo-1548611716-ad9914c62257?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'DHA Solar Engineers',
      initial: 'D',
      bgColor: 'bg-rose-600',
      followers: '7.8k'
    },
    saves: 389,
    tags: ['rooftop-solar', '10kw-system', 'lahore', 'price-pkr'],
    solarPrice: {
      brand: 'Turn-Key 10kW System',
      model: '18x 585W + Nitrox 10kW',
      wattage: 10530,
      pricePerWattPkr: 30.0,
      pricePerPlatePkr: 17250,
      technology: 'N-Type TOPCon',
      systemSizeKw: 10,
      estimatedSystemCostPkr: 1120000,
      inverterRecommendation: 'Nitrox 10kW 3-Phase',
      monthlySavingsPkr: 75000,
      warrantyYears: '25 Yrs Panels / 5 Yrs Inverter',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  },
  {
    id: 'pin-commercial-50kw',
    title: '50kW Industrial Factory Solar Power Plant with Trina 600W Panels (Karachi SITE)',
    description: 'Turn-key 50kW commercial grid-tied solar project reducing monthly industrial electricity bill from Rs. 450,000 to under Rs. 90,000.',
    imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=85',
    author: {
      name: 'Sindh Industrial Solar',
      initial: 'K',
      bgColor: 'bg-cyan-600',
      followers: '13.5k'
    },
    saves: 512,
    tags: ['commercial-solar', '50kw-plant', 'trina-600w', 'price-pkr'],
    solarPrice: {
      brand: 'Trina Solar + Huawei',
      model: '84x 600W + Huawei 50KTL',
      wattage: 50400,
      pricePerWattPkr: 31.5,
      pricePerPlatePkr: 18900,
      technology: 'N-Type TOPCon',
      systemSizeKw: 50,
      estimatedSystemCostPkr: 4850000,
      inverterRecommendation: 'Huawei SUN2000-50KTL',
      monthlySavingsPkr: 360000,
      warrantyYears: '25 Yrs Performance',
      tier: 'Tier 1',
      stockStatus: 'In Stock (Karachi/Lahore/ISB)'
    },
    comments: []
  }
];

export const pakistanMarketRates = {
  lastUpdated: 'August 2026',
  currency: 'PKR',
  currentAveragePerWatt: 30.5,
  tier1Brands: [
    { name: 'Longi Hi-MO X6/7 (585W)', perWatt: 29.5, perPlate: 17250, change: '-1.2%' },
    { name: 'Jinko Tiger Neo N-Type (585W)', perWatt: 31.0, perPlate: 18135, change: '-0.8%' },
    { name: 'Canadian TopHiKu6 (600W)', perWatt: 30.5, perPlate: 18300, change: '0.0%' },
    { name: 'JA Solar DeepBlue 4.0 (580W)', perWatt: 29.0, perPlate: 16820, change: '-1.5%' },
    { name: 'Trina Vertex N (600W)', perWatt: 31.5, perPlate: 18900, change: '+0.5%' },
  ],
  systemPackages: [
    { size: '3 kW On-Grid', plates: '5x 600W', costPkr: '390,000 - 450,000', unitsPerMonth: '350 - 400', monthlySavings: 'Rs. 22,000' },
    { size: '5 kW Hybrid', plates: '9x 585W', costPkr: '620,000 - 710,000', unitsPerMonth: '600 - 700', monthlySavings: 'Rs. 38,000' },
    { size: '10 kW On-Grid (Net Metered)', plates: '17x 585W', costPkr: '1,080,000 - 1,220,000', unitsPerMonth: '1,200 - 1,400', monthlySavings: 'Rs. 75,000' },
    { size: '15 kW On-Grid', plates: '25x 600W', costPkr: '1,590,000 - 1,750,000', unitsPerMonth: '1,800 - 2,100', monthlySavings: 'Rs. 115,000' },
    { size: '20 kW Commercial', plates: '34x 585W', costPkr: '2,050,000 - 2,290,000', unitsPerMonth: '2,400 - 2,800', monthlySavings: 'Rs. 155,000' },
  ]
};

