
// One market's price information
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}


// Price change information
export interface Change {
  dir: "up" | "down";
  pct: number;
}


// Product information
export interface Product {
  id: number;
  slug: string;

  nameBn: string;

  category: string;
  categoryNameBn: string;
  categoryIcon: string;

  unit: string;

  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: Change;

  markets: Market[];
}


// Category information
export interface Category {
  id?: string | number;
  slug: string;
  nameBn: string;
  icon?: string;
}


// API response for products
export interface ProductsResponse {
  products: Product[];
}


// API response for a single product
export interface ProductResponse {
  product: Product;
}


// API response for categories
export interface CategoriesResponse {
  categories: Category[];
}
