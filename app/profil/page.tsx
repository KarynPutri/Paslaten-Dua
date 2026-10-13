import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import StrukturPemerintahan from "../../components/StrukturPemerintahan";
import { supabase } from "../../lib/supabase";
import { LOKASI_PASLATEN_DUA } from "../../lib/lokasi";

export const revalidate = 60;

export const metadata = {
  title: "Profil | Kelurahan Paslaten Dua",
  description:
    "Profil Kelurahan Paslaten Dua, Tomohon Timur: informasi wilayah, visi dan misi, batas wilayah, dan struktur pemerintahan.",
};

export default async function Profil() {
  const { data: p } = await supabase.from("profiles").select("*").eq("id", 1).maybeSingle();

  const lingkungan: string[] = p?.neighborhoods ?? [];
  const potensi: string[] = p?.potential ?? [];
  const misi: string[] = (p?.mission ?? "")
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const angka = [
    { label: "Luas Wilayah", nilai: p?.area },
    { label: "Jumlah Penduduk", nilai: p?.population },
    { label: "Kepala Keluarga", nilai: p?.households },
    { label: "Jumlah Lingkungan", nilai: lingkungan.length ? String(lingkungan.length) : "" },
    { label: "Kode Pos", nilai: p?.postal_code || LOKASI_PASLATEN_DUA.kodePos },
  ];

  const batas = [
    { arah: "Utara", wilayah: p?.boundaries?.utara },
    { arah: "Selatan", wilayah: p?.boundaries?.selatan },
    { arah: "Timur", wilayah: p?.boundaries?.timur },
    { arah: "Barat", wilayah: p?.boundaries?.barat },
  ];

  return (
    <>
      <PageHeader
        judul="Profil Kelurahan"
        deskripsi="Mengenal Kelurahan Paslaten Dua, Kecamatan Tomohon Timur"
      />

      {/* Informasi Paslaten Dua */}
      <section id="informasi" className="container py-5">
        <div className="label-kecil mb-1">Informasi</div>
        <h2 className="h3 judul-seksi">Tentang Paslaten Dua</h2>
        <p className="mb-4" style={{ maxWidth: 760, lineHeight: 1.8 }}>
          Kelurahan Paslaten Dua berada di Kecamatan Tomohon Timur, Kota Tomohon, Provinsi Sulawesi Utara.
        </p>

        <div className="row g-3 justify-content-center">
          {angka.map((a) => (
            <div className="col-6 col-md-4 col-lg" key={a.label}>
              <div className="kartu-lembut p-3 text-center h-100">
                <div className="fs-3 fw-bold" style={{ color: "var(--merah)" }}>
                  {a.nilai || "-"}
                </div>
                <div className="small" style={{ color: "var(--teks-redup)" }}>{a.label}</div>
              </div>
            </div>
          ))}
        </div>

        {lingkungan.length > 0 && (
          <div className="mt-4">
            <div className="label-kecil mb-2">Lingkungan</div>
            <div className="d-flex flex-wrap gap-2">
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

        {p?.data_source && (
          <p className="small mt-3 mb-0" style={{ color: "var(--teks-redup)" }}>
            Sumber data: {p.data_source}
          </p>
        )}

        <div className="d-flex flex-wrap gap-2 mt-4">
          <Link href="/sejarah" className="btn btn-primary">Baca sejarah lengkap</Link>
          <Link href="/statistik" className="btn btn-outline-primary">Statistik lengkap</Link>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="latar-pasir py-5">
        <div className="container">
          <div className="label-kecil mb-1">Arah Pembangunan</div>
          <h2 className="h3 judul-seksi mb-4">Visi & Misi</h2>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="kartu-lembut p-4 h-100" style={{ borderTop: "4px solid var(--emas)" }}>
                <h3 className="h5 fw-bold mb-3">Visi</h3>
                <p className="mb-0" style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
                  {p?.vision || "-"}
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="kartu-lembut p-4 h-100" style={{ borderTop: "4px solid var(--merah)" }}>
                <h3 className="h5 fw-bold mb-3">Misi</h3>
                {misi.length > 1 ? (
                  <ol className="mb-0 ps-3" style={{ lineHeight: 1.8 }}>
                    {misi.map((m, i) => (
                      <li key={i} className="mb-1">{m}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>{misi[0] || "-"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wilayah */}
      <section id="wilayah" className="container py-5">
        <div className="label-kecil mb-1">Wilayah</div>
        <h2 className="h3 judul-seksi">Letak & Batas Wilayah</h2>
        {p?.geography && (
          <p className="mb-4" style={{ maxWidth: 760, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {p.geography}
          </p>
        )}

        <div className="row g-3">
          {batas.map((b) => (
            <div className="col-12 col-sm-6 col-lg-3" key={b.arah}>
              <div className="kartu-lembut p-3 text-center h-100">
                <div className="small fw-bold mb-1" style={{ color: "var(--merah)" }}>
                  {b.arah}
                </div>
                <div style={{ whiteSpace: "normal", overflowWrap: "anywhere", lineHeight: 1.5 }}>
                  {b.wilayah || "-"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {potensi.length > 0 && (
          <div className="mt-4">
            <div className="label-kecil mb-2">Potensi Wilayah</div>
            <div className="d-flex flex-wrap gap-2">
              {potensi.map((x) => (
                <span
                  key={x}
                  className="badge rounded-pill px-3 py-2 fw-normal fs-6"
                  style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)" }}
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Struktur Pemerintahan */}
      <StrukturPemerintahan />
    </>
  );
}