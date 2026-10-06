import CrudManager from "../../../components/admin/CrudManager";

export default function PengumumanAdmin() {
  return (
    <CrudManager
      table="announcements"
      title="Kelola Pengumuman"
      orderBy="published_at"
      defaults={{ published_at: new Date().toISOString().slice(0, 10) }}
      columns={[
        { name: "title", label: "Judul" },
        { name: "published_at", label: "Tanggal" },
      ]}
      fields={[
        { name: "title", label: "Judul", required: true },
        { name: "published_at", label: "Tanggal", type: "date", required: true },
        { name: "content", label: "Isi pengumuman", type: "textarea", required: true },
      ]}
    />
  );
}