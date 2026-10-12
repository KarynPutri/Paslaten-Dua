"use client";

import { useState, useEffect, useRef, useMemo } from "react";

type Item = { id: number; title: string; category: string; image_url: string };

export default function GaleriClient({ items }: { items: Item[] }) {
  const [aktif, setAktif] = useState("Semua");
  const [indeksDipilih, setIndeksDipilih] = useState<number | null>(null);
  const pemicuRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Kategori dinamis dari data
  const daftarKategori = useMemo(() => {
    const setKat = new Set<string>();
    items.forEach((i) => {
      if (i.category) setKat.add(i.category.trim());
    });
    return ["Semua", ...Array.from(setKat)];
  }, [items]);

  const tampil = useMemo(() => {
    return items.filter((g) => aktif === "Semua" || g.category === aktif);
  }, [items, aktif]);

  const foto = indeksDipilih !== null ? tampil[indeksDipilih] : null;

  const bukaFoto = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    pemicuRef.current = e.currentTarget;
    setIndeksDipilih(index);
  };

  const tutupFoto = () => {
    setIndeksDipilih(null);
    if (pemicuRef.current) {
      pemicuRef.current.focus();
    }
  };

  const fotoBerikutnya = () => {
    if (indeksDipilih === null) return;
    setIndeksDipilih((prev) => (prev! + 1) % tampil.length);
  };

  const fotoSebelumnya = () => {
    if (indeksDipilih === null) return;
    setIndeksDipilih((prev) => (prev! - 1 + tampil.length) % tampil.length);
  };

  // Penanganan Keyboard Escape, Panah Kiri, dan Panah Kanan
  useEffect(() => {
    if (indeksDipilih === null) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        tutupFoto();
      } else if (e.key === "ArrowRight") {
        fotoBerikutnya();
      } else if (e.key === "ArrowLeft") {
        fotoSebelumnya();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    // Kunci scroll body saat modal aktif
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [indeksDipilih, tampil.length]);

  return (
    <>
      {/* Filter Kategori Dinamis */}
      <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter kategori galeri">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setAktif(k);
              setIndeksDipilih(null);
            }}
            className={`tag-kategori-btn ${aktif === k ? "aktif" : ""}`}
          >
            {k}
          </button>
        ))}
      </div>

      {tampil.length === 0 && (
        <div className="kartu-lembut p-4 text-center">
          <p className="mb-0 text-muted">Belum ada foto untuk kategori ini.</p>
        </div>
      )}

      {/* Grid Foto yang Dapat Diakses Keyboard */}
      <div className="row g-3">
        {tampil.map((g, idx) => (
          <div className="col-6 col-md-4" key={g.id}>
            <button
              type="button"
              className="kartu-lembut w-100 text-start border-0 p-0 overflow-hidden d-flex flex-column h-100"
              style={{ cursor: "pointer", background: "#fff" }}
              onClick={(e) => bukaFoto(idx, e)}
              aria-label={`Lihat foto: ${g.title}`}
            >
              <div style={{ height: "190px", width: "100%", overflow: "hidden", position: "relative" }}>
                <img
                  src={g.image_url}
                  alt={g.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div className="p-3 w-100 mt-auto">
                <span className="badge mb-1" style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)", fontSize: "0.75rem" }}>
                  {g.category}
                </span>
                <div className="small fw-semibold text-truncate" title={g.title}>
                  {g.title}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Modal Dialog Lightbox dengan Aksesibilitas */}
      {foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Penampil foto: ${foto.title}`}
          onClick={tutupFoto}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(31, 21, 18, 0.88)",
            backdropFilter: "blur(4px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            ref={dialogRef}
            className="kartu-lembut p-3 p-md-4 position-relative shadow-lg"
            style={{ maxWidth: "800px", width: "100%", maxHeight: "92vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup Silang di Kanan Atas */}
            <button
              type="button"
              className="btn btn-sm btn-light position-absolute rounded-circle shadow-sm"
              style={{ top: "0.8rem", right: "0.8rem", width: "36px", height: "36px", zIndex: 10 }}
              onClick={tutupFoto}
              aria-label="Tutup dialog foto"
            >
              ✕
            </button>

            {/* Foto Utama */}
            <div className="text-center position-relative mb-3" style={{ minHeight: "260px" }}>
              <img
                src={foto.image_url}
                alt={foto.title}
                style={{
                  width: "100%",
                  maxHeight: "65vh",
                  objectFit: "contain",
                  borderRadius: "12px",
                  display: "block",
                  margin: "0 auto",
                }}
              />

              {/* Tombol Navigasi Panah Kiri & Kanan */}
              {tampil.length > 1 && (
                <>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm position-absolute start-0 top-50 translate-middle-y ms-2 rounded-circle shadow"
                    style={{ width: "42px", height: "42px", opacity: 0.85 }}
                    onClick={fotoSebelumnya}
                    aria-label="Foto sebelumnya"
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm position-absolute end-0 top-50 translate-middle-y me-2 rounded-circle shadow"
                    style={{ width: "42px", height: "42px", opacity: 0.85 }}
                    onClick={fotoBerikutnya}
                    aria-label="Foto berikutnya"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {/* Keterangan & Navigasi Bawah */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-2 border-top" style={{ borderColor: "var(--garis)" }}>
              <div>
                <h3 className="h6 fw-bold mb-0">{foto.title}</h3>
                <span className="small text-muted">{foto.category} • Foto {indeksDipilih! + 1} dari {tampil.length}</span>
              </div>
              <div className="d-flex gap-2">
                {tampil.length > 1 && (
                  <>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={fotoSebelumnya}>
                      ← Sebelumnya
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={fotoBerikutnya}>
                      Berikutnya →
                    </button>
                  </>
                )}
                <button type="button" className="btn btn-primary btn-sm px-3" onClick={tutupFoto}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}