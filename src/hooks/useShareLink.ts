import { useState, useCallback, useRef, useEffect } from 'react';
import { generateShareUrl, copyToClipboard, type ShareData } from '../utils/share';

export interface UseShareLinkReturn {
  isSharing: boolean;
  shareData: (data: ShareData) => Promise<void>;
}

/**
 * Hook to manage share link state and clipboard operations
 * Provides "Copied!" feedback that auto-resets after 2 seconds
 */
export function useShareLink(): UseShareLinkReturn {
  const [isSharing, setIsSharing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shareData = useCallback(async (data: ShareData) => {
    const url = generateShareUrl(data);
    if (!url) {
      console.error('[Share] Failed to generate share URL');
      alert('Failed to generate share link');
      return;
    }

    const success = await copyToClipboard(url);
    if (!success) {
      console.error('[Share] Failed to copy to clipboard');
      alert('Failed to copy to clipboard');
      return;
    }

    // Show "Copied!" feedback
    setIsSharing(true);

    // Clear any existing timeout
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    // Reset after 2 seconds
    timeoutRef.current = window.setTimeout(() => {
      setIsSharing(false);
      timeoutRef.current = null;
    }, 2000);
  }, []);

  return {
    isSharing,
    shareData,
  };
}
