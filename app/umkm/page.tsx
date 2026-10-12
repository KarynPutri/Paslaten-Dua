import PageHeader from "../../components/PageHeader";
import UmkmClient from "../../components/UmkmClient";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Direktori UMKM | Kelurahan Paslaten Dua",
  description: "Daftar usaha mikro, kecil, dan menengah warga Kelurahan Paslaten Dua, Tomohon Timur",
};

export default async function UMKM() {
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="UMKM Paslaten Dua"
        deskripsi="Dukung produk lokal dan usaha warga Kelurahan Paslaten Dua, Tomohon Timur"
      />
      <div className="container py-5">
        {error ? (
          <div className="kartu-lembut p-4 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Data usaha belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        ) : (
          <UmkmClient data={umkm ?? []} />
        )}
      </div>
    </>
  );
}