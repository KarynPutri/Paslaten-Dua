import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { pecahTanggal } from "../../lib/format";

export const revalidate = 60;

export const metadata = {
  title: "Agenda Kegiatan | Kelurahan Paslaten Dua",
  description: "Jadwal kegiatan masyarakat, keagamaan, dan pemerintahan di Kelurahan Paslaten Dua",
};

export default async function Agenda() {
  // Zona waktu WITA (UTC+8) agar agenda hari ini tidak terpotong lebih awal
  const hariIniWita = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const { data: agenda, error } = await supabase
    .from("agendas")
    .select("*")
    .gte("date", hariIniWita)
    .order("date", { ascending: true })
    .order("id", { ascending: true });

  return (
    <>
      <PageHeader
        judul="Agenda Kegiatan"
        deskripsi="Jadwal agenda dan kegiatan mendatang di Kelurahan Paslaten Dua"
      />
      <div className="container py-5" style={{ maxWidth: "840px" }}>
        {error && (
          <div className="kartu-lembut p-4 text-center mx-auto mb-4">
            <p className="fw-semibold mb-1">Agenda belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        )}

        {!error && (!agenda || agenda.length === 0) && (
          <div className="kartu-lembut p-5 text-center">
            <p className="fw-semibold mb-1">Belum ada agenda mendatang</p>
            <p className="small text-muted mb-0">Jadwal kegiatan kelurahan berikutnya akan segera diperbarui.</p>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {agenda?.map((a) => {
            const t = pecahTanggal(a.date);
            return (
              <article
                className="kartu-lembut p-4 d-flex flex-column flex-sm-row gap-3 align-items-sm-center shadow-sm"
                key={a.id}
                style={{ borderLeft: "5px solid var(--merah)" }}
              >
                {/* Badge Tanggal Kalender Budaya */}
                <div
                  className="text-center flex-shrink-0 shadow-sm"
                  style={{
                    width: "80px",
                    padding: "12px 0",
                    borderRadius: "14px",
                    backgroundColor: "var(--pasir)",
                    color: "var(--merah-tua)",
                    border: "1px solid var(--garis)",
                  }}
                >
                  <div className="fs-3 fw-bold lh-1">{t.hari}</div>
                  <div className="small fw-bold text-uppercase mt-1" style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}>
                    {t.bulan}
                  </div>
                  <div className="small text-muted" style={{ fontSize: "0.72rem" }}>
                    {t.tahun}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <h2 className="h5 fw-bold mb-1">{a.title}</h2>
                  <p className="small mb-2 fw-semibold" style={{ color: "var(--emas-teks)" }}>
                    🕒 {a.time || "Waktu menyesuaikan"} &nbsp;·&nbsp; 📍 {a.location || "Kelurahan Paslaten Dua"}
                  </p>
                  {a.description && (
                    <p className="mb-0 text-muted small" style={{ lineHeight: 1.6 }}>
                      {a.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}