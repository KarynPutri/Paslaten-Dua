import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

type Pegawai = { id: number; name: string; position: string; photo_url: string | null };

function Kartu({ p }: { p: Pegawai }) {
  return (
    <div className="kartu-lembut p-4 text-center h-100">
      {p.photo_url ? (
        <img
          src={p.photo_url}
          alt={p.name}
          className="rounded-circle mb-3"
          style={{ width: 96, height: 96, objectFit: "cover" }}
        />
      ) : (
        <div className="avatar-kosong">{p.name.charAt(0)}</div>
      )}
      <h3 className="h6 fw-bold mb-1">{p.name}</h3>
      <p className="small mb-0" style={{ color: "#4a6785" }}>{p.position}</p>
    </div>
  );
}

export default async function Pemerintahan() {
  const { data, error } = await supabase
    .from("government")
    .select("*")
    .order("order_number");

  const pimpinan = data?.filter((d) => d.order_number <= 2) ?? [];
  const staff = data?.filter((d) => d.order_number > 2) ?? [];

  return (
    <>
      <PageHeader
        judul="Pemerintahan"
        deskripsi="Struktur pemerintahan Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}

        <section className="mb-5">
          <h2 className="h3 judul-seksi">Pimpinan</h2>
          <div className="row g-3 justify-content-center">
            {pimpinan.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}><Kartu p={p} /></div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="h3 judul-seksi">Staff Kelurahan</h2>
          <div className="row g-3">
            {staff.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}><Kartu p={p} /></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}