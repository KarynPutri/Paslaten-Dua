import PageHeader from "../../components/PageHeader";
import Foto from "../../components/Foto";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

const urutan = [
  "Pemerintahan",
  "Pendidikan",
  "Kesehatan",
  "Ibadah",
  "Perdagangan & Perbankan",
  "Akomodasi",
  "Olahraga & Ruang Publik",
  "Lainnya",
];

export default async function Fasilitas() {
  const [{ data: fas, error }, { data: edu }] = await Promise.all([
    supabase.from("facilities").select("*").order("name"),
    supabase.from("education_stats").select("*").order("order_number"),
  ]);

  const daftar = fas ?? [];
  const ada = Array.from(new Set(daftar.map((f) => f.category as string)));
  const kategori = [...urutan.filter((k) => ada.includes(k)), ...ada.filter((k) => !urutan.includes(k))];

  const sekolah = edu ?? [];
  const jml = (k: string) => sekolah.reduce((s, e) => s + (Number(e[k]) || 0), 0);
  const f = (n: number) => n.toLocaleString("id-ID");

  return (
    <>
      <PageHeader
        judul="Fasilitas"
        deskripsi="Fasilitas dan sarana yang tersedia di Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        {daftar.length === 0 && !error && (
          <p>Daftar fasilitas sedang dilengkapi oleh Tim KKT.</p>
        )}

        {kategori.map((kat) => (
          <section className="mb-5" key={kat}>
            <h2 className="h3 judul-seksi">{kat}</h2>
            <div className="row g-4">
              {daftar
                .filter((x) => x.category === kat)
                .map((x) => (
                  <div className="col-md-6 col-lg-4" key={x.id}>
                    <div className="kartu-lembut h-100 overflow-hidden d-flex flex-column">
                      <Foto src={x.image_url} alt={x.name} tinggi={160} />
                      <div className="p-3 d-flex flex-column flex-grow-1">
                        <h3 className="h5 fw-bold mb-2">{x.name}</h3>
                        {x.description && <p className="mb-2">{x.description}</p>}
                        {x.address && (
                          <p className="small mb-3" style={{ color: "var(--teks-redup, #4a6785)" }}>
                            {x.address}
                          </p>
                        )}
                        {x.maps_url?.startsWith("http") && (
                          <a
                            href={x.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary mt-auto"
                          >
                            Lihat Lokasi
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {sekolah.length > 0 && (
          <section>
            <h2 className="h3 judul-seksi">Sarana Pendidikan di Kecamatan Tomohon Timur</h2>
            <div className="kartu-lembut table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Jenjang</th>
                    <th className="text-end">Negeri</th>
                    <th className="text-end">Swasta</th>
                    <th className="text-end">Jumlah Sekolah</th>
                    <th className="text-end">Guru</th>
                    <th className="text-end">Murid</th>
                  </tr>
                </thead>
                <tbody>
                  {sekolah.map((e) => (
                    <tr key={e.id}>
                      <td className="fw-semibold">{e.level}</td>
                      <td className="text-end">{f(e.public_schools)}</td>
                      <td className="text-end">{f(e.private_schools)}</td>
                      <td className="text-end">{f(e.public_schools + e.private_schools)}</td>
                      <td className="text-end">{f(e.teachers)}</td>
                      <td className="text-end">{f(e.students)}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold">
                    <td>Total</td>
                    <td className="text-end">{f(jml("public_schools"))}</td>
                    <td className="text-end">{f(jml("private_schools"))}</td>
                    <td className="text-end">{f(jml("public_schools") + jml("private_schools"))}</td>
                    <td className="text-end">{f(jml("teachers"))}</td>
                    <td className="text-end">{f(jml("students"))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="small mt-2 mb-0" style={{ color: "var(--teks-redup, #4a6785)" }}>
              Data tingkat kecamatan, tahun ajaran {sekolah[0]?.school_year}. Sumber: BPS Kota Tomohon,
              Kecamatan Tomohon Timur Dalam Angka 2025. BPS tidak merinci jumlah sekolah per kelurahan.
            </p>
          </section>
        )}
      </div>
    </>
  );
}