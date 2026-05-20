import Image from "next/image";

export type PortraitProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  align?: "left" | "right" | "center";
};

/**
 * A small captioned portrait, suitable for inline use in essay body. By
 * default left-aligned with body text wrapping; pass align="center" to
 * place it as a full-width figure.
 */
export default function Portrait({
  src,
  alt,
  caption,
  width = 220,
  height = 280,
  align = "center",
}: PortraitProps) {
  const wrapperClass =
    align === "center"
      ? "mx-auto my-8"
      : align === "right"
      ? "float-right ml-6 my-2 max-w-[40%]"
      : "float-left mr-6 my-2 max-w-[40%]";

  return (
    <figure className={wrapperClass} style={{ width: `${width}px` }}>
      <div className="relative bg-parchment-deep border border-bronze-light/40 rounded-sm overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-ink-muted italic text-center leading-snug">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Two portraits side by side, for the Adams/Franklin two-modes essay.
 * Full-width figure, with one caption per panel and a shared caption below.
 */
export function PortraitDuet({
  left,
  right,
  caption,
}: {
  left: PortraitProps;
  right: PortraitProps;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <div className="grid grid-cols-2 gap-6">
        {[left, right].map((p, i) => (
          <div key={i} className="text-center">
            <div className="relative bg-parchment-deep border border-bronze-light/40 rounded-sm overflow-hidden mx-auto">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width ?? 360}
                height={p.height ?? 480}
                className="w-full h-auto"
              />
            </div>
            {p.caption ? (
              <p className="mt-2 text-xs text-ink-muted italic leading-snug">
                {p.caption}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      {caption ? (
        <figcaption className="mt-6 text-sm text-ink-muted italic text-center leading-snug max-w-prose mx-auto">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
