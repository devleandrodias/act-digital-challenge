import type { Metadata } from "next";

import Dashboard from "@/components/dashboard/dashboard";
import { Toaster } from "@/components/ui/sonner";
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
          <Toaster />
        </ProducerProvider>
      </main>
    </div>
  );
}
