import type { Metadata } from "next";
import Dashboard from "@/components/dashboard";
import { ProducerProvider } from "@/contexts/ProducerContext";

export const metadata: Metadata = {
  title: "Brain Agriculture - Dashboard",
  description: "Gerenciamento de produtores rurais e suas propriedades",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <ProducerProvider>
          <Dashboard />
        </ProducerProvider>
      </main>
    </div>
  );
}
