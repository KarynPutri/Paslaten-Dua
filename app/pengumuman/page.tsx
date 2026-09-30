import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { tanggalIndo } from "../../lib/format";

export const dynamic = "force-dynamic";

export default async function Pengumuman() {
  const { data: pengumuman, error } = await supabase
    .from("announcements")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Pengumuman"
        deskripsi="Informasi penting untuk warga Paslaten Dua"
      />
      <div className="container py-5" style={{ maxWidth: "800px" }}>
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {pengumuman?.length === 0 && <p>Belum ada pengumuman.</p>}
        {pengumuman?.map((p) => (
          <div
            className="kartu-lembut p-4 mb-3"
            key={p.id}
            style={{ borderLeft: "4px solid var(--merah)" }}
          >
            <p className="small mb-1" style={{ color: "var(--teks-redup)" }}>{tanggalIndo(p.published_at)}</p>
            <h2 className="h5 fw-bold">{p.title}</h2>
            <p className="mb-0" style={{ whiteSpace: "pre-line" }}>{p.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}