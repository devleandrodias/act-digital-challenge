import { PlusCircle } from "lucide-react";

import { formatDocument } from "@/utils/utils";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { useProducerContext } from "@/contexts/ProducerContext";

import { FarmCard } from "./FarmCard";
import { Button } from "../../ui/button";
import { DialogHeader, DialogFooter } from "../../ui/dialog";

export function FarmListModal() {
  const ctxProducer = useProducerContext();

  const existsFarms = !!ctxProducer.producerSelected?.farms?.length;

  return (
    <Dialog
      open={ctxProducer.farmListModalOpen}
      onOpenChange={ctxProducer.setFarmListModalOpen}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-green-800">
            {ctxProducer.producerSelected?.name}
          </DialogTitle>
          <DialogDescription>
            {formatDocument(ctxProducer.producerSelected?.document)}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h4 className="text-sm font-medium mb-3">Propriedades</h4>
          {existsFarms ? (
            <div className="grid gap-3">
              {ctxProducer.producerSelected?.farms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4 border rounded-md">
              Nenhuma fazenda cadastrada
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => {
              ctxProducer.setFarmListModalOpen(false);
              ctxProducer.setProducerSelected(null);
            }}
          >
            Fechar
          </Button>
          <div className="flex gap-2">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                ctxProducer.setFarmFormModalOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Fazenda
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
