"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "@/lib/uuid";
import { brazilianStates } from "@/lib/constants";

interface FarmModalProps {
  producerId: string;
  onClose: () => void;
  onSave: (producerId: string, farm: any) => void;
}

export function FarmModal({ producerId, onClose, onSave }: FarmModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [agriculturalArea, setAgriculturalArea] = useState("");
  const [vegetationArea, setVegetationArea] = useState("");
  const [areaError, setAreaError] = useState("");

  const validateAreas = () => {
    const total = Number.parseFloat(totalArea);
    const agricultural = Number.parseFloat(agriculturalArea);
    const vegetation = Number.parseFloat(vegetationArea);

    if (isNaN(total) || total <= 0) {
      return "A área total deve ser um número positivo";
    }

    if (isNaN(agricultural) || agricultural < 0) {
      return "A área agricultável deve ser um número não negativo";
    }

    if (isNaN(vegetation) || vegetation < 0) {
      return "A área de vegetação deve ser um número não negativo";
    }

    if (agricultural + vegetation > total) {
      return "A soma das áreas agricultável e de vegetação não pode ultrapassar a área total";
    }

    return "";
  };

  const handleAreaChange = () => {
    const error = validateAreas();
    setAreaError(error);
  };

  const handleSubmit = () => {
    const error = validateAreas();
    if (error) {
      setAreaError(error);
      return;
    }

    onSave(producerId, {
      id: uuidv4(),
      name,
      city,
      state,
      totalArea: Number.parseFloat(totalArea),
      agriculturalArea: Number.parseFloat(agriculturalArea),
      vegetationArea: Number.parseFloat(vegetationArea),
      harvests: [],
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Propriedade Rural</DialogTitle>
          <DialogDescription>
            Preencha as informações da fazenda
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Fazenda</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da propriedade rural"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cidade"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">Estado</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalArea">Área Total (ha)</Label>
              <Input
                id="totalArea"
                type="number"
                min="0"
                step="0.01"
                value={totalArea}
                onChange={(e) => {
                  setTotalArea(e.target.value);
                  setTimeout(() => handleAreaChange(), 0);
                }}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agriculturalArea">Área Agricultável (ha)</Label>
              <Input
                id="agriculturalArea"
                type="number"
                min="0"
                step="0.01"
                value={agriculturalArea}
                onChange={(e) => {
                  setAgriculturalArea(e.target.value);
                  setTimeout(() => handleAreaChange(), 0);
                }}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vegetationArea">Área de Vegetação (ha)</Label>
              <Input
                id="vegetationArea"
                type="number"
                min="0"
                step="0.01"
                value={vegetationArea}
                onChange={(e) => {
                  setVegetationArea(e.target.value);
                  setTimeout(() => handleAreaChange(), 0);
                }}
                placeholder="0.00"
              />
            </div>
          </div>

          {areaError && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md border border-red-200">
              <strong>Erro:</strong> {areaError}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name || !city || !state || !totalArea || !!areaError}
            className="bg-green-600 hover:bg-green-700"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
