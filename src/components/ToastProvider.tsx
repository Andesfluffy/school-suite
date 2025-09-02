"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Toast = { id: number; title?: string; description?: string; variant?: "default" | "success" | "error" };

const ToastCtx = createContext<{ addToast: (t: Omit<Toast, "id">) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((p) => p.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ addToast }}>
      {children}
      <div className="fixed z-50 bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg shadow px-4 py-3 text-sm border bg-white animate-fade-in ${
              t.variant === "success"
                ? "border-green-200 text-green-800 bg-green-50"
                : t.variant === "error"
                ? "border-red-200 text-red-800 bg-red-50"
                : "border-gray-200 text-gray-800"
            }`}
          >
            {t.title ? <div className="font-medium">{t.title}</div> : null}
            {t.description ? <div>{t.description}</div> : null}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

