import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!ref.current) return;
      if (!(event.target instanceof Node)) return;
      if (!ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, isActive, onClickOutside]);
};
