"use client";

// Todo: да коригирам компонента, като добавя ред за попъване имената на получателя

import { Button } from "@/components/ui/button";

export function ConfirmDialog({ open, onConfirm, onCancel, title }: { open: boolean; onConfirm: ()=>void; onCancel: ()=>void; title?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h4 className="font-semibold">{title ?? "Confirm delivery?"}</h4>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
