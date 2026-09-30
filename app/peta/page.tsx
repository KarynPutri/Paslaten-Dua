import PageHeader from "../../components/PageHeader";
import PetaLokasi from "../../components/PetaLokasi";
import { supabase } from "../../lib/supabase";
import { LOKASI_PASLATEN_DUA as L, linkGoogleMaps, linkPetunjukArah } from "../../lib/lokasi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Peta Lokasi | Kelurahan Paslaten Dua",
  description: "Peta lokasi Kelurahan Paslaten Dua, Kecamatan Tomohon Timur, Kota Tomohon",
};

export default async function Peta() {
  const { data: p } = await supabase
    .from("profiles")
    .select("office_address, office_hours")
    .eq("id", 1)
    .maybeSingle();

  const info = [
    { label: "Wilayah", isi: L.wilayah },
    { label: "Alamat Kantor", isi: p?.office_address },
    { label: "Kode Pos", isi: L.kodePos },
    { label: "Koordinat", isi: `${L.lat.toFixed(5)}, ${L.lng.toFixed(5)}` },
    { label: "Jam Pelayanan", isi: p?.office_hours },
  ];

  return (
    <>
      <PageHeader
        judul="Peta Lokasi"
        deskripsi="Letak Kelurahan Paslaten Dua di Kecamatan Tomohon Timur, Kota Tomohon"
      />
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white p-2 border" style={{ borderRadius: 18, borderColor: "#d6e9f8" }}>
              <PetaLokasi tinggi={520} alamat={p?.office_address} />
            </div>
            <p className="small mt-2 mb-0" style={{ color: "#4a6785" }}>
              Gunakan tombol di pojok kanan atas peta untuk beralih ke tampilan satelit.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="kartu-lembut p-4 h-100">
              <h5 className="fw-bold mb-3">{L.nama}</h5>
              {info.map((k) => (
                <div className="mb-3" key={k.label}>
                  <div className="small fw-semibold" style={{ color: "#5aa0d8" }}>{k.label}</div>
                  <div>{k.isi || "-"}</div>
                </div>
              ))}
              <div className="d-grid gap-2 mt-4">
                <a href={linkPetunjukArah} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Petunjuk Arah
                </a>
                <a
                  href={linkGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ backgroundColor: "#dcedfb", color: "#1e3a5f" }}
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
