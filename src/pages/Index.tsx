
import { WaiterSelection } from "../components/WaiterSelection";
import { OrderPage } from "../components/OrderPage";
import { Header } from "../components/Header";
import { OrderProvider } from "../context/OrderContext";
import { useOrder } from "../context/OrderContext";

function OrderContent() {
  const { selectedWaiter } = useOrder();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {!selectedWaiter ? <WaiterSelection /> : <OrderPage />}
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <OrderProvider>
      <OrderContent />
    </OrderProvider>
  );
};

export default Index;
