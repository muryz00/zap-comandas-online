
import { useOrder } from "../context/OrderContext";

export function Header() {
  const { selectedWaiter, currentOrder } = useOrder();

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ZAP Comandas</h1>
          <p className="text-sm opacity-80">Sistema de comandas via WhatsApp</p>
        </div>
        {selectedWaiter && (
          <div className="text-right">
            <p className="text-sm opacity-80">Atendente</p>
            <p className="font-medium">{selectedWaiter.name}</p>
            {currentOrder && (
              <div className="text-xs mt-1 bg-white/20 px-2 py-1 rounded-md">
                Pedido #{currentOrder.id.substring(0, 8)}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
