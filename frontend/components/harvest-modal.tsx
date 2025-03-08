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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "@/lib/uuid";
import { commonCrops } from "@/lib/constants";

interface HarvestModalProps {
  farmId: string;
  onClose: () => void;
  onSave: (farmId: string, harvest: any) => void;
}

export function HarvestModal({ farmId, onClose, onSave }: HarvestModalProps) {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [selectedCrops, setSelectedCrops] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [newCrop, setNewCrop] = useState("");

  const handleAddCrop = () => {
    if (!newCrop.trim()) return;

    // Check if crop already exists
    if (
      !selectedCrops.some(
        (crop) => crop.name.toLowerCase() === newCrop.toLowerCase()
      )
    ) {
      setSelectedCrops([
        ...selectedCrops,
        { id: selectedCrops.length + 1, name: newCrop },
      ]);
    }

    setNewCrop("");
  };

  const handleRemoveCrop = (id: number) => {
    setSelectedCrops(selectedCrops.filter((crop) => crop.id !== id));
  };

  const handleSelectCrop = (cropName: string) => {
    if (
      !selectedCrops.some(
        (crop) => crop.name.toLowerCase() === cropName.toLowerCase()
      )
    ) {
      setSelectedCrops([
        ...selectedCrops,
        { id: selectedCrops.length + 1, name: cropName },
      ]);
    }
  };

  const handleSubmit = () => {
    onSave(farmId, {
      id: uuidv4(),
      year: Number.parseInt(year),
      crops: selectedCrops,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Safra</DialogTitle>
          <DialogDescription>
            Adicione uma nova safra e suas culturas
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="year">Ano da Safra</Label>
            <Input
              id="year"
              type="number"
              min="2000"
              max="2100"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ano"
            />
          </div>

          <div className="grid gap-2">
            <Label>Culturas Comuns</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="crop">Adicionar Cultura</Label>
            <div className="flex gap-2">
              <Input
                id="crop"
                value={newCrop}
                onChange={(e) => setNewCrop(e.target.value)}
                placeholder="Nome da cultura"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCrop();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddCrop}
                className="bg-green-600 hover:bg-green-700"
              >
                Adicionar
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Culturas Selecionadas</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
              {selectedCrops.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma cultura selecionada
                </p>
              ) : (
                selectedCrops.map((crop) => (
                  <Badge
                    key={crop.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {crop.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCrop(crop.id)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!year || selectedCrops.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
