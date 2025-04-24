
import { createContext, useContext, useState, ReactNode } from "react";
import { Order, OrderItem, Product, Waiter } from "../types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface OrderContextType {
  currentOrder: Order | null;
  selectedWaiter: Waiter | null;
  setSelectedWaiter: (waiter: Waiter) => void;
  addItemToOrder: (product: Product) => void;
  removeItemFromOrder: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  setTableNumber: (tableNumber: string) => void;
  setCustomerName: (customerName: string) => void;
  resetOrder: () => void;
  createNewOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter | null>(null);

  const createNewOrder = () => {
    if (!selectedWaiter) {
      toast.error("Selecione um atendente antes de criar um pedido.");
      return;
    }

    setCurrentOrder({
      id: uuidv4(),
      items: [],
      waiterName: selectedWaiter.name,
      timestamp: new Date(),
      total: 0,
    });
  };

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const addItemToOrder = (product: Product) => {
    if (!currentOrder) {
      toast.error("Crie um novo pedido primeiro.");
      return;
    }

    setCurrentOrder(prev => {
      if (!prev) return prev;

      // Check if product already exists in order
      const existingItemIndex = prev.items.findIndex(item => item.product.id === product.id);

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Increment quantity if product already exists
        updatedItems = [...prev.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
      } else {
        // Add new item if product doesn't exist in order
        updatedItems = [...prev.items, { product, quantity: 1 }];
      }

      return {
        ...prev,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
    
    toast.success(`${product.name} adicionado ao pedido`);
  };

  const removeItemFromOrder = (productId: string) => {
    if (!currentOrder) return;

    setCurrentOrder(prev => {
      if (!prev) return prev;

      const updatedItems = prev.items.filter(item => item.product.id !== productId);
      
      return {
        ...prev,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (!currentOrder) return;
    if (quantity <= 0) {
      removeItemFromOrder(productId);
      return;
    }

    setCurrentOrder(prev => {
      if (!prev) return prev;

      const updatedItems = prev.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      return {
        ...prev,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  const setTableNumber = (tableNumber: string) => {
    if (!currentOrder) return;

    setCurrentOrder(prev => {
      if (!prev) return prev;
      return { ...prev, tableNumber };
    });
  };

  const setCustomerName = (customerName: string) => {
    if (!currentOrder) return;

    setCurrentOrder(prev => {
      if (!prev) return prev;
      return { ...prev, customerName };
    });
  };

  const resetOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        selectedWaiter,
        setSelectedWaiter,
        addItemToOrder,
        removeItemFromOrder,
        updateItemQuantity,
        setTableNumber,
        setCustomerName,
        resetOrder,
        createNewOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
