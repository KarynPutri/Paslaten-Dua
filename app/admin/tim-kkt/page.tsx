import CrudManager from "../../../components/admin/CrudManager";

export default function TimKKTAdmin() {
  return (
    <CrudManager
      table="kkt_team"
      title="Kelola Tim KKT"
      folder="kkt"
      orderBy="order_number"
      ascending={true}
      defaults={{ order_number: 1 }}
      columns={[
        { name: "order_number", label: "Urutan" },
        { name: "name", label: "Nama" },
        { name: "role", label: "Peran" },
      ]}
      fields={[
        { name: "name", label: "Nama", required: true },
        { name: "role", label: "Peran", help: "Contoh: Koordinator, Pengembang Website" },
        { name: "study_program", label: "Program studi" },
        { name: "order_number", label: "Nomor urut", required: true, help: "Angka kecil tampil lebih dulu." },
        { name: "photo_url", label: "Foto", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}