import PageHeader from "../../components/PageHeader";
import GaleriClient from "../../components/GaleriClient";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Galeri Foto | Kelurahan Paslaten Dua",
  description: "Dokumentasi visual kegiatan kemasyarakatan, pemerintahan, dan lingkungan Kelurahan Paslaten Dua",
};

export default async function Galeri() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Galeri Foto"
        deskripsi="Dokumentasi kegiatan dan peristiwa di Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error ? (
          <div className="kartu-lembut p-4 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Galeri foto belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        ) : (
          <GaleriClient items={data ?? []} />
        )}
      </div>
    </>
  );
}