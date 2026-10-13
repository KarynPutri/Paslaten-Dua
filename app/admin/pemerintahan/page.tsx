import CrudManager from "../../../components/admin/CrudManager";

export default function PemerintahanAdmin() {
  return (
    <CrudManager
      table="government"
      title="Kelola Pemerintahan"
      folder="pemerintahan"
      orderBy="order_number"
      ascending={true}
      defaults={{ section: "Pimpinan", order_number: 1 }}
      columns={[
        { name: "order_number", label: "Urutan" },
        { name: "name", label: "Nama" },
        { name: "position", label: "Jabatan" },
        { name: "section", label: "Kelompok" },
      ]}
      fields={[
        { name: "name", label: "Nama", required: true },
        {
          name: "section",
          label: "Kelompok",
          type: "select",
          required: true,
          options: ["Pimpinan", "Kepala Seksi", "Lingkungan"],
        },
        {
          name: "position",
          label: "Jabatan",
          required: true,
          help: "Contoh: Lurah, Sekretaris, Wakil Sekretaris, Kepala Seksi Pemerintahan, Kepala Lingkungan I, Wakil Kepala Lingkungan I",
        },
        {
          name: "order_number",
          label: "Nomor urut",
          required: true,
          help: "Angka kecil tampil lebih dulu dalam kelompoknya. Saran: Pimpinan 1–9, Kepala Seksi 10–19, Lingkungan 20 ke atas.",
        },
        { name: "photo_url", label: "Foto", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}