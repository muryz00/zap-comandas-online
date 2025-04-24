
import { useOrder } from "../context/OrderContext";
import { ProductList } from "./ProductList";
import { OrderSummary } from "./OrderSummary";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function OrderPage() {
  const { currentOrder, createNewOrder } = useOrder();

  return (
    <div className="container mx-auto py-6 space-y-6">
      {!currentOrder ? (
        <div className="flex justify-center">
          <Button size="lg" onClick={createNewOrder}>
            <PlusIcon className="mr-2 h-5 w-5" />
            Novo Pedido
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProductList />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
}
