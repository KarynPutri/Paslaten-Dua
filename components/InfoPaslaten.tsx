import Link from "next/link";
import { LOKASI_PASLATEN_DUA } from "../lib/lokasi";

type Profil = {
  geography?: string | null;
  area?: string | null;
  population?: string | null;
  households?: string | null;
  postal_code?: string | null;
  data_source?: string | null;
  neighborhoods?: string[] | null;
} | null;

export default function InfoPaslaten({ profil }: { profil: Profil }) {
  const lingkungan = profil?.neighborhoods ?? [];

  const angka = [
    { label: "Luas Wilayah", nilai: profil?.area },
    { label: "Jumlah Penduduk", nilai: profil?.population },
    { label: "Kepala Keluarga", nilai: profil?.households },
    { label: "Jumlah Lingkungan", nilai: lingkungan.length ? String(lingkungan.length) : "" },
    { label: "Kode Pos", nilai: profil?.postal_code || LOKASI_PASLATEN_DUA.kodePos },
  ];

  return (
    <section className="latar-pasir py-5">
      <div className="container py-3">
        <div className="text-center mb-4">
          <div className="label-kecil mb-1">Profil Wilayah</div>
          <h2 className="h3 judul-seksi">Mengenal Paslaten Dua</h2>
          {profil?.geography && (
            <p
              className="mx-auto"
              style={{ maxWidth: 680, color: "var(--teks-redup)", whiteSpace: "pre-line" }}
            >
              {profil.geography}
            </p>
          )}
        </div>

        <div className="row g-3 justify-content-center">
          {angka.map((a) => (
            <div className="col-6 col-md-4 col-lg" key={a.label}>
              <div className="kartu-lembut kartu-budaya p-3 text-center h-100">
                <div className="fs-3 fw-bold" style={{ color: "var(--merah)" }}>
                  {a.nilai || "-"}
                </div>
                <div className="small" style={{ color: "var(--teks-redup)" }}>{a.label}</div>
              </div>
            </div>
          ))}
        </div>

        {lingkungan.length > 0 && (
          <div className="text-center mt-4">
            <div className="label-kecil mb-2">Lingkungan</div>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {lingkungan.map((l) => (
                <span
                  key={l}
                  className="badge rounded-pill px-3 py-2 fw-normal"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "var(--merah-tua)",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {profil?.data_source && (
          <p className="small text-center mt-3 mb-0" style={{ color: "var(--teks-redup)" }}>
            Sumber data: {profil.data_source}
          </p>
        )}

        <div className="text-center mt-3">
          <Link href="/profil" className="fw-semibold">Lihat profil lengkap →</Link>
        </div>
      </div>
    </section>
  );
}