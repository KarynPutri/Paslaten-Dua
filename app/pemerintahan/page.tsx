import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Struktur Pemerintahan | Kelurahan Paslaten Dua",
  description: "Aparatur dan struktur organisasi Kantor Kelurahan Paslaten Dua, Kecamatan Tomohon Timur",
};

type Pegawai = { id: number; name: string; position: string; photo_url: string | null };

function Kartu({ p, isPimpinan = false }: { p: Pegawai; isPimpinan?: boolean }) {
  return (
    <div
      className="kartu-lembut p-4 text-center h-100 d-flex flex-column align-items-center"
      style={{ borderTop: isPimpinan ? "4px solid var(--emas)" : "3px solid var(--garis)" }}
    >
      {p.photo_url ? (
        <img
          src={p.photo_url}
          alt={p.name}
          className="rounded-circle mb-3 shadow-sm"
          style={{ width: 104, height: 104, objectFit: "cover" }}
        />
      ) : (
        <div className="avatar-kosong shadow-sm mb-3">{p.name.charAt(0)}</div>
      )}
      <h3 className="h6 fw-bold mb-1 mt-auto">{p.name}</h3>
      <p className="small mb-0" style={{ color: isPimpinan ? "var(--merah)" : "var(--teks-redup)", fontWeight: isPimpinan ? 600 : 500 }}>
        {p.position}
      </p>
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
        judul="Struktur Pemerintahan"
        deskripsi="Aparatur dan perangkat Kantor Kelurahan Paslaten Dua, Kecamatan Tomohon Timur"
      />
      <div className="container py-5">
        {error && (
          <div className="kartu-lembut p-4 text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Data pemerintahan belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        )}

        <section className="mb-5">
          <div className="label-kecil mb-1 text-center">Pimpinan Wilayah</div>
          <h2 className="h3 judul-seksi text-center">Lurah & Sekretaris</h2>
          <div className="row g-3 justify-content-center">
            {pimpinan.map((p) => (
              <div className="col-10 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                <Kartu p={p} isPimpinan />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="label-kecil mb-1">Aparatur Kelurahan</div>
          <h2 className="h3 judul-seksi">Staf & Perangkat Kelurahan</h2>
          <div className="row g-3">
            {staff.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                <Kartu p={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}