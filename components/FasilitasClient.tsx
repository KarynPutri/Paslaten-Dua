"use client";

import { useState, useMemo } from "react";
import StatistikPendidikan from "./StatistikPendidikan";

export type Facility = {
  id: number;
  name: string;
  category: string;
  address?: string | null;
  image_url?: string | null;
  maps_url?: string | null;
};

export type EduStat = {
  id: number;
  level: string;
  public_schools: number;
  private_schools: number;
  teachers: number;
  students: number;
  school_year?: string;
};

const URUTAN_KATEGORI = ["Pemerintahan", "Pendidikan", "Sarana Ibadah", "Kesehatan", "Ruang Publik"];

function getIkonKategori(kat: string): string {
  const k = kat.toLowerCase();
  if (k.includes("pemerintah")) return "🏛️";
  if (k.includes("ibadah") || k.includes("gereja")) return "⛪";
  if (k.includes("didik") || k.includes("sekolah")) return "🏫";
  if (k.includes("sehat") || k.includes("posyandu")) return "🏥";
  if (k.includes("ruang") || k.includes("taman")) return "🌿";
  if (k.includes("dagang") || k.includes("bank")) return "🏪";
  if (k.includes("akomodasi") || k.includes("inap")) return "🏨";
  return "📍";
}

export default function FasilitasClient({
  facilities,
  educationStats,
}: {
  facilities: Facility[];
  educationStats: EduStat[];
}) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua");

  // Semua data berasal dari database (Supabase), diurutkan per kategori lalu nama
  const dataFasilitas = useMemo(() => {
    const rank = (k: string) => {
      const i = URUTAN_KATEGORI.indexOf(k);
      return i === -1 ? URUTAN_KATEGORI.length : i;
    };
    return [...(facilities ?? [])].sort(
      (a, b) => rank(a.category) - rank(b.category) || a.name.localeCompare(b.name, "id")
    );
  }, [facilities]);

  const daftarKategori = useMemo(() => {
    const ada = Array.from(new Set(dataFasilitas.map((f) => f.category).filter(Boolean)));
    return [
      "Semua",
      ...URUTAN_KATEGORI.filter((k) => ada.includes(k)),
      ...ada.filter((k) => !URUTAN_KATEGORI.includes(k)),
    ];
  }, [dataFasilitas]);

  const hasilFilter = useMemo(() => {
    return dataFasilitas.filter((f) => {
      const q = kataKunci.toLowerCase();
      const cocokNama = f.name?.toLowerCase().includes(q) || false;
      const cocokAlamat = f.address?.toLowerCase().includes(q) || false;
      const cocokCari = !q || cocokNama || cocokAlamat;
      const cocokKat = kategoriDipilih === "Semua" || f.category === kategoriDipilih;
      return cocokCari && cocokKat;
    });
  }, [dataFasilitas, kataKunci, kategoriDipilih]);

  return (
    <div>
      {dataFasilitas.length === 0 ? (
        <div className="kartu-lembut p-4 text-center my-4">
          <p className="fw-semibold mb-1">Daftar fasilitas sedang dilengkapi</p>
          <p className="small text-muted mb-0">Data fasilitas akan segera ditampilkan.</p>
        </div>
      ) : (
        <>
          {/* Kontrol Pencarian & Filter Kategori */}
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-md-7 col-lg-6">
              <div className="kotak-cari mb-0">
                <span className="ikon-cari" aria-hidden="true">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Cari fasilitas, kantor, sekolah, rumah ibadah..."
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  aria-label="Cari fasilitas di Paslaten Dua"
                />
                {kataKunci && (
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-decoration-none position-absolute"
                    style={{
                      right: "0.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--teks-redup)",
                    }}
                    onClick={() => setKataKunci("")}
                    aria-label="Bersihkan pencarian"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <div className="col-auto">
              <span
                className="badge rounded-pill px-3 py-2 fw-semibold"
                style={{ background: "var(--pasir)", color: "var(--merah)" }}
              >
                Total {hasilFilter.length} Fasilitas Publik
              </span>
            </div>
          </div>

          {/* Tag Kategori Filter */}
          <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter kategori fasilitas">
            {daftarKategori.map((k) => (
              <button
                key={k}
                type="button"
                className={`tag-kategori-btn ${kategoriDipilih === k ? "aktif" : ""}`}
                onClick={() => setKategoriDipilih(k)}
              >
                {k}
              </button>
            ))}
          </div>

          {hasilFilter.length === 0 ? (
            <div className="kartu-lembut p-4 text-center my-4">
              <p className="fw-semibold mb-1">Fasilitas tidak ditemukan</p>
              <p className="small text-muted mb-3">Tidak ada sarana yang cocok dengan filter atau kata kunci Anda.</p>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setKataKunci("");
                  setKategoriDipilih("Semua");
                }}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="row g-4 mb-5">
              {hasilFilter.map((x) => (
                <div className="col-md-6 col-lg-4" key={x.id}>
                  <article className="kartu-fasilitas-unggulan h-100">
                    <div className="wadah-foto-fasilitas">
                      <div className="badge-ambang-atas">
                        <span className="badge-kategori-putih">
                          <span>{getIkonKategori(x.category)}</span>
                          <span>{x.category}</span>
                        </span>
                        <span className="badge-wilayah-gelap">Kel. Paslaten Dua</span>
                      </div>

                      {x.image_url ? (
                        <img src={x.image_url} alt={x.name} loading="lazy" />
                      ) : (
                        <div
                          className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-3"
                          style={{
                            backgroundColor: "var(--merah-tua)",
                            backgroundImage: "var(--motif-latar)",
                            backgroundSize: "56px 56px",
                          }}
                        >
                          <span className="fs-1 mb-1 opacity-75" aria-hidden="true">
                            {getIkonKategori(x.category)}
                          </span>
                          <span className="small text-white-50 fst-italic">Foto dalam proses dokumentasi</span>
                        </div>
                      )}

                      <div className="overlay-judul-fasilitas">
                        <h3>{x.name}</h3>
                      </div>
                    </div>

                    <div className="badan-fasilitas">
                      {x.address && (
                        <div className="d-flex align-items-start gap-2 mb-3 small" style={{ color: "var(--teks)" }}>
                          <span aria-hidden="true" style={{ color: "var(--merah)", fontSize: "1.05rem", lineHeight: 1.2 }}>
                            📍
                          </span>
                          <span className="fw-medium lh-sm">{x.address}</span>
                        </div>
                      )}

                      {x.maps_url && (
                        <a
                          href={x.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm mt-auto d-inline-flex align-items-center justify-content-center gap-1 fw-semibold py-2"
                          style={{ borderRadius: "10px" }}
                        >
                          <span>Petunjuk Arah</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Statistik Sarana Pendidikan */}
      <StatistikPendidikan educationStats={educationStats} />
    </div>
  );
}