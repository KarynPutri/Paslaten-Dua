import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { tanggalIndo } from "../../lib/format";

export const revalidate = 60;

export const metadata = {
  title: "Pengumuman Warga | Kelurahan Paslaten Dua",
  description: "Pemberitahuan dan pengumuman resmi untuk masyarakat Kelurahan Paslaten Dua, Tomohon Timur",
};

export default async function Pengumuman() {
  const { data: pengumuman, error } = await supabase
    .from("announcements")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Pengumuman Resmi"
        deskripsi="Informasi dan edaran penting bagi seluruh warga Kelurahan Paslaten Dua"
      />
      <div className="container py-5" style={{ maxWidth: "840px" }}>
        {error && (
          <div className="kartu-lembut p-4 text-center mx-auto mb-4">
            <p className="fw-semibold mb-1">Pengumuman belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        )}

        {!error && (!pengumuman || pengumuman.length === 0) && (
          <div className="kartu-lembut p-5 text-center">
            <p className="fw-semibold mb-1">Belum ada pengumuman terbaru</p>
            <p className="small text-muted mb-0">Edaran atau pengumuman resmi akan ditampilkan di halaman ini.</p>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {pengumuman?.map((p) => (
            <article
              className="kartu-lembut p-4 shadow-sm"
              key={p.id}
              style={{ borderLeft: "5px solid var(--emas)" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge" style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)", fontSize: "0.75rem" }}>
                  Edaran Kelurahan
                </span>
                <span className="small text-muted">•</span>
                <time className="small fw-semibold" style={{ color: "var(--emas-teks)" }} dateTime={p.published_at}>
                  {tanggalIndo(p.published_at)}
                </time>
              </div>

              <h2 className="h5 fw-bold mb-3">{p.title}</h2>
              <div className="text-muted" style={{ whiteSpace: "pre-line", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {p.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}