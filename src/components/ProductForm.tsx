
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../types";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.error("Preencha todos os campos");
      return;
    }

    const newProduct: Product = {
      id: uuidv4(),
      name,
      price: Number(price),
      category,
    };

    onAddProduct(newProduct);
    setName("");
    setPrice("");
    setCategory("");
    toast.success("Produto adicionado com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField name="name">
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: X-Burger"
              />
            </FormItem>
          </FormField>

          <FormField name="price">
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 15.90"
              />
            </FormItem>
          </FormField>

          <FormField name="category">
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Food"
              />
            </FormItem>
          </FormField>

          <Button type="submit" className="w-full">
            Adicionar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
