import CrudManager from "../../../components/admin/CrudManager";

export default function UMKMAdmin() {
  return (
    <CrudManager
      table="umkm"
      title="Kelola UMKM"
      folder="umkm"
      columns={[
        { name: "name", label: "Nama UMKM" },
        { name: "owner", label: "Pemilik" },
        { name: "category", label: "Kategori" },
      ]}
      fields={[
        { name: "name", label: "Nama UMKM", required: true },
        { name: "owner", label: "Nama pemilik" },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          options: ["Kuliner", "Perdagangan", "Pertanian", "Kerajinan", "Jasa", "Lainnya"],
        },
        { name: "description", label: "Deskripsi", type: "textarea" },
        { name: "products", label: "Produk" },
        { name: "address", label: "Alamat" },
        {
          name: "maps_url",
          label: "Link Google Maps",
          help: "Buka lokasi di Google Maps, klik Bagikan, lalu Salin link, dan tempel di sini.",
        },
        {
          name: "whatsapp",
          label: "Nomor WhatsApp",
          help: "Format 62, tanpa + dan tanpa 0 di depan. Contoh: 6281234567890",
        },
        { name: "image_url", label: "Foto UMKM", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}