import React, { useState } from 'react';

interface CarpetImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const CarpetImage: React.FC<CarpetImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#F5F5F7]',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F9E8E8] via-[#F5F5F7] to-[#EFECE6] text-[#CB1B1B] text-center">
          <svg
            className="w-12 h-12 mb-3 opacity-80"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="6"
              width="44"
              height="52"
              rx="2"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <rect
              x="15"
              y="11"
              width="34"
              height="42"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M32 20L40 32L32 44L24 32L32 20Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="32" cy="32" r="3" fill="currentColor" />
          </svg>
          <span className="text-xs font-medium text-[#1F2024] line-clamp-2">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
