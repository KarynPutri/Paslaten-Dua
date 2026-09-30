import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

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
        deskripsi="Mengenal Kelurahan Paslaten Dua, Tomohon Timur"
      />
      <div className="container py-5">
        <section className="mb-5">
          <h2 className="h3 judul-seksi">Sejarah</h2>
          <p style={{ whiteSpace: "pre-line" }}>{p?.history || "-"}</p>
        </section>

        <section className="mb-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="kartu-lembut p-4 h-100">
                <h2 className="h4 fw-bold">Visi</h2>
                <p className="mb-0" style={{ whiteSpace: "pre-line" }}>{p?.vision || "-"}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="kartu-lembut p-4 h-100">
                <h2 className="h4 fw-bold">Misi</h2>
                <p className="mb-0" style={{ whiteSpace: "pre-line" }}>{p?.mission || "-"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="h3 judul-seksi">Geografis & Batas Wilayah</h2>
          <p style={{ whiteSpace: "pre-line" }}>{p?.geography || "-"}</p>
          <div className="row g-3">
            {batas.map((b) => (
              <div className="col-6 col-md-3" key={b.arah}>
                <div className="kartu-lembut p-3 text-center h-100">
                  <div className="small" style={{ color: "var(--merah)", fontWeight: 600 }}>{b.arah}</div>
                  <div>{b.wilayah || "-"}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="h3 judul-seksi">Potensi Wilayah</h2>
          <div className="d-flex flex-wrap gap-2">
            {p?.potential?.map((x: string) => (
              <span
                key={x}
                className="badge rounded-pill px-3 py-2 fw-normal fs-6"
                style={{ backgroundColor: "var(--pasir)", color: "var(--teks)" }}
              >
                {x}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}