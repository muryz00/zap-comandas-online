
import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { WaiterForm } from "./WaiterForm";
import { Waiter } from "../types";

export function WaiterSelection() {
  const { selectedWaiter, setSelectedWaiter } = useOrder();
  const [waiters, setWaiters] = useState<Waiter[]>([]);

  const handleAddWaiter = (waiter: Waiter) => {
    setWaiters([...waiters, waiter]);
  };

  return (
    <div className="space-y-6">
      <WaiterForm onAddWaiter={handleAddWaiter} />
      
      {waiters.length > 0 && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Selecione o Atendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {waiters.map((waiter) => (
                <Button
                  key={waiter.id}
                  variant={selectedWaiter?.id === waiter.id ? "default" : "outline"}
                  className="h-16 flex flex-col items-center justify-center gap-1"
                  onClick={() => setSelectedWaiter(waiter)}
                >
                  <UserIcon size={20} />
                  <span>{waiter.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
