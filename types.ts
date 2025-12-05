export type Language = 'he' | 'en';

export interface Product {
  id: number;
  name_he: string;
  name_en: string;
  price: number;
  category: string;
  img: string;
  kosher: boolean;
  vegan: boolean;
  description_he?: string;
  description_en?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'home' | 'catalog' | 'about' | 'contact';

export interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}