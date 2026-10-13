import { supabase } from "../lib/supabase";

type Pegawai = {
  id: number;
  name: string;
  position: string;
  photo_url: string | null;
  section: string | null;
};

const KELOMPOK = [
  { kunci: "Pimpinan", judul: "Pimpinan Kelurahan" },
  { kunci: "Kepala Seksi", judul: "Kepala Seksi (Kasie)" },
  { kunci: "Lingkungan", judul: "Kepala & Wakil Lingkungan" },
];

function Kartu({ p }: { p: Pegawai }) {
  return (
    <div className="kartu-lembut p-4 text-center h-100 d-flex flex-column align-items-center">
      {p.photo_url ? (
        <img
          src={p.photo_url}
          alt={p.name}
          className="rounded-circle mb-3 shadow-sm"
          style={{ width: 96, height: 96, objectFit: "cover" }}
        />
      ) : (
        <div className="avatar-kosong shadow-sm">{p.name.charAt(0)}</div>
      )}
      <h4 className="h6 fw-bold mb-1 mt-auto">{p.name}</h4>
      <p className="small mb-0 fw-semibold" style={{ color: "var(--merah)" }}>
        {p.position}
      </p>
    </div>
  );
}

export default async function StrukturPemerintahan() {
  const { data, error } = await supabase
    .from("government")
    .select("*")
    .order("order_number");

  const pegawai = (data ?? []) as Pegawai[];

  const kelompok = KELOMPOK.map((k) => ({
    judul: k.judul,
    isi: pegawai.filter((p) => p.section === k.kunci),
  })).filter((k) => k.isi.length > 0);

  const kunciDikenal = KELOMPOK.map((k) => k.kunci);
  const lainnya = pegawai.filter((p) => !p.section || !kunciDikenal.includes(p.section));
  if (lainnya.length > 0) kelompok.push({ judul: "Pegawai Lainnya", isi: lainnya });

  return (
    <section id="struktur" className="latar-pasir py-5">
      <div className="container">
        <div className="label-kecil mb-1">Pemerintahan</div>
        <h2 className="h3 judul-seksi mb-4">Struktur Pemerintahan</h2>

        {error && (
          <p className="text-center text-muted">Data struktur pemerintahan belum dapat dimuat.</p>
        )}
        {!error && pegawai.length === 0 && (
          <p className="text-center text-muted">Data struktur pemerintahan sedang dilengkapi.</p>
        )}

        {kelompok.map((k) => (
          <div className="mb-5" key={k.judul}>
            <h3 className="h5 fw-bold mb-3" style={{ borderLeft: "4px solid var(--emas)", paddingLeft: "0.75rem" }}>
              {k.judul}
            </h3>
            <div className="row g-3 justify-content-center">
              {k.isi.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                  <Kartu p={p} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}