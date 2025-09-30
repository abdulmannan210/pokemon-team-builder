"use client";

import { ReactNode } from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
