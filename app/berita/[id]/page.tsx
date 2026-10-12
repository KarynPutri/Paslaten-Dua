import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../../components/PageHeader";
import { supabase } from "../../../lib/supabase";
import { tanggalIndo } from "../../../lib/format";

export const revalidate = 60;

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: item } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <>
      <PageHeader judul={item.title} deskripsi={`Diterbitkan pada ${tanggalIndo(item.published_at)}`} />
      <div className="container py-5">
        <div className="kolom-baca">
          <nav className="mb-4" aria-label="Breadcrumb">
            <Link href="/berita" className="fw-semibold d-inline-flex align-items-center gap-1 text-decoration-none" style={{ color: "var(--merah)" }}>
              <span aria-hidden="true">←</span>
              <span>Kembali ke Berita & Kegiatan</span>
            </Link>
          </nav>

          <article className="kartu-lembut p-4 p-md-5 mb-5 shadow-sm">
            {item.image_url ? (
              <div className="overflow-hidden mb-4" style={{ borderRadius: "14px" }}>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }}
                />
              </div>
            ) : null}

            <div className="d-flex align-items-center gap-2 mb-3 small" style={{ color: "var(--teks-redup)" }}>
              <span className="badge" style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)" }}>
                Kabar Paslaten Dua
              </span>
              <span>•</span>
              <time dateTime={item.published_at}>{tanggalIndo(item.published_at)}</time>
            </div>

            <h1 className="h3 fw-bold mb-4" style={{ lineHeight: 1.35 }}>
              {item.title}
            </h1>

            {item.summary && (
              <p className="lead fw-normal mb-4 p-3 border-start border-3" style={{ borderColor: "var(--emas)", backgroundColor: "var(--pasir)", color: "var(--teks)" }}>
                {item.summary}
              </p>
            )}

            <div className="konten-artikel" style={{ lineHeight: 1.85, whiteSpace: "pre-line", fontSize: "1.05rem" }}>
              {item.content}
            </div>
          </article>

          <div className="border-top pt-4 text-center">
            <Link href="/berita" className="btn btn-outline-primary px-4">
              ← Lihat Kabar Berita Lainnya
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}