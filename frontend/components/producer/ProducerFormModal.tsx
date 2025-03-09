"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { documentIsValid } from "@/utils/utils";
import { useProducer } from "@/hooks/useProducer";
import { useProducerContext } from "@/contexts/ProducerContext";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

const producerFormSchema = z
  .object({
    name: z.string().min(1, "Nome não pode ser vazio"),
    document: z.string().min(2, "Documento não pode ser vazio"),
  })
  .refine((data) => documentIsValid(data.document), {
    message: "O documento informado é inválido",
    path: ["document"],
  });

type ProducerFormValues = z.infer<typeof producerFormSchema>;

export function ProducerFormModal() {
  const ctxProducer = useProducerContext();

  const { createProducerMutation, updateProducerMutation } = useProducer();

  const form = useForm<ProducerFormValues>({
    resolver: zodResolver(producerFormSchema),
    defaultValues: {
      name: "",
      document: "",
    },
  });

  async function onSubmit(values: ProducerFormValues) {
    if (!ctxProducer.producerSelected) {
      await createProducerMutation.mutateAsync({
        name: values.name,
        document: values.document.replace(/\D/g, ""),
      });
    }

    if (ctxProducer.producerSelected) {
      await updateProducerMutation.mutateAsync({
        id: ctxProducer.producerSelected.id,
        name: values.name,
        document: values.document.replace(/\D/g, ""),
      });
    }

    ctxProducer.setProducerModalOpen(false);

    form.reset();
  }

  useEffect(() => {
    form.reset();
    form.setValue("name", ctxProducer.producerSelected?.name ?? "");
    form.setValue("document", ctxProducer.producerSelected?.document ?? "");
  }, [ctxProducer.producerSelected, form]);

  return (
    <Dialog
      open={ctxProducer.producerModalOpen}
      onOpenChange={ctxProducer.setProducerModalOpen}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {ctxProducer.producerSelected ? "Editar Produtor" : "Novo Produtor"}
          </DialogTitle>
          <DialogDescription>
            {ctxProducer.producerSelected
              ? "Edite as informações do produtor rural"
              : "Preencha as informações para cadastrar um novo produtor rural"}
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
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome do produtor" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF/CNPJ</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o CPF ou CNPJ" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              ctxProducer.setProducerSelected(null);
              ctxProducer.setProducerModalOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            onClick={form.handleSubmit(onSubmit)}
          >
            {ctxProducer.producerSelected ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
