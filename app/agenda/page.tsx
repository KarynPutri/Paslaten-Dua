import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { pecahTanggal } from "../../lib/format";

export const dynamic = "force-dynamic";

export default async function Agenda() {
  const hariIni = new Date().toISOString().slice(0, 10);
  const { data: agenda, error } = await supabase
    .from("agendas")
    .select("*")
    .gte("date", hariIni)
    .order("date", { ascending: true });

  return (
    <>
      <PageHeader
        judul="Agenda"
        deskripsi="Jadwal kegiatan Kelurahan Paslaten Dua"
      />
      <div className="container py-5" style={{ maxWidth: "800px" }}>
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {agenda?.length === 0 && <p>Belum ada agenda mendatang.</p>}
        {agenda?.map((a) => {
          const t = pecahTanggal(a.date);
          return (
            <div className="kartu-lembut p-3 mb-3 d-flex gap-3 align-items-center" key={a.id}>
              <div
                className="text-center flex-shrink-0"
                style={{ width: "72px", padding: "10px 0", borderRadius: "12px", backgroundColor: "#dcedfb", color: "#1e3a5f" }}
              >
                <div className="fs-4 fw-bold lh-1">{t.hari}</div>
                <div className="small fw-semibold">{t.bulan}</div>
                <div className="small">{t.tahun}</div>
              </div>
              <div>
                <h2 className="h5 fw-bold mb-1">{a.title}</h2>
                <p className="small mb-1" style={{ color: "#4a6785" }}>{a.time} · {a.location}</p>
                <p className="mb-0">{a.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}