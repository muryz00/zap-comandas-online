
import { Product, Waiter } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Hamburger",
    price: 15.90,
    category: "Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
  },
  {
    id: "2",
    name: "Cheeseburger",
    price: 17.90,
    category: "Food",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=500&fit=crop"
  },
  {
    id: "3",
    name: "French Fries",
    price: 8.90,
    category: "Food",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&h=500&fit=crop"
  },
  {
    id: "4",
    name: "Coca-Cola",
    price: 5.90,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=500&fit=crop"
  },
  {
    id: "5",
    name: "Water",
    price: 3.90,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&h=500&fit=crop"
  },
  {
    id: "6",
    name: "Ice Cream",
    price: 7.90,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop"
  },
  {
    id: "7",
    name: "Pizza",
    price: 25.90,
    category: "Food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop"
  },
  {
    id: "8",
    name: "Beer",
    price: 9.90,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&h=500&fit=crop"
  }
];

export const waiters: Waiter[] = [
  { id: "1", name: "João" },
  { id: "2", name: "Maria" },
  { id: "3", name: "Pedro" },
  { id: "4", name: "Ana" },
];

export const categories = [...new Set(products.map(product => product.category))];
