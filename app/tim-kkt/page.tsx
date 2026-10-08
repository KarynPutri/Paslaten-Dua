import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function TimKKT() {
  const { data, error } = await supabase
    .from("kkt_team")
    .select("*")
    .order("order_number");

  return (
    <>
      <PageHeader
        judul="Tim KKT"
        deskripsi="Mahasiswa yang mengembangkan website ini bersama Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        <p className="mb-4" style={{ maxWidth: "700px" }}>
          Website ini dikembangkan bersama Tim KKT (isi nama kampus dan angkatan di sini)
          sebagai bagian dari kegiatan di Kelurahan Paslaten Dua, Tomohon Timur.
        </p>

        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {data?.length === 0 && <p>Data tim belum diisi.</p>}

        <div className="row g-3">
          {data?.map((m) => (
            <div className="col-6 col-md-4 col-lg-3" key={m.id}>
              <div className="kartu-lembut p-4 text-center h-100">
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    className="rounded-circle mb-3"
                    style={{ width: 96, height: 96, objectFit: "cover" }}
                  />
                ) : (
                  <div className="avatar-kosong">{m.name.charAt(0)}</div>
                )}
                <h2 className="h6 fw-bold mb-1">{m.name}</h2>
                {m.role && <p className="small mb-1" style={{ color: "#5aa0d8", fontWeight: 600 }}>{m.role}</p>}
                {m.study_program && (
                  <p className="small mb-0" style={{ color: "#4a6785" }}>{m.study_program}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}