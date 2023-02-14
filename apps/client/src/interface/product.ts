export interface Product {
  id: string;
  title: string;
  description?: string;
  brand?: string;
  image: string;
  // images: string[];

  price: number;
  oldPrice?: number;
  sold: number;
  quantity: number;
  
  category?: string;
  subCategory?: string;
  
  status: string;
  airedAt: string;
  createdAt: string;
  updatedAt: string;
}