"use client";

import { useState } from "react";

type Item = { id: number; title: string; category: string; image_url: string };

const kategori = ["Semua", "Pemerintahan", "Kegiatan", "Masyarakat", "UMKM"];

export default function GaleriClient({ items }: { items: Item[] }) {
  const [aktif, setAktif] = useState("Semua");
  const [dipilih, setDipilih] = useState<number | null>(null);

  const tampil = items.filter((g) => aktif === "Semua" || g.category === aktif);
  const foto = items.find((g) => g.id === dipilih);

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {kategori.map((k) => (
          <button
            key={k}
            onClick={() => setAktif(k)}
            className="btn btn-sm rounded-pill px-3"
            style={{
              backgroundColor: aktif === k ? "#5aa0d8" : "#dcedfb",
              color: aktif === k ? "#ffffff" : "#1e3a5f",
              border: "none",
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {tampil.length === 0 && <p>Belum ada foto.</p>}

      <div className="row g-3">
        {tampil.map((g) => (
          <div className="col-6 col-md-4" key={g.id}>
            <div
              className="kartu-lembut overflow-hidden"
              style={{ cursor: "pointer" }}
              onClick={() => setDipilih(g.id)}
            >
              <img
                src={g.image_url}
                alt={g.title}
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
              />
              <div className="p-2 small fw-semibold">{g.title}</div>
            </div>
          </div>
        ))}
      </div>

      {foto && (
        <div
          onClick={() => setDipilih(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(30, 58, 95, 0.55)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            className="kartu-lembut p-3"
            style={{ maxWidth: "700px", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={foto.image_url}
              alt={foto.title}
              style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: "12px" }}
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <div className="fw-bold">{foto.title}</div>
                <div className="small" style={{ color: "#4a6785" }}>{foto.category}</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setDipilih(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}