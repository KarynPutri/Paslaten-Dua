import CrudManager from "../../../components/admin/CrudManager";

export default function GaleriAdmin() {
  return (
    <CrudManager
      table="gallery"
      title="Kelola Galeri"
      folder="galeri"
      columns={[
        { name: "title", label: "Judul" },
        { name: "category", label: "Kategori" },
        { name: "event_date", label: "Tanggal" },
      ]}
      fields={[
        { name: "title", label: "Judul foto", required: true },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          options: ["Pemerintahan", "Kegiatan", "Masyarakat", "UMKM"],
        },
        { name: "event_date", label: "Tanggal kegiatan", type: "date" },
        { name: "image_url", label: "Foto (wajib)", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}