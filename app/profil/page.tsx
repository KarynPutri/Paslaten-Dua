import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Profil Kelurahan | Kelurahan Paslaten Dua",
  description: "Sejarah, visi misi, batas wilayah geografis, dan potensi Kelurahan Paslaten Dua, Tomohon Timur",
};

export default async function Profil() {
  const { data: p } = await supabase.from("profiles").select("*").eq("id", 1).maybeSingle();

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
        deskripsi="Mengenal sejarah, visi-misi, wilayah, dan potensi Kelurahan Paslaten Dua"
      />

      <div className="container py-5">
        {/* Navigasi Sub-Bagian */}
        <nav className="nav-subhalaman justify-content-center" aria-label="Navigasi bagian profil">
          <a href="#sejarah">Sejarah</a>
          <a href="#visi-misi">Visi & Misi</a>
          <a href="#wilayah">Wilayah & Batas</a>
          <a href="#potensi">Potensi Kelurahan</a>
        </nav>

        <div className="kolom-baca">
          {/* Bagian Sejarah */}
          <section id="sejarah" className="mb-5 pt-3" tabIndex={-1}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="lencana-budaya">Asal-Usul</span>
            </div>
            <h2 className="h3 judul-seksi">Sejarah Kelurahan</h2>
            <div className="bingkai-tulisan">
              <p className="mb-0 fs-6 lh-lg" style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
                {p?.history || "Informasi sejarah kelurahan sedang dipersiapkan."}
              </p>
            </div>
          </section>

          {/* Bagian Visi & Misi */}
          <section id="visi-misi" className="mb-5 pt-3" tabIndex={-1}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="lencana-budaya">Arah Pembangunan</span>
            </div>
            <h2 className="h3 judul-seksi">Visi & Misi</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bingkai-tulisan h-100" style={{ borderTop: "4px solid var(--emas)" }}>
                  <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--merah)" }}>
                    <span>✦</span> Visi
                  </h3>
                  <div className="sorotan-teks m-0">
                    <p className="mb-0 fs-6 fst-italic" style={{ whiteSpace: "pre-line" }}>
                      {p?.vision || "Visi kelurahan belum diisi."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bingkai-tulisan h-100" style={{ borderTop: "4px solid var(--merah)" }}>
                  <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--merah)" }}>
                    <span>✦</span> Misi
                  </h3>
                  <p className="mb-0 fs-6 lh-lg" style={{ whiteSpace: "pre-line" }}>
                    {p?.mission || "Misi kelurahan belum diisi."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian Wilayah & Batas */}
          <section id="wilayah" className="mb-5 pt-3" tabIndex={-1}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="lencana-budaya">Kondisi Wilayah</span>
            </div>
            <h2 className="h3 judul-seksi">Geografis & Batas Wilayah</h2>
            <div className="bingkai-tulisan mb-4">
              <p className="mb-0 fs-6 lh-lg" style={{ whiteSpace: "pre-line" }}>
                {p?.geography || "Kelurahan Paslaten Dua berada di wilayah Kecamatan Tomohon Timur, Kota Tomohon."}
              </p>
            </div>

            <div className="row g-3">
              {batas.map((b) => (
                <div className="col-6 col-md-3" key={b.arah}>
                  <div className="bingkai-tulisan p-3 text-center h-100">
                    <div className="small fw-bold mb-1" style={{ color: "var(--merah)" }}>
                      Sebelah {b.arah}
                    </div>
                    <div className="small text-truncate" title={b.wilayah || "-"}>
                      {b.wilayah || "-"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bagian Potensi Kelurahan */}
          <section id="potensi" className="pt-3" tabIndex={-1}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="lencana-budaya">Kekayaan Lokal</span>
            </div>
            <h2 className="h3 judul-seksi">Potensi Wilayah</h2>
            <div className="bingkai-tulisan">
              <p className="text-muted small mb-3">
                Potensi unggulan masyarakat di bidang pariwisata, budaya, ekonomi kreatif, dan pertanian:
              </p>
              <div className="d-flex flex-wrap gap-2">
                {p?.potential && p.potential.length > 0 ? (
                  p.potential.map((x: string) => (
                    <span
                      key={x}
                      className="badge rounded-pill px-3 py-2 fw-semibold fs-6 shadow-sm"
                      style={{ backgroundColor: "var(--pasir)", color: "var(--merah)", border: "1px solid rgba(155,28,28,0.12)" }}
                    >
                      {x}
                    </span>
                  ))
                ) : (
                  <p className="small text-muted mb-0">Belum ada potensi yang dicantumkan.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}