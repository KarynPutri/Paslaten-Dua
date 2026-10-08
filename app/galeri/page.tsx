import PageHeader from "../../components/PageHeader";
import GaleriClient from "../../components/GaleriClient";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function Galeri() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Galeri"
        deskripsi="Dokumentasi kegiatan Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error && <p className="text-danger">Gagal memuat data: {error.message}</p>}
        <GaleriClient items={data ?? []} />
      </div>
    </>
  );
}