// components/mdx/Figure.tsx
type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  number?: number | string;
  maxWidth?: number;
};

export function Figure({
  src,
  alt,
  caption,
  number,
  maxWidth = 360,
}: FigureProps) {
  return (
    <figure style={{ margin: "2.5em 0", textAlign: "center" }}>
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          margin: "0 auto",
          maxWidth: `${maxWidth}px`,
          width: "100%",
          height: "auto",
        }}
      />
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
