"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import { useFarm } from "@/hooks/useFarm";
import { brazilianStates } from "@/lib/constants";
import { useProducerContext } from "@/contexts/ProducerContext";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const farmFormSchema = z.object({
  name: z.string().min(1, "Nome não pode ser vazio"),
  city: z.string().min(1, "Cidade não pode ser vazio"),
  state: z.string().min(1, "Estado não pode ser vazio"),
  totalArea: z.string().min(1, "Área total não pode ser vazio"),
  agriculturalArea: z.string().min(1, "Área agrícola não pode ser vazio"),
  vegetationArea: z.string().min(1, "Área de vegetação não pode ser vazio"),
});

type FarmFormValues = z.infer<typeof farmFormSchema>;

export function FarmFormModal() {
  const ctxProducer = useProducerContext();

  const { createFarmMutation, updateFarmMutation } = useFarm();

  const form = useForm<FarmFormValues>({
    resolver: zodResolver(farmFormSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "",
      totalArea: "",
      vegetationArea: "",
      agriculturalArea: "",
    },
  });

  async function onSubmit(values: FarmFormValues) {
    if (ctxProducer.producerSelected) {
      if (!ctxProducer.farmSelected) {
        await createFarmMutation.mutateAsync({
          name: values.name,
          city: values.city,
          state: values.state,
          totalArea: Number(values.totalArea),
          vegetationArea: Number(values.vegetationArea),
          agriculturalArea: Number(values.agriculturalArea),
          producerId: ctxProducer.producerSelected.id,
        });
      }

      if (ctxProducer.farmSelected) {
        await updateFarmMutation.mutateAsync({
          id: ctxProducer.farmSelected.id,
          name: values.name,
          city: values.city,
          state: values.state,
          totalArea: Number(values.totalArea),
          vegetationArea: Number(values.vegetationArea),
          agriculturalArea: Number(values.agriculturalArea),
        });
      }
    }

    ctxProducer.setFarmFormModalOpen(false);

    form.reset();
  }

  useEffect(() => {
    form.reset();
    form.setValue("name", ctxProducer.farmSelected?.name ?? "");
    form.setValue("city", ctxProducer.farmSelected?.city ?? "");
    form.setValue("state", ctxProducer.farmSelected?.state ?? "");
    form.setValue(
      "totalArea",
      String(ctxProducer.farmSelected?.totalArea) ?? ""
    );
    form.setValue(
      "agriculturalArea",
      String(ctxProducer.farmSelected?.agriculturalArea) ?? ""
    );
    form.setValue(
      "vegetationArea",
      String(ctxProducer.farmSelected?.vegetationArea) ?? ""
    );
  }, [ctxProducer.farmSelected, form]);

  return (
    <Dialog
      open={ctxProducer.farmFormModalOpen}
      onOpenChange={ctxProducer.setFarmFormModalOpen}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nova Propriedade Rural</DialogTitle>
          <DialogDescription>
            Preencha as informações da fazenda
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Fazenda</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nome da propriedade rural"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Cidade" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="totalArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área Total (ha)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0.00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="vegetationArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área Vegetal (ha)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0.00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="agriculturalArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área Agricultável (ha)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0.00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              ctxProducer.setFarmFormModalOpen(false);
              ctxProducer.setFarmSelected(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            onClick={form.handleSubmit(onSubmit)}
          >
            {ctxProducer.farmSelected ? "Atualizar" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
