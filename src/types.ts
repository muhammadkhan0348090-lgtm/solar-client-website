export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  authorInitial?: string;
  initial?: string;
  authorColor?: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface SolarPriceDetails {
  brand?: string;
  model?: string;
  wattage?: number; // e.g. 585W
  pricePerWattPkr?: number; // e.g. 31 PKR / watt
  pricePerPlatePkr?: number; // e.g. 18,135 PKR
  technology?: 'N-Type TOPCon' | 'Bifacial' | 'P-Type PERC' | 'HJT';
  systemSizeKw?: number; // e.g. 10 kW
  estimatedSystemCostPkr?: number; // e.g. 1,050,000 PKR
  inverterRecommendation?: string;
  monthlySavingsPkr?: number;
  warrantyYears?: string;
  tier?: 'Tier 1' | 'Tier 2';
  stockStatus?: 'In Stock (Karachi/Lahore/ISB)' | 'Available on Order' | 'Limited Stock';
}

export interface PinItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  author: {
    name: string;
    avatar?: string;
    initial?: string;
    bgColor?: string;
    followers?: string;
  };
  duration?: string;
  isLastVisited?: boolean;
  comments: Comment[];
  category?: string;
  saves?: number;
  tags?: string[];
  solarPrice?: SolarPriceDetails;
}

