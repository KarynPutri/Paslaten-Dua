import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function Pelayanan() {
  const { data: layanan, error } = await supabase
    .from("services")
    .select("*")
    .order("id");

  return (
    <>
      <PageHeader
        judul="Pelayanan"
        deskripsi="Informasi persyaratan dan prosedur layanan kelurahan"
      />
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {layanan?.length === 0 && <p>Belum ada data pelayanan.</p>}
        {layanan?.map((l) => (
          <div className="kartu-lembut p-4 mb-4" key={l.id}>
            <h2 className="h4 fw-bold mb-3">{l.name}</h2>
            <div className="row g-4">
              <div className="col-md-5">
                <h3 className="h6 fw-bold" style={{ color: "#5aa0d8" }}>Persyaratan</h3>
                <ul className="mb-0">
                  {l.requirements?.map((r: string) => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <div className="col-md-7">
                <h3 className="h6 fw-bold" style={{ color: "#5aa0d8" }}>Prosedur</h3>
                <ol className="mb-0">
                  {l.procedure?.map((p: string) => <li key={p}>{p}</li>)}
                </ol>
              </div>
            </div>
            <hr />
            <p className="small mb-0" style={{ color: "#4a6785" }}>
              Jam pelayanan: {l.service_hours}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}