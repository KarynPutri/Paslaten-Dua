"use client";

import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { galeri } from "../../data/dummy";

const kategori = ["Semua", "Pemerintahan", "Kegiatan", "Masyarakat", "UMKM"];

export default function Galeri() {
  const [aktif, setAktif] = useState("Semua");
  const [dipilih, setDipilih] = useState<number | null>(null);

  const tampil = galeri.filter((g) => aktif === "Semua" || g.kategori === aktif);
  const foto = galeri.find((g) => g.id === dipilih);

  return (
    <>
      <PageHeader
        judul="Galeri"
        deskripsi="Dokumentasi kegiatan Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {kategori.map((k) => (
            <button
              key={k}
              onClick={() => setAktif(k)}
              className="btn btn-sm rounded-pill px-3"
              style={{
                backgroundColor: aktif === k ? "var(--merah)" : "var(--pasir)",
                color: aktif === k ? "#ffffff" : "var(--teks)",
                border: "none",
              }}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="row g-3">
          {tampil.map((g) => (
            <div className="col-6 col-md-4" key={g.id}>
              <div
                className="kartu-lembut d-flex align-items-end p-3"
                style={{ height: "180px", cursor: "pointer", backgroundColor: "var(--pasir)" }}
                onClick={() => setDipilih(g.id)}
              >
                <span className="small fw-semibold">{g.judul}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {foto && (
        <div
          onClick={() => setDipilih(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(31, 21, 18, 0.78)",
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
            <div style={{ backgroundColor: "var(--pasir)", height: "360px", borderRadius: "12px" }} />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <div className="fw-bold">{foto.judul}</div>
                <div className="small" style={{ color: "var(--teks-redup)" }}>{foto.kategori}</div>
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