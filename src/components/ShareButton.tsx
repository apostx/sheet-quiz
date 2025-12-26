import { useShareLink } from '../hooks/useShareLink';
import type { ShareData } from '../utils/share';

interface ShareButtonProps {
  data: ShareData;
  label?: string;
  className?: string;
}

export const ShareButton = ({ data, label = 'Share', className = '' }: ShareButtonProps) => {
  const { isSharing, shareData } = useShareLink();

  const handleClick = () => {
    shareData(data);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSharing}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm sm:text-base whitespace-nowrap transition-colors ${
        isSharing ? 'opacity-75' : ''
      } ${className}`}
      aria-label={isSharing ? 'Link copied to clipboard' : 'Share list'}
    >
      {isSharing ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
