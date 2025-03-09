"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Tractor, MapPin, Sprout } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CropChart } from "@/components/dashboard/charts/DashboardCropChart";
import { StateChart } from "@/components/dashboard/charts/DashboardStateChart";
import { LandUseChart } from "@/components/dashboard/charts/DashboardLandUseChart";

import { ProducerFormModal } from "@/components/producer/ProducerFormModal";
import { ProducerListCards } from "@/components/producer/ProducerListCards";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getDashboardData } from "@/services/dashboard.service";
import { useProducerContext } from "@/contexts/ProducerContext";

import { Pending } from "../penfing";
import { ErrorMessage } from "../error";
import { FarmFormModal } from "../producer/farm/FarmFormModal";
import { FarmListModal } from "../producer/farm/FarmListModal";
import { FarmDetailsModal } from "../producer/farm/FarmDetailsModal";

export default function Dashboard() {
  const ctxProducer = useProducerContext();

  const { data, isPending, isError } = useQuery({
    retry: 2,
    queryKey: ["dashboardData"],
    queryFn: () => {
      return getDashboardData();
    },
  });

  if (isPending) {
    return <Pending />;
  }

  if (isError) {
    return <ErrorMessage message="Erro ao carregar dados do dashboard" />;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="bg-green-50 text-green-800">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-white"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="producers"
                className="data-[state=active]:bg-white"
              >
                Produtores
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => ctxProducer.setProducerModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 sm:ml-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Produtor
            </Button>
          </div>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-4">
            {/* Cards Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Fazendas
                  </CardTitle>
                  <Tractor className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {data.data.totalFarms}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Propriedades rurais cadastradas
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Área Total
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {data.data.totalArea} ha
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hectares registrados
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Culturas
                  </CardTitle>
                  <Sprout className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {data.data.totalCrops}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tipos de culturas plantadas
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Por Estado</CardTitle>
                  <CardDescription>
                    Distribuição de fazendas por estado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StateChart />
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Uso do Solo</CardTitle>
                  <CardDescription>
                    Área agricultável vs. vegetação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LandUseChart totalAgricultural={1} totalVegetation={2} />
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Culturas Plantadas</CardTitle>
                  <CardDescription>
                    Distribuição por tipo de cultura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CropChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Producers */}
          <TabsContent value="producers">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Produtores Rurais</CardTitle>
                <CardDescription>
                  Gerencie os produtores e suas propriedades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProducerListCards />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FarmFormModal />
      <FarmListModal />
      <FarmDetailsModal />

      <ProducerFormModal />
    </div>
  );
}
