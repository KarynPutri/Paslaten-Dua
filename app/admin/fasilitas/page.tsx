import CrudManager from "../../../components/admin/CrudManager";

export default function FasilitasAdmin() {
  return (
    <CrudManager
      table="facilities"
      title="Kelola Fasilitas"
      folder="fasilitas"
      columns={[
        { name: "name", label: "Nama fasilitas" },
        { name: "category", label: "Kategori" },
        { name: "address", label: "Alamat" },
      ]}
      fields={[
        { name: "name", label: "Nama fasilitas", required: true },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          required: true,
          options: [
            "Pemerintahan",
            "Pendidikan",
            "Kesehatan",
            "Ibadah",
            "Perdagangan & Perbankan",
            "Akomodasi",
            "Olahraga & Ruang Publik",
            "Lainnya",
          ],
        },
        { name: "description", label: "Deskripsi", type: "textarea" },
        { name: "address", label: "Alamat / lokasi" },
        { name: "maps_url", label: "Link Google Maps", help: "Buka lokasi di Google Maps, klik Bagikan, lalu Salin link." },
        { name: "image_url", label: "Foto", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}