import { User } from "@supabase/supabase-js";
import { Product } from "./product";

export type UserContextType = {
  user?: User;
  accessToken?: string;
  loading: boolean;
  address?: string;
  basket: {info: Product, quantity: number}[];
  actions?: {
    openBasket: () => void;
    addToBasket: (item: Product, quant?:number) => void;
    removeFromBasket: (item: Product) => void;
    signInOpen: () => void;
    refreshSession: () => void;
    createOrder: () => void;
    signIn: (provider: "google" | "facebook") => void;
    logout: () => Promise<void>;
    setAddress: (value:string) => void;
  }
}