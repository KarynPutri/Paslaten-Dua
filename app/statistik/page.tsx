import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

type Kel = {
  id: number;
  name: string;
  male: number;
  female: number;
  area_km2: number | null;
  lingkungan: number | null;
  civil_servants: number | null;
  distance_district_km: number | null;
  distance_city_km: number | null;
  data_year: number | null;
};

const num = (n: number | null | undefined, d = 0) =>
  n === null || n === undefined || Number.isNaN(Number(n))
    ? "-"
    : Number(n).toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

function Batang({
  judul,
  satuan,
  data,
  desimal = 0,
}: {
  judul: string;
  satuan: string;
  data: { nama: string; nilai: number; utama: boolean }[];
  desimal?: number;
}) {
  const maks = Math.max(...data.map((d) => d.nilai), 1);
  return (
    <div className="kartu-lembut p-4 h-100">
      <h3 className="h6 fw-bold mb-3">{judul}</h3>
      {data.map((d) => (
        <div className="mb-3" key={d.nama}>
          <div className="d-flex justify-content-between small mb-1">
            <span className={d.utama ? "fw-bold" : ""}>{d.nama}</span>
            <span className={d.utama ? "fw-bold" : ""}>
              {num(d.nilai, desimal)} {satuan}
            </span>
          </div>
          <div style={{ height: 10, borderRadius: 6, background: "rgba(0,0,0,0.07)" }}>
            <div
              style={{
                width: `${(d.nilai / maks) * 100}%`,
                height: "100%",
                borderRadius: 6,
                background: d.utama ? "var(--merah, #5aa0d8)" : "var(--emas-muda, #bcdcf5)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Statistik() {
  const { data, error } = await supabase
    .from("kelurahan_stats")
    .select("*")
    .order("order_number");
  const kel = (data ?? []) as Kel[];
  const utama = kel.find((k) => k.name.toLowerCase() === "paslaten dua");

  const header = (
    <PageHeader
      judul="Statistik Paslaten Dua"
      deskripsi="Data kependudukan dan wilayah Kelurahan Paslaten Dua, Tomohon Timur"
    />
  );

  if (!utama) {
    return (
      <>
        {header}
        <div className="container py-5">
          {error ? (
            <p className="text-danger">Gagal memuat data: {error.message}</p>
          ) : (
            <p>Data statistik belum diisi.</p>
          )}
        </div>
      </>
    );
  }

  const hitung = (k: Kel) => {
    const pend = k.male + k.female;
    const luas = Number(k.area_km2) || 0;
    return { pend, luas, padat: luas ? pend / luas : 0 };
  };

  const u = hitung(utama);
  const totalPenduduk = kel.reduce((s, k) => s + k.male + k.female, 0);
  const persen = totalPenduduk ? (u.pend / totalPenduduk) * 100 : 0;
  const rasio = utama.female ? (utama.male / utama.female) * 100 : 0;
  const pL = u.pend ? (utama.male / u.pend) * 100 : 0;
  const tahun = utama.data_year ?? 2024;

  const kartu = [
    { label: "Jumlah Penduduk", nilai: `${num(u.pend)} jiwa` },
    { label: "Laki-laki", nilai: `${num(utama.male)} jiwa` },
    { label: "Perempuan", nilai: `${num(utama.female)} jiwa` },
    { label: "Luas Wilayah", nilai: `${num(u.luas, 2)} km²` },
    { label: "Kepadatan Penduduk", nilai: `${num(u.padat, 2)} jiwa/km²` },
    { label: "Rasio Jenis Kelamin", nilai: num(rasio, 2), catatan: "laki-laki per 100 perempuan" },
    { label: "Jumlah Lingkungan", nilai: num(utama.lingkungan) },
    { label: "Pegawai Kelurahan (PNS)", nilai: `${num(utama.civil_servants)} orang` },
    { label: "Porsi Penduduk Kecamatan", nilai: `${num(persen, 2)}%`, catatan: "dari seluruh Tomohon Timur" },
    { label: "Jarak ke Ibukota Kecamatan", nilai: `${num(utama.distance_district_km, 1)} km` },
    { label: "Jarak ke Ibukota Kota", nilai: `${num(utama.distance_city_km, 1)} km` },
  ];

  const banding = (f: (k: Kel) => number) =>
    kel
      .map((k) => ({ nama: k.name, nilai: f(k), utama: k.id === utama.id }))
      .sort((a, b) => b.nilai - a.nilai);

  return (
    <>
      {header}
      <div className="container py-5">
        <section className="mb-5">
          <h2 className="h3 judul-seksi">Angka Utama</h2>
          <div className="row g-3">
            {kartu.map((k) => (
              <div className="col-6 col-md-4 col-lg-3" key={k.label}>
                <div className="kartu-lembut p-3 h-100">
                  <div className="small" style={{ color: "var(--teks-redup, #4a6785)" }}>{k.label}</div>
                  <div className="fs-4 fw-bold" style={{ color: "var(--merah, #5aa0d8)" }}>{k.nilai}</div>
                  {k.catatan && (
                    <div className="small" style={{ color: "var(--teks-redup, #4a6785)" }}>{k.catatan}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="h3 judul-seksi">Komposisi Penduduk</h2>
          <div className="kartu-lembut p-4">
            <div className="d-flex" style={{ height: 28, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ width: `${pL}%`, background: "var(--merah, #5aa0d8)" }} />
              <div style={{ width: `${100 - pL}%`, background: "var(--emas, #c9a24b)" }} />
            </div>
            <div className="d-flex justify-content-between small mt-2">
              <span>Laki-laki {num(utama.male)} ({num(pL, 1)}%)</span>
              <span>Perempuan {num(utama.female)} ({num(100 - pL, 1)}%)</span>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="h3 judul-seksi">Dibandingkan Kelurahan Lain di Tomohon Timur</h2>
          <div className="row g-3">
            <div className="col-lg-4">
              <Batang judul="Jumlah Penduduk" satuan="jiwa" data={banding((k) => hitung(k).pend)} />
            </div>
            <div className="col-lg-4">
              <Batang judul="Kepadatan Penduduk" satuan="jiwa/km²" desimal={2} data={banding((k) => hitung(k).padat)} />
            </div>
            <div className="col-lg-4">
              <Batang judul="Luas Wilayah" satuan="km²" desimal={2} data={banding((k) => hitung(k).luas)} />
            </div>
          </div>
        </section>

        <p className="small mb-0" style={{ color: "var(--teks-redup, #4a6785)" }}>
          Sumber: BPS Kota Tomohon, Kecamatan Tomohon Timur Dalam Angka 2025 (data tahun {tahun}).
          Kepadatan, rasio jenis kelamin, dan persentase dihitung dari jumlah penduduk dan luas wilayah.
        </p>
      </div>
    </>
  );
}