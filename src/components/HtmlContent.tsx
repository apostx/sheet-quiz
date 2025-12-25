import { useState, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { Lightbox } from './Lightbox';

interface HtmlContentProps {
  html: string;
  className?: string;
  variant?: 'tooltip' | 'light';
}

export const HtmlContent = ({ html, className = '', variant = 'light' }: HtmlContentProps) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      e.preventDefault();
      e.stopPropagation();
      setLightboxSrc((target as HTMLImageElement).src);
    }
  }, []);

  const baseStyles = variant === 'tooltip'
    ? '[&_a]:text-blue-300 [&_a]:underline [&_a:hover]:text-blue-200'
    : '[&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800';

  const imgStyles = '[&_img]:max-w-full [&_img]:h-auto [&_img]:my-2 [&_img]:rounded [&_img]:cursor-zoom-in';

  return (
    <>
      <div
        className={`${baseStyles} ${imgStyles} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={handleClick}
      />
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
};
