export type CategoryType = 'all' | 'lighting' | 'climate' | 'unified' | 'hubs';

export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'lighting' | 'climate' | 'unified' | 'hubs';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  finishes: ProductFinish[];
  leadTime: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: ProductFinish;
}

export interface AtmospherePreset {
  id: string;
  name: string;
  lightingTemp: number; // in Kelvin
  brightness: number; // 0-100%
  temperature: number; // in Fahrenheit
  humidity: number; // percentage
  modeDescription: string;
  glowColor: string;
}
