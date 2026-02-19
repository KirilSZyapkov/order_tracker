"use client";

// Todo: да коригирам компонента, като добавя ред за попъване имената на получателя

import { Button } from "@/components/ui/button";

export function ConfirmDialog({ open, onConfirm, onCancel, title, setReceiver}: 
  { open: boolean; onConfirm: () => void; onCancel: () => void; title?: string; setReceiver: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h4 className="font-semibold">{title ?? "Confirm delivery?"}</h4>
        <div className="w-full px-2 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="clientFirstName" >First Name</label>
            <input 
            className="w-full p-3 mx-2 border border-gray-300 rounded-md" 
            type="text" 
            placeholder="Enter first name" 
            name="clientFirstName" />
            onChange={(e) => setReceiver((prev) => ({ ...prev, firstName: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="clientSecondName">Second Name</label>
            <input 
            className="w-full p-3 mx-2 border border-gray-300 rounded-md" 
            type="text" 
            placeholder="Enter second name" 
            name="clientSecondName" />
            onChange={(e) => setReceiver((prev) => ({ ...prev, secondName: e.target.value }))} />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
