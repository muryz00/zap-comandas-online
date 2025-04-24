
import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon, MinusIcon, PlusIcon, Send, WhatsappIcon } from "lucide-react";
import { formatPhoneNumber } from "../utils/formatters";
import { toast } from "sonner";

export function OrderSummary() {
  const { 
    currentOrder, 
    removeItemFromOrder, 
    updateItemQuantity,
    setTableNumber,
    setCustomerName,
    resetOrder 
  } = useOrder();
  
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!currentOrder) {
    return null;
  }

  const handleSendToWhatsApp = () => {
    if (currentOrder.items.length === 0) {
      toast.error("Adicione itens ao pedido antes de enviar.");
      return;
    }

    if (!phoneNumber) {
      toast.error("Informe o número de WhatsApp para enviar o pedido.");
      return;
    }

    try {
      const formattedNumber = phoneNumber.replace(/\D/g, "");
      
      // Create the order message
      let message = `*Novo Pedido*\n\n`;
      message += `*Atendente:* ${currentOrder.waiterName}\n`;
      
      if (currentOrder.tableNumber) {
        message += `*Mesa:* ${currentOrder.tableNumber}\n`;
      }
      
      if (currentOrder.customerName) {
        message += `*Cliente:* ${currentOrder.customerName}\n`;
      }
      
      message += `\n*Itens do Pedido:*\n`;
      
      currentOrder.items.forEach((item, index) => {
        message += `${index + 1}. ${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
      });
      
      message += `\n*Total:* R$ ${currentOrder.total.toFixed(2)}`;
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create the WhatsApp URL
      const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new window
      window.open(whatsappURL, "_blank");
      
      toast.success("Pedido enviado para o WhatsApp!");
      resetOrder();
      
    } catch (error) {
      toast.error("Erro ao enviar para o WhatsApp. Tente novamente.");
      console.error("WhatsApp send error:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="table" className="text-sm font-medium">
              Mesa
            </label>
            <Input
              id="table"
              placeholder="Número da mesa"
              value={currentOrder.tableNumber || ""}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="customer" className="text-sm font-medium">
              Cliente
            </label>
            <Input
              id="customer"
              placeholder="Nome do cliente"
              value={currentOrder.customerName || ""}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            WhatsApp para Envio
          </label>
          <Input
            id="phone"
            placeholder="(99) 99999-9999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            maxLength={15}
          />
        </div>

        <div className="border rounded-md">
          {currentOrder.items.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Nenhum item adicionado
            </div>
          ) : (
            <div className="divide-y">
              {currentOrder.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      R$ {item.product.price.toFixed(2)} cada
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateItemQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <MinusIcon className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateItemQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => removeItemFromOrder(item.product.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full text-lg font-bold">
          <span>Total:</span>
          <span>R$ {currentOrder.total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={handleSendToWhatsApp}
        >
          <WhatsappIcon className="mr-2 h-5 w-5" />
          Enviar para WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
