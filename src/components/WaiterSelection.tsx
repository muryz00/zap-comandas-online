
import { useOrder } from "../context/OrderContext";
import { waiters } from "../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";

export function WaiterSelection() {
  const { selectedWaiter, setSelectedWaiter } = useOrder();

  return (
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
  );
}
