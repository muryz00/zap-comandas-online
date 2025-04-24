
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  waiterName: string;
  tableNumber?: string;
  customerName?: string;
  timestamp: Date;
  total: number;
}

export interface Waiter {
  id: string;
  name: string;
}
