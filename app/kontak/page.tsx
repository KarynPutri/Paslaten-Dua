import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import PetaLokasi from "../../components/PetaLokasi";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function Kontak() {
  const { data: p } = await supabase.from("profiles").select("*").eq("id", 1).maybeSingle();

  const kontak = [
    { label: "Alamat", isi: p?.office_address },
    { label: "Telepon", isi: p?.phone },
    { label: "WhatsApp", isi: p?.whatsapp },
    { label: "Email", isi: p?.email },
    { label: "Jam Pelayanan", isi: p?.office_hours },
  ];

  return (
    <>
      <PageHeader
        judul="Kontak"
        deskripsi="Hubungi Kantor Kelurahan Paslaten Dua"
      />
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="kartu-lembut p-4 h-100">
              {kontak.map((k) => (
                <div className="mb-3" key={k.label}>
                  <div className="small fw-semibold" style={{ color: "#5aa0d8" }}>{k.label}</div>
                  <div>{k.isi || "-"}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-7">
            <div className="bg-white p-2 border h-100" style={{ borderRadius: 18, borderColor: "#d6e9f8" }}>
              <PetaLokasi tinggi={360} alamat={p?.office_address} />
            </div>
            <div className="text-end mt-2">
              <Link href="/peta" className="small fw-semibold" style={{ color: "#5aa0d8" }}>
                Lihat peta lengkap →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}