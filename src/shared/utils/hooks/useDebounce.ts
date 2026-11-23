import { useRef, useCallback } from 'react';

/**
 * Creates a debounced function with `cancel` support.
 * The debounced function delays invoking `fn` until after `delay` ms have elapsed.
 */
export function useDebounce(delay: number): {
  debounce: (fn: () => void) => void;
  cancel: () => void;
} {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const debounce = useCallback(
    (fn: () => void) => {
      cancel();
      timeoutRef.current = setTimeout(fn, delay);
    },
    [delay, cancel]
  );

  return { debounce, cancel };
}
