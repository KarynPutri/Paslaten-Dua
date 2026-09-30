"use client";

import dynamic from "next/dynamic";

// Leaflet membutuhkan `window`, jadi peta hanya dirender di browser.
const PetaLeaflet = dynamic(() => import("./PetaLeaflet"), {
  ssr: false,
  loading: () => (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100%", minHeight: 320, backgroundColor: "#dcedfb", borderRadius: 16, color: "#4a6785" }}
    >
      Memuat peta…
    </div>
  ),
});

export default function PetaLokasi({
  tinggi = 480,
  alamat,
}: {
  tinggi?: number;
  alamat?: string | null;
}) {
  return (
    <div style={{ minHeight: tinggi }} className="peta-wadah">
      <PetaLeaflet tinggi={tinggi} alamat={alamat} />
    </div>
  );
}
