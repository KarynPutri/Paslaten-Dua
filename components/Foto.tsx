"use client";

import { useState } from "react";

type FotoProps = {
  src?: string | null;
  alt: string;
  tinggi?: number | string;
  posisi?: string;
  muat?: "eager" | "lazy";
  contain?: boolean;
};

function FotoKosong({ alt, gagal = false }: { alt: string; gagal?: boolean }) {
  const pesan = gagal ? "Foto tidak dapat dimuat" : "Foto belum tersedia";

  return (
    <div
      className="foto-pengganti"
      role="img"
      aria-label={alt ? `${pesan}: ${alt}` : pesan}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M4 6h3l2-3h6l2 3h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
      <span aria-hidden="true">{pesan}</span>
    </div>
  );
}

function Gambar({
  src,
  alt,
  posisi,
  muat,
  contain,
}: {
  src: string;
  alt: string;
  posisi: string;
  muat: "eager" | "lazy";
  contain: boolean;
}) {
  const [gagal, setGagal] = useState(false);

  if (gagal) {
    return <FotoKosong alt={alt} gagal />;
  }

  return (
    <img
      ref={(gambar) => {
        // Foto dapat gagal dimuat sebelum React selesai menghubungkan event.
        if (gambar?.complete && gambar.naturalWidth === 0) setGagal(true);
      }}
      src={src}
      alt={alt}
      loading={muat}
      decoding="async"
      onError={() => setGagal(true)}
      style={{ objectFit: contain ? "contain" : "cover", objectPosition: posisi }}
    />
  );
}

export default function Foto({
  src,
  alt,
  tinggi = 160,
  posisi = "center",
  muat = "lazy",
  contain = false,
}: FotoProps) {
  const sumber = src?.trim();

  return (
    <div className="foto-bingkai" style={{ height: tinggi }}>
      {sumber ? (
        <Gambar
          key={sumber}
          src={sumber}
          alt={alt}
          posisi={posisi}
          muat={muat}
          contain={contain}
        />
      ) : (
        <FotoKosong alt={alt} />
      )}
    </div>
  );
}
