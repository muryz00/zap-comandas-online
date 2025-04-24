
import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "../types";
import { ProductForm } from "./ProductForm";

export function ProductList() {
  const { addItemToOrder } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="space-y-6">
      <ProductForm onAddProduct={handleAddProduct} />
      
      {products.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Produtos</span>
              <div className="relative w-1/2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar produtos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="w-full mb-4 overflow-auto flex whitespace-nowrap">
                <TabsTrigger 
                  value="all" 
                  className="flex-shrink-0"
                  onClick={() => setActiveCategory("all")}
                >
                  Todos
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="flex-shrink-0"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeCategory === "all" ? "all" : activeCategory} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <Button
                      key={product.id}
                      variant="outline"
                      className="h-auto flex flex-col items-center justify-center p-2 hover:border-primary"
                      onClick={() => addItemToOrder(product)}
                    >
                      <span className="font-medium text-sm line-clamp-1">{product.name}</span>
                      <span className="text-primary font-bold">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
