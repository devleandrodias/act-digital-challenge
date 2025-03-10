"use client";

import { z } from "zod";
import { X } from "lucide-react";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { commonCrops } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useHarvest } from "@/hooks/useHarvest";
import { useProducerContext } from "@/contexts/ProducerContext";

const harvestFormSchema = z.object({
  year: z.string().min(1, "Ano não pode ser vazio"),
  crops: z
    .array(z.object({ name: z.string() }))
    .min(1, "Selecione pelo menos uma cultura"),
});

type HarvestFormValues = z.infer<typeof harvestFormSchema>;

export function HarvestModal() {
  const ctxProducer = useProducerContext();

  const { createHarvestMutation, updateHarvestMutation } = useHarvest();

  const currentYear = new Date().getFullYear().toString();

  const form = useForm<HarvestFormValues>({
    resolver: zodResolver(harvestFormSchema),
    defaultValues: {
      year: currentYear,
      crops: [],
    },
  });

  const selectedCrops = form.watch("crops");

  const handleRemoveCrop = (name: string) => {
    const updatedCrops = selectedCrops.filter((crop) => crop.name !== name);
    form.setValue("crops", updatedCrops, { shouldValidate: true });
  };

  const handleSelectCrop = (cropName: string) => {
    if (
      !selectedCrops.some(
        (crop) => crop.name.toLowerCase() === cropName.toLowerCase()
      )
    ) {
      const newCrop = {
        name: cropName,
      };

      form.setValue("crops", [...selectedCrops, newCrop], {
        shouldValidate: true,
      });
    }
  };

  async function onSubmit(values: HarvestFormValues) {
    if (ctxProducer.producerSelected && ctxProducer.farmSelected) {
      if (!ctxProducer.harvestSelected) {
        await createHarvestMutation.mutateAsync({
          year: Number(values.year),
          crops: values.crops,
          farmId: ctxProducer.farmSelected.id,
        });
      }

      if (ctxProducer.harvestSelected) {
        console.log("update harvest", ctxProducer.harvestSelected);
        await updateHarvestMutation.mutateAsync({
          year: Number(values.year),
          crops: values.crops,
          harvestId: ctxProducer.harvestSelected.id,
        });
      }

      ctxProducer.setHarvestModalOpen(false);
    }
  }

  useEffect(() => {
    form.reset();

    form.setValue(
      "year",
      ctxProducer.harvestSelected?.year.toString() ?? currentYear
    );

    if (ctxProducer.harvestSelected?.crops) {
      form.setValue("crops", ctxProducer.harvestSelected.crops, {
        shouldValidate: true,
      });
    } else {
      form.setValue("crops", []);
    }
  }, [ctxProducer.harvestSelected, currentYear, form]);

  return (
    <Dialog
      open={ctxProducer.harvestModalOpen}
      onOpenChange={ctxProducer.setHarvestModalOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Safra</DialogTitle>
          <DialogDescription>
            Adicione uma nova safra e suas culturas
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="year">Ano da Safra</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="2000"
                        max="2100"
                        placeholder="Ano"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <FormLabel>Culturas Comuns</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {commonCrops.map((crop) => (
                    <Button
                      key={crop}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectCrop(crop)}
                      className="h-8"
                    >
                      {crop}
                    </Button>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="crops"
                render={() => (
                  <FormItem>
                    <FormLabel>Culturas Selecionadas</FormLabel>
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                      {selectedCrops.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Nenhuma cultura selecionada
                        </p>
                      ) : (
                        selectedCrops.map((crop) => (
                          <Badge
                            key={crop.name}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {crop.name}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveCrop(crop.name)}
                              className="h-4 w-4 p-0 ml-1"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </Badge>
                        ))
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => ctxProducer.setHarvestModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={form.formState.isSubmitting}
              >
                {ctxProducer.harvestSelected ? "Atualizar" : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
