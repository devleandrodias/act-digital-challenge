"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Producer } from "@/lib/types";
import { validateCPF, validateCNPJ } from "@/utils/utils";
import { v4 as uuidv4 } from "@/lib/uuid";

interface ProducerModalProps {
  producer?: Producer | null;
  onClose: () => void;
  onSave: (producer: Producer) => void;
}

export function ProducerModal({
  producer,
  onClose,
  onSave,
}: ProducerModalProps) {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [documentError, setDocumentError] = useState("");

  useEffect(() => {
    if (producer) {
      setName(producer.name);
      setDocument(producer.document);
    }
  }, [producer]);

  const validateDocument = (doc: string) => {
    // Remove non-numeric characters
    const cleanDoc = doc.replace(/\D/g, "");

    if (cleanDoc.length === 11) {
      return validateCPF(cleanDoc) ? "" : "CPF inválido";
    } else if (cleanDoc.length === 14) {
      return validateCNPJ(cleanDoc) ? "" : "CNPJ inválido";
    } else {
      return "Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)";
    }
  };

  const handleDocumentChange = (value: string) => {
    setDocument(value);
    setDocumentError("");
  };

  const handleSubmit = () => {
    const error = validateDocument(document);
    if (error) {
      setDocumentError(error);
      return;
    }

    const cleanDoc = document.replace(/\D/g, "");

    if (producer) {
      onSave({
        ...producer,
        name,
        document: cleanDoc,
      });
    } else {
      onSave({
        id: uuidv4(),
        name,
        document: cleanDoc,
        farms: [],
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
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
          <Button variant="outline" onClick={onClose}>
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
