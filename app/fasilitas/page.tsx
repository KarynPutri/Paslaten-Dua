import PageHeader from "../../components/PageHeader";
import FasilitasClient from "../../components/FasilitasClient";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Fasilitas & Sarana | Kelurahan Paslaten Dua",
  description: "Daftar sarana ibadah, kesehatan, pendidikan, dan fasilitas umum di Kelurahan Paslaten Dua",
};

export default async function Fasilitas() {
  const [{ data: fas, error }, { data: edu }] = await Promise.all([
    supabase.from("facilities").select("*").order("name"),
    supabase.from("education_stats").select("*").order("order_number"),
  ]);

  return (
    <>
      <PageHeader
        judul="Fasilitas & Sarana"
        deskripsi="Sarana umum, kesehatan, pendidikan, dan ibadah di Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error ? (
          <div className="kartu-lembut p-4 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Data fasilitas belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        ) : (
          <FasilitasClient
            facilities={fas ?? []}
            educationStats={edu ?? []}
          />
        )}
      </div>
    </>
  );
}