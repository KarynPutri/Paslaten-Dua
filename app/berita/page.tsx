import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { tanggalIndo } from "../../lib/format";

export const dynamic = "force-dynamic";

export default async function Berita() {
  const { data: berita, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Berita & Kegiatan"
        deskripsi="Kabar dan kegiatan terbaru dari Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {berita?.length === 0 && <p>Belum ada berita.</p>}
        <div className="row g-4">
          {berita?.map((b) => (
            <div className="col-md-6 col-lg-4" key={b.id}>
              <div className="kartu-lembut h-100 overflow-hidden">
                {b.image_url ? (
                  <img src={b.image_url} alt={b.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                ) : (
                  <div style={{ backgroundColor: "var(--pasir)", height: "160px" }} />
                )}
                <div className="p-3">
                  <p className="small mb-1" style={{ color: "var(--teks-redup)" }}>{tanggalIndo(b.published_at)}</p>
                  <h2 className="h5 fw-bold">{b.title}</h2>
                  <p>{b.summary}</p>
                  <Link href={`/berita/${b.id}`}>Baca Selengkapnya</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}