import PageHeader from "../../components/PageHeader";
import Foto from "../../components/Foto";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function UMKM() {
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="UMKM Paslaten Dua"
        deskripsi="Direktori usaha warga Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {umkm?.length === 0 && <p>Belum ada data UMKM.</p>}
        <div className="row g-4">
          {umkm?.map((u) => (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <div className="kartu-lembut h-100 overflow-hidden d-flex flex-column">
                <Foto src={u.image_url} alt={u.name} />
                <div className="p-3 d-flex flex-column flex-grow-1">
                  <h2 className="h5 fw-bold mb-2">{u.name}</h2>
                  <div className="mb-2">
                    <span className="badge fw-normal" style={{ backgroundColor: "var(--pasir)", color: "var(--teks)" }}>
                      {u.category}
                    </span>
                  </div>
                  <p className="mb-2">{u.description}</p>
                  <p className="small mb-3" style={{ color: "var(--teks-redup)" }}>
                    Pemilik: {u.owner} · {u.address}
                  </p>
                  {u.whatsapp && (
                    <a
                      href={`https://wa.me/${u.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-auto"
                    >
                      Hubungi via WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}