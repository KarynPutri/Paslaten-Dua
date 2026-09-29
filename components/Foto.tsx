export default function Foto({
  src,
  alt,
  tinggi = 160,
}: {
  src?: string | null;
  alt: string;
  tinggi?: number;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: tinggi, objectFit: "cover", display: "block" }}
      />
    );
  }
  return <div style={{ backgroundColor: "#dcedfb", height: tinggi }} />;
}