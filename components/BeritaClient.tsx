"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Foto from "./Foto";
import { tanggalIndo } from "../lib/format";

export type BeritaItem = {
  id: number;
  title: string;
  summary: string;
  content: string;
  image_url: string | null;
  published_at: string;
};

export default function BeritaClient({ listBerita }: { listBerita: BeritaItem[] }) {
  const [kataKunci, setKataKunci] = useState("");
  const [urutan, setUrutan] = useState<"terbaru" | "terlama">("terbaru");
  const [tampilBatas, setTampilBatas] = useState(7); // 1 featured + 6 grid

  const hasilFilter = useMemo(() => {
    let list = listBerita.filter((b) => {
      const q = kataKunci.toLowerCase();
      const judul = b.title.toLowerCase();
      const ringkasan = b.summary?.toLowerCase() || "";
      return !q || judul.includes(q) || ringkasan.includes(q);
    });

    if (urutan === "terbaru") {
      list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    } else {
      list.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
    }

    return list;
  }, [listBerita, kataKunci, urutan]);

  const beritaUtama = !kataKunci && hasilFilter.length > 0 ? hasilFilter[0] : null;
  const beritaLainnya = !kataKunci && hasilFilter.length > 0 ? hasilFilter.slice(1, tampilBatas) : hasilFilter.slice(0, tampilBatas);
  const totalTampil = (!kataKunci && beritaUtama ? 1 : 0) + beritaLainnya.length;
  const adaLagi = hasilFilter.length > totalTampil;

  return (
    <div>
      {/* Kontrol Pencarian dan Pengurutan */}
      <div className="row g-3 mb-4 align-items-center justify-content-between">
        <div className="col-md-7 col-lg-6">
          <div className="kotak-cari mb-0">
            <span className="ikon-cari" aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Cari judul atau topik kabar berita..."
              value={kataKunci}
              onChange={(e) => {
                setKataKunci(e.target.value);
                setTampilBatas(7);
              }}
              aria-label="Cari berita kelurahan"
            />
            {kataKunci && (
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none position-absolute"
                style={{ right: "0.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--teks-redup)" }}
                onClick={() => setKataKunci("")}
                aria-label="Bersihkan pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="col-md-5 col-lg-4 text-md-end">
          <div className="d-flex align-items-center justify-content-md-end gap-2">
            <label htmlFor="urut-berita" className="small fw-semibold text-nowrap mb-0" style={{ color: "var(--teks-redup)" }}>
              Urutkan:
            </label>
            <select
              id="urut-berita"
              className="form-select form-select-sm"
              style={{ maxWidth: "160px", borderRadius: "10px", borderColor: "var(--garis)" }}
              value={urutan}
              onChange={(e) => setUrutan(e.target.value as "terbaru" | "terlama")}
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {hasilFilter.length === 0 ? (
        <div className="kartu-lembut p-4 p-md-5 text-center my-4">
          <p className="fw-semibold mb-1">Berita tidak ditemukan</p>
          <p className="small text-muted mb-3">Tidak ada kabar yang cocok dengan kata kunci &ldquo;{kataKunci}&rdquo;.</p>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setKataKunci("")}
          >
            Lihat Semua Berita
          </button>
        </div>
      ) : (
        <>
          {/* Berita Utama Unggulan (Hanya saat tidak mencari) */}
          {beritaUtama && (
            <article className="kartu-lembut mb-5 overflow-hidden shadow-sm" style={{ borderTop: "4px solid var(--merah)" }}>
              <div className="row g-0 align-items-center">
                <div className="col-lg-7">
                  <Foto src={beritaUtama.image_url} alt={beritaUtama.title} tinggi="clamp(240px, 32vw, 380px)" />
                </div>
                <div className="col-lg-5 p-4 p-md-5">
                  <div className="badge mb-2 px-3 py-1" style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)" }}>
                    Kabar Utama
                  </div>
                  <p className="small mb-1 fw-semibold" style={{ color: "var(--emas-teks)" }}>
                    {tanggalIndo(beritaUtama.published_at)}
                  </p>
                  <h2 className="h4 fw-bold mb-3">
                    <Link href={`/berita/${beritaUtama.id}`} className="text-decoration-none text-reset">
                      {beritaUtama.title}
                    </Link>
                  </h2>
                  <p className="text-muted mb-4" style={{ lineHeight: 1.65 }}>
                    {beritaUtama.summary}
                  </p>
                  <Link href={`/berita/${beritaUtama.id}`} className="btn btn-primary btn-sm px-3 py-2">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Grid Berita Lainnya */}
          <div className="row g-4">
            {beritaLainnya.map((b) => (
              <div className="col-md-6 col-lg-4" key={b.id}>
                <article className="kartu-lembut h-100 overflow-hidden d-flex flex-column">
                  <Foto src={b.image_url} alt={b.title} tinggi={180} />
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <p className="small mb-1 fw-semibold" style={{ color: "var(--emas-teks)" }}>
                      {tanggalIndo(b.published_at)}
                    </p>
                    <h3 className="h5 fw-bold mb-2">
                      <Link href={`/berita/${b.id}`} className="text-decoration-none text-reset">
                        {b.title}
                      </Link>
                    </h3>
                    <p className="small text-muted flex-grow-1 mb-3" style={{ lineHeight: 1.6 }}>
                      {b.summary}
                    </p>
                    <Link href={`/berita/${b.id}`} className="fw-semibold mt-auto" style={{ color: "var(--merah)" }}>
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Tombol Load More */}
          {adaLagi && (
            <div className="text-center mt-5">
              <button
                type="button"
                className="btn btn-emas px-4 py-2"
                onClick={() => setTampilBatas((prev) => prev + 6)}
              >
                Muat Berita Lainnya ({hasilFilter.length - totalTampil} tersisa)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
