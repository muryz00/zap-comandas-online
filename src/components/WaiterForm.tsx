
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Waiter } from "../types";

interface WaiterFormProps {
  onAddWaiter: (waiter: Waiter) => void;
}

export function WaiterForm({ onAddWaiter }: WaiterFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Digite o nome do atendente");
      return;
    }

    const newWaiter: Waiter = {
      id: uuidv4(),
      name,
    };

    onAddWaiter(newWaiter);
    setName("");
    toast.success("Atendente adicionado com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Atendente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome do Atendente
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João"
            />
          </div>

          <Button type="submit" className="w-full">
            Adicionar Atendente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
