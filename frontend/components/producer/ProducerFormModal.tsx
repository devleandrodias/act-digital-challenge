"use client";

import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validateDocument } from "@/utils/utils";
import { Producer } from "@/types/producer.types";
import { useProducer } from "@/hooks/useProducer";
import { useProducerContext } from "@/contexts/ProducerContext";

// TODO: Trocar para usar o Form

export function ProducerFormModal() {
  const producer: Producer | null = null;

  const ctxProducer = useProducerContext();

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [documentError, setDocumentError] = useState("");

  const { createProducerMutation } = useProducer();

  const handleDocumentChange = (value: string) => {
    setDocument(value);
    setDocumentError("");
  };

  const handleSubmit = async () => {
    const error = validateDocument(document);

    if (error) {
      setDocumentError(error);
      return;
    }

    await createProducerMutation.mutateAsync({
      name,
      document: document.replace(/\D/g, ""),
    });

    ctxProducer.setProducerModalOpen(false);
  };

  return (
    <Dialog
      open={ctxProducer.producerModalOpen}
      onOpenChange={ctxProducer.setProducerModalOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {producer ? "Editar Produtor" : "Novo Produtor"}
          </DialogTitle>
          <DialogDescription>
            {producer
              ? "Edite as informações do produtor rural"
              : "Preencha as informações para cadastrar um novo produtor rural"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produtor"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="document">CPF/CNPJ</Label>
            <Input
              id="document"
              value={document}
              onChange={(e) => handleDocumentChange(e.target.value)}
              placeholder="CPF ou CNPJ do produtor"
              className={documentError ? "border-red-500" : ""}
            />
            {documentError && (
              <p className="text-sm text-red-500">{documentError}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => ctxProducer.setProducerModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name || !document || !!documentError}
            className="bg-green-600 hover:bg-green-700"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
