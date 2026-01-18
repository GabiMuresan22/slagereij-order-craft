import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "loading"> {
  src: string;
  alt: string;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

/**
 * LazyImage component that uses Intersection Observer for efficient image loading
 * Only loads images when they're about to enter the viewport
 */
export default function LazyImage({
  src,
  alt,
  className,
  rootMargin = "50px",
  threshold = 0.01,
  ...imgProps
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once in view, we can stop observing
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.disconnect();
      }
    };
  }, [rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Still mark as loaded to hide skeleton
  };

  return (
    <div ref={containerRef} className="relative w-full h-full" role="img" aria-label={alt}>
      {/* Loading skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse" 
          aria-hidden="true"
          role="presentation"
        />
      )}

      {/* Error placeholder */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-muted flex items-center justify-center"
          role="alert"
          aria-live="polite"
        >
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading="lazy"
          {...imgProps}
        />
      )}
    </div>
  );
}
