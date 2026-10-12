import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Kontak | Kelurahan Paslaten Dua",
  description: "Alamat kantor, email resmi, dan jam pelayanan Kantor Kelurahan Paslaten Dua, Kota Tomohon",
};

export default async function Kontak() {
  const { data: p } = await supabase.from("profiles").select("*").eq("id", 1).maybeSingle();

  const alamatKantor =
    p?.office_address || "Kelurahan Paslaten Dua, Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara";
  const emailResmi = p?.email || "kelurahanpaslatendua@gmail.com";

  return (
    <>
      <PageHeader
        judul="Kontak Kelurahan"
        deskripsi="Informasi alamat kantor, email resmi, dan jam operasional pelayanan warga"
      />
      <div className="container py-5">
        <div className="kolom-baca" style={{ maxWidth: "860px" }}>
          {/* Jam Pelayanan Banner */}
          <div className="bingkai-tulisan mb-4" style={{ borderLeft: "4px solid var(--emas)" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <span className="lencana-budaya mb-2">Jam Kerja Pemerintah</span>
                <h2 className="h5 fw-bold mb-1" style={{ color: "var(--merah)" }}>
                  Waktu Pelayanan Administrasi
                </h2>
                <p className="mb-0 text-muted small">
                  {p?.office_hours || "Senin – Jumat, mengikuti jam kerja resmi pemerintah daerah."}
                </p>
              </div>
              <div className="text-md-end">
                <span
                  className="badge rounded-pill px-3 py-2 fw-semibold"
                  style={{ background: "var(--pasir)", color: "var(--merah)" }}
                >
                  08.00 – 16.00 WITA
                </span>
              </div>
            </div>
          </div>

          {/* Grid Kontak Resmi (Alamat & Email) */}
          <div className="row g-4 mb-4">
            {/* Alamat Kantor */}
            <div className="col-md-6">
              <div className="bingkai-tulisan h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fs-5">🏛️</span>
                    <span
                      className="small fw-bold text-uppercase"
                      style={{ color: "var(--merah)", letterSpacing: "0.06em" }}
                    >
                      Alamat Kantor
                    </span>
                  </div>
                  <p className="fw-bold fs-6 mb-2 text-break" style={{ color: "var(--teks)" }}>
                    {alamatKantor}
                  </p>
                </div>
                <span className="small text-muted mt-2">
                  Pusat layanan administrasi & pemerintahan kelurahan
                </span>
              </div>
            </div>

            {/* Email Resmi */}
            <div className="col-md-6">
              <div className="bingkai-tulisan h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fs-5">✉️</span>
                    <span
                      className="small fw-bold text-uppercase"
                      style={{ color: "var(--merah)", letterSpacing: "0.06em" }}
                    >
                      Email Resmi
                    </span>
                  </div>
                  <a
                    href={`mailto:${emailResmi}`}
                    className="fw-bold fs-6 text-decoration-none d-block mb-2 text-break"
                    style={{ color: "var(--merah)" }}
                  >
                    {emailResmi}
                  </a>
                </div>
                <span className="small text-muted mt-2">
                  Saluran korespondensi resmi, aduan, dan permohonan digital
                </span>
              </div>
            </div>
          </div>

          {/* Kartu Bantuan Layanan Warga */}
          <div
            className="bingkai-tulisan mb-4 p-4"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, var(--pasir) 100%)" }}
          >
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
              <div>
                <h3 className="h6 fw-bold mb-1" style={{ color: "var(--merah)" }}>
                  Butuh Informasi Persyaratan Layanan?
                </h3>
                <p className="small text-muted mb-0">
                  Periksa syarat pembuatan surat keterangan, izin usaha, dan berkas kependudukan lainnya.
                </p>
              </div>
              <Link href="/pelayanan" className="btn btn-primary btn-sm px-3 py-2 text-nowrap">
                Lihat Pelayanan Warga →
              </Link>
            </div>
          </div>

          {/* Tautan Navigasi ke Halaman Peta */}
          <div
            className="p-4 rounded-4 text-center"
            style={{ background: "var(--pasir)", border: "1px dashed var(--garis)" }}
          >
            <p className="mb-2 fw-semibold" style={{ color: "var(--teks)" }}>
              Mencari denah lokasi dan batas wilayah geografis?
            </p>
            <Link href="/peta" className="btn btn-outline-primary px-4 py-2 fw-bold">
              Buka Halaman Peta Wilayah →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}