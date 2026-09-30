import CrudManager from "../../../components/admin/CrudManager";

export default function BeritaAdmin() {
  return (
    <CrudManager
      table="news"
      title="Kelola Berita"
      folder="berita"
      orderBy="published_at"
      defaults={{ published_at: new Date().toISOString().slice(0, 10) }}
      columns={[
        { name: "title", label: "Judul" },
        { name: "category", label: "Kategori" },
        { name: "published_at", label: "Tanggal" },
      ]}
      fields={[
        { name: "title", label: "Judul", required: true },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          options: ["Kegiatan", "Pemerintahan", "Masyarakat", "Pemuda", "PKK", "Sosial", "Keagamaan", "UMKM"],
        },
        { name: "published_at", label: "Tanggal", type: "date", required: true },
        { name: "summary", label: "Ringkasan (tampil di daftar berita)", type: "textarea" },
        { name: "content", label: "Isi berita lengkap", type: "textarea", required: true },
        { name: "image_url", label: "Foto utama", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}