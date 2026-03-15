'use client';

import { useState, useCallback, useRef } from 'react';

export type ToastType = 'success' | 'error';

export type Toast = {
  message: string;
  type: ToastType;
};

export function useToast(autoDismissMs = 4000) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ message, type });
      timerRef.current = setTimeout(() => setToast(null), autoDismissMs);
    },
    [autoDismissMs],
  );

  const dismissToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}
