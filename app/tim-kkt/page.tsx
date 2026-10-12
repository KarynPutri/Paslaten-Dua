import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Tim KKT UNSRAT 149 | Kelurahan Paslaten Dua",
  description: "Mahasiswa Kuliah Kerja Terpadu (KKT) UNSRAT Angkatan 149 di Kelurahan Paslaten Dua",
};

export default async function TimKKT() {
  const { data, error } = await supabase
    .from("kkt_team")
    .select("*")
    .order("order_number");

  return (
    <>
      <PageHeader
        judul="Tim KKT UNSRAT 149"
        deskripsi="Mahasiswa Kuliah Kerja Terpadu Universitas Sam Ratulangi di Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        <div className="kartu-lembut p-4 p-md-5 mb-5 mx-auto text-center" style={{ maxWidth: "820px" }}>
          <div className="label-kecil mb-2">Pengabdian & Kerja Sama</div>
          <h2 className="h4 fw-bold mb-3">Kolaborasi Mahasiswa & Warga Kelurahan</h2>
          <p className="mb-0 text-muted" style={{ lineHeight: 1.75 }}>
            Website informasi resmi Kelurahan Paslaten Dua ini dikembangkan bersama oleh Tim Kuliah Kerja Terpadu (KKT)
            Universitas Sam Ratulangi (UNSRAT) Angkatan 149 sebagai wujud nyata Tri Dharma Perguruan Tinggi dalam
            mendukung digitalisasi informasi publik dan kemajuan masyarakat di Kecamatan Tomohon Timur.
          </p>
        </div>

        {error && (
          <div className="kartu-lembut p-4 text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Data tim belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        )}

        {!error && (!data || data.length === 0) && (
          <p className="text-center text-muted">Data anggota tim sedang dalam pembaruan.</p>
        )}

        <div className="row g-3 justify-content-center">
          {data?.map((m) => (
            <div className="col-6 col-md-4 col-lg-3" key={m.id}>
              <div className="kartu-lembut p-4 text-center h-100 d-flex flex-column align-items-center">
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    className="rounded-circle mb-3 shadow-sm"
                    style={{ width: 96, height: 96, objectFit: "cover" }}
                  />
                ) : (
                  <div className="avatar-kosong shadow-sm">{m.name.charAt(0)}</div>
                )}
                <h3 className="h6 fw-bold mb-1 mt-auto">{m.name}</h3>
                {m.role && (
                  <p className="small mb-1 fw-semibold" style={{ color: "var(--merah)" }}>
                    {m.role}
                  </p>
                )}
                {m.study_program && (
                  <p className="small mb-0 text-muted">{m.study_program}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}