"use client";

import { useState, useMemo } from "react";
import Foto from "./Foto";

export type UmkmItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  owner: string;
  address: string;
  image_url: string | null;
  maps_url: string | null;
  whatsapp: string | null;
  created_at?: string;
};

export default function UmkmClient({ data }: { data: UmkmItem[] }) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua");
  const [urutan, setUrutan] = useState<"terbaru" | "az" | "za">("terbaru");
  const [tampilBatas, setTampilBatas] = useState(6);

  // Kategori dinamis dari data
  const daftarKategori = useMemo(() => {
    const setKat = new Set<string>();
    data.forEach((u) => {
      if (u.category) setKat.add(u.category.trim());
    });
    return ["Semua", ...Array.from(setKat)];
  }, [data]);

  // Filter & Urutkan
  const hasil = useMemo(() => {
    let list = data.filter((u) => {
      const q = kataKunci.toLowerCase();
      const nama = u.name?.toLowerCase() || "";
      const kat = u.category?.toLowerCase() || "";
      const pemilik = u.owner?.toLowerCase() || "";
      const alamat = u.address?.toLowerCase() || "";
      const deskripsi = u.description?.toLowerCase() || "";

      const cocokCari =
        !q ||
        nama.includes(q) ||
        kat.includes(q) ||
        pemilik.includes(q) ||
        alamat.includes(q) ||
        deskripsi.includes(q);

      const cocokKat = kategoriDipilih === "Semua" || u.category === kategoriDipilih;

      return cocokCari && cocokKat;
    });

    if (urutan === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (urutan === "za") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [data, kataKunci, kategoriDipilih, urutan]);

  const tampil = hasil.slice(0, tampilBatas);
  const adaLagi = hasil.length > tampilBatas;

  const formatWa = (wa: string | null) => {
    if (!wa) return "";
    const clean = wa.replace(/\D/g, "");
    if (clean.startsWith("0")) return "62" + clean.slice(1);
    return clean;
  };

  return (
    <div>
      {/* Kontrol Pencarian, Filter, dan Pengurutan */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-7 col-lg-8">
          <div className="kotak-cari mb-0">
            <span className="ikon-cari" aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Cari nama usaha, produk, pemilik, atau alamat..."
              value={kataKunci}
              onChange={(e) => {
                setKataKunci(e.target.value);
                setTampilBatas(6);
              }}
              aria-label="Cari UMKM Paslaten Dua"
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
            <label htmlFor="urut-umkm" className="small fw-semibold text-nowrap mb-0" style={{ color: "var(--teks-redup)" }}>
              Urutkan:
            </label>
            <select
              id="urut-umkm"
              className="form-select form-select-sm"
              style={{ maxWidth: "160px", borderRadius: "10px", borderColor: "var(--garis)" }}
              value={urutan}
              onChange={(e) => setUrutan(e.target.value as "terbaru" | "az" | "za")}
            >
              <option value="terbaru">Terbaru</option>
              <option value="az">Nama A–Z</option>
              <option value="za">Nama Z–A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Kategori Dinamis */}
      <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter kategori UMKM">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            className={`tag-kategori-btn ${kategoriDipilih === k ? "aktif" : ""}`}
            onClick={() => {
              setKategoriDipilih(k);
              setTampilBatas(6);
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Informasi Total Hasil */}
      <p className="small mb-3" style={{ color: "var(--teks-redup)" }}>
        Menampilkan <strong>{hasil.length}</strong> usaha warga
        {kategoriDipilih !== "Semua" ? ` dalam kategori "${kategoriDipilih}"` : ""}
        {kataKunci ? ` untuk kata kunci "${kataKunci}"` : ""}
      </p>

      {/* Hasil Kosong */}
      {hasil.length === 0 && (
        <div className="kartu-lembut p-4 p-md-5 text-center my-4">
          <p className="fw-semibold mb-1">Usaha tidak ditemukan</p>
          <p className="small text-muted mb-3">
            Tidak ada UMKM yang cocok dengan pencarian atau filter yang dipilih.
          </p>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              setKataKunci("");
              setKategoriDipilih("Semua");
            }}
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Daftar Kartu UMKM */}
      <div className="row g-4">
        {tampil.map((u) => {
          const waFormatted = formatWa(u.whatsapp);

          return (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <article className="kartu-lembut h-100 overflow-hidden d-flex flex-column">
                <Foto src={u.image_url} alt={u.name} tinggi={200} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="mb-2">
                    <span
                      className="badge fw-semibold"
                      style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)" }}
                    >
                      {u.category}
                    </span>
                  </div>
                  <h3 className="h5 fw-bold mb-2">{u.name}</h3>
                  <p className="mb-3 flex-grow-1" style={{ color: "var(--teks)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {u.description}
                  </p>

                  <div className="small mb-3 pt-2 border-top" style={{ color: "var(--teks-redup)", borderColor: "var(--garis)" }}>
                    {u.owner && <div><strong>Pemilik:</strong> {u.owner}</div>}
                    {u.address && <div><strong>Alamat:</strong> {u.address}</div>}
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    {u.maps_url?.startsWith("http") && (
                      <a
                        href={u.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm flex-fill d-inline-flex align-items-center justify-content-center gap-1"
                        style={{ minHeight: "38px" }}
                      >
                        <span aria-hidden="true">📍</span>
                        <span>Lokasi</span>
                      </a>
                    )}
                    {waFormatted && (
                      <a
                        href={`https://wa.me/${waFormatted}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm flex-fill d-inline-flex align-items-center justify-content-center gap-1"
                        style={{ minHeight: "38px" }}
                      >
                        <span aria-hidden="true">💬</span>
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Tombol Pemuatan Bertahap (Load More) */}
      {adaLagi && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-emas px-4 py-2"
            onClick={() => setTampilBatas((prev) => prev + 6)}
          >
            Muat Lebih Banyak ({hasil.length - tampilBatas} tersisa)
          </button>
        </div>
      )}
    </div>
  );
}
