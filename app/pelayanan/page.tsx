import PageHeader from "../../components/PageHeader";
import PelayananClient from "../../components/PelayananClient";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Pelayanan Warga | Kelurahan Paslaten Dua",
  description: "Informasi persyaratan dan prosedur layanan administrasi di Kantor Kelurahan Paslaten Dua",
};

export default async function Pelayanan() {
  const { data: layanan, error } = await supabase
    .from("services")
    .select("*")
    .order("id");

  return (
    <>
      <PageHeader
        judul="Pelayanan Warga"
        deskripsi="Informasi persyaratan, alur, dan prosedur layanan administrasi kelurahan"
      />
      <div className="container py-5">
        {error ? (
          <div className="kartu-lembut p-4 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <p className="fw-semibold mb-1">Informasi layanan belum dapat dimuat</p>
            <p className="small text-muted mb-3">Silakan muat ulang halaman atau hubungi kantor kelurahan.</p>
          </div>
        ) : (
          <PelayananClient layanan={layanan ?? []} />
        )}
      </div>
    </>
  );
}