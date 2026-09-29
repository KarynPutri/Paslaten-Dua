import CrudManager from "../../../components/admin/CrudManager";

export default function PemerintahanAdmin() {
  return (
    <CrudManager
      table="government"
      title="Kelola Pemerintahan"
      folder="pemerintahan"
      orderBy="order_number"
      ascending={true}
      defaults={{ order_number: 3 }}
      columns={[
        { name: "order_number", label: "Urutan" },
        { name: "name", label: "Nama" },
        { name: "position", label: "Jabatan" },
      ]}
      fields={[
        { name: "name", label: "Nama", required: true },
        { name: "position", label: "Jabatan", required: true },
        {
          name: "order_number",
          label: "Nomor urut",
          required: true,
          help: "1 = Lurah, 2 = Sekretaris (tampil di bagian Pimpinan). 3 ke atas = Staff.",
        },
        { name: "photo_url", label: "Foto", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}