// components/mdx/FigureGroup.tsx
import * as React from "react";

type FigureGroupImage = {
  src: string;
  alt: string;
  label?: string;
};

type FigureGroupProps = {
  images: FigureGroupImage[];
  caption?: string;
  number?: number | string;
  maxWidth?: number;
  columns?: 2 | 3 | 4;
};

export function FigureGroup({
  images,
  caption,
  number,
  maxWidth = 760,
  columns = 2,
}: FigureGroupProps) {
  const safeColumns = Math.min(columns, images.length);

  return (
    <figure
      data-figuregroup="true"
      style={{ margin: "2.5em 0", textAlign: "center" }}
    >
      {/* 컴포넌트 내부 반응형 스타일 */}
      <style>{`
        figure[data-figuregroup="true"] .figure-group-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 12px;
        }

        @media (min-width: 640px) {
          figure[data-figuregroup="true"] .figure-group-grid {
            grid-template-columns: repeat(${safeColumns}, 1fr);
          }
        }
      `}</style>

      <div
        className="figure-group-grid"
        style={{
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "6px",
              }}
            />
            {img.label && (
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "0.78em",
                  color: "#666",
                }}
              >
                {img.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <figcaption
          style={{
            fontSize: "0.85em",
            color: "#555",
            marginTop: "0.6em",
            lineHeight: "1.5",
          }}
        >
          {number && <strong>그림 {number}. </strong>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
