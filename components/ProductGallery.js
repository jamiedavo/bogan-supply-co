"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export default function ProductGallery({ product }) {
  const images = product.images?.length
    ? product.images
    : [
        {
          src: product.image,
          alt: `${product.name} BOGAN tee, front view on a model`,
          label: "Front",
        },
      ];
  const [imageIndex, setImageIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const viewer = useRef(null);
  const enlargedImage = useRef(null);
  const id = useId();
  const image = images[imageIndex] || images[0];
  const label = image.label || (image.src.includes("-back.") ? "Back" : "Front");
  // A detail is a crop of the current photo, never a separate artwork promise.
  const focus = image.detailFocus ||
    (image.src.includes("early-night-postponed-front")
      ? { x: 0.61, y: 0.40 }
      : { x: 0.5, y: 0.43 });

  const centreEnlargement = useCallback(() => {
    const area = viewer.current;
    const photo = enlargedImage.current;
    if (!area || !photo) return;
    area.scrollTo({
      left: photo.clientWidth * focus.x - area.clientWidth / 2,
      top: photo.clientHeight * focus.y - area.clientHeight / 2,
    });
  }, [focus.x, focus.y]);

  useEffect(() => {
    if (!enlarged) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const modal = dialog.current;
    modal.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const frame = requestAnimationFrame(centreEnlargement);
    return () => {
      cancelAnimationFrame(frame);
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [enlarged, centreEnlargement]);

  return (
    <div className="min-w-0 self-start">
      <figure className="bg-bone">
        <button
          type="button"
          aria-label={`Enlarge ${product.name}, ${label.toLowerCase()} view`}
          aria-haspopup="dialog"
          onClick={() => setEnlarged(true)}
          className="relative block h-[280px] w-full overflow-hidden cursor-zoom-in sm:h-[320px] md:h-auto md:aspect-[4/5]"
        >
          {showDetail ? (
            <img
              src={image.src}
              alt={`${label} print detail, cropped from the ${product.name} mockup`}
              onLoad={(event) => setNaturalWidth(event.currentTarget.naturalWidth)}
              className="absolute max-w-none h-auto"
              style={{
                width: `min(230%, ${naturalWidth || 1122}px)`,
                left: "50%",
                top: "50%",
                transform: `translate(-${focus.x * 100}%, -${focus.y * 100}%)`,
              }}
            />
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              onLoad={(event) => setNaturalWidth(event.currentTarget.naturalWidth)}
              className="h-full w-full object-contain"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 bg-singlet px-3 py-2 text-xs font-semibold text-ink shadow-sm"
          >
            Enlarge image +
          </span>
        </button>
        <figcaption className="px-4 pt-3 text-xs text-ink/75" aria-live="polite">
          {label} view{showDetail ? " · Print detail" : ""}
        </figcaption>
        <div
          role="group"
          aria-label={`${product.name} image views`}
          className="flex flex-wrap items-center gap-2 p-3 sm:p-4"
        >
          {images.length > 1 && images.map((photo, index) => {
            const view = photo.label || (photo.src.includes("-back.") ? "Back" : "Front");
            return (
              <button
                key={photo.src}
                type="button"
                aria-pressed={index === imageIndex && !showDetail}
                onClick={() => {
                  setImageIndex(index);
                  setShowDetail(false);
                }}
                className={`inline-flex min-h-11 items-center gap-1.5 border px-2 py-1 text-[11px] uppercase tracking-[0.08em] sm:gap-2 sm:px-3 sm:text-xs ${index === imageIndex && !showDetail ? "border-ink bg-ink text-singlet" : "border-ink/30 hover:border-ink"}`}
              >
                <img src={photo.src} alt="" width="24" height="32" className="h-8 w-6 object-cover" />
                {view}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={showDetail}
            onClick={() => setShowDetail((value) => !value)}
            className={`inline-flex min-h-11 items-center justify-center border px-3 py-2 text-[11px] uppercase tracking-[0.08em] sm:px-4 sm:text-xs ${showDetail ? "border-ink bg-ink text-singlet" : "border-ink/30 hover:border-ink"}`}
          >
            Print detail
          </button>
        </div>
      </figure>

      <dialog
        ref={dialog}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-instructions`}
        onClose={() => setEnlarged(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const first = closeButton.current;
          const last = viewer.current;
          const active = document.activeElement;
          if (event.shiftKey && (active === first || active === dialog.current)) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && (active === last || active === dialog.current)) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
        className="w-[calc(100vw-2rem)] max-w-[1160px] max-h-[calc(100dvh-2rem)] border-0 bg-singlet p-0 text-ink backdrop:bg-ink/80"
      >
        <div className="flex items-start justify-between gap-3 border-b border-ink/15 p-4">
          <div>
            <h2 id={`${id}-title`} className="font-semibold text-sm sm:text-base">
              {product.name} — {label.toLowerCase()} view
            </h2>
            <p id={`${id}-instructions`} className="mt-2 text-xs text-ink/75">
              Scroll to inspect the enlarged image. You can pinch to zoom on touch screens.
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={() => dialog.current.close()}
            aria-label="Close enlarged image"
            className="min-h-11 min-w-11 shrink-0 border border-ink/30 text-2xl hover:border-ink"
          >
            ×
          </button>
        </div>
        <div
          ref={viewer}
          tabIndex={0}
          role="region"
          aria-label={`${product.name} enlarged image, scroll to explore`}
          className="max-h-[70dvh] overflow-auto overscroll-contain bg-bone"
        >
          {enlarged && (
            <img
              ref={enlargedImage}
              src={image.src}
              alt={image.alt}
              onLoad={centreEnlargement}
              className="block max-w-none h-auto"
            />
          )}
        </div>
      </dialog>
    </div>
  );
}
