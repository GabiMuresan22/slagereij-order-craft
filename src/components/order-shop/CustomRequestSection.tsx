import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CustomCartRequest } from "@/lib/orderCustomRequest";
import { Plus } from "lucide-react";

interface CustomRequestSectionProps {
  labels: {
    title: string;
    subtitle: string;
    fieldTitle: string;
    fieldQty: string;
    fieldNote: string;
    cta: string;
  };
  onAdd: (item: CustomCartRequest) => void;
}

export function CustomRequestSection({ labels, onAdd }: CustomRequestSectionProps) {
  const [title, setTitle] = useState("");
  const [quantityNote, setQuantityNote] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    onAdd({
      id: crypto.randomUUID(),
      type: "custom_request",
      title: trimmed,
      quantityNote: quantityNote.trim(),
      note: note.trim(),
    });
    setTitle("");
    setQuantityNote("");
    setNote("");
  };

  return (
    <section
      className="rounded-2xl border border-border bg-card/80 p-5 md:p-6 shadow-md"
      aria-labelledby="custom-request-heading"
    >
      <h2 id="custom-request-heading" className="font-serif text-lg md:text-xl font-semibold text-foreground">
        {labels.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{labels.subtitle}</p>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="custom-req-title" className="text-foreground">
            {labels.fieldTitle}
          </Label>
          <Input
            id="custom-req-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className="bg-background/80 border-border"
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-req-qty" className="text-foreground">
            {labels.fieldQty}
          </Label>
          <Input
            id="custom-req-qty"
            value={quantityNote}
            onChange={(e) => setQuantityNote(e.target.value)}
            placeholder=""
            className="bg-background/80 border-border"
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-req-note" className="text-foreground">
            {labels.fieldNote}
          </Label>
          <Textarea
            id="custom-req-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="resize-none bg-background/80 border-border"
          />
        </div>
        <Button
          type="button"
          className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!title.trim()}
          onClick={handleSubmit}
        >
          <Plus className="h-4 w-4" aria-hidden />
          {labels.cta}
        </Button>
      </div>
    </section>
  );
}
