import PageHeader from "../../components/PageHeader";
import BeritaClient from "../../components/BeritaClient";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Berita & Kegiatan | Kelurahan Paslaten Dua",
  description: "Kabar, pengumuman kegiatan, dan informasi terbaru seputar Kelurahan Paslaten Dua, Tomohon Timur",
};

export default async function Berita() {
  const { data: berita, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <>
      <PageHeader
        judul="Berita & Kegiatan"
        deskripsi="Kabar dan dokumentasi kegiatan terkini dari Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        {error ? (
          <div className="kartu-lembut p-4 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Berita belum dapat dimuat</p>
            <p className="small text-muted mb-0">Silakan muat ulang halaman.</p>
          </div>
        ) : (
          <BeritaClient listBerita={berita ?? []} />
        )}
      </div>
    </>
  );
}