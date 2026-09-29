import CrudManager from "../../../components/admin/CrudManager";

export default function AgendaAdmin() {
  return (
    <CrudManager
      table="agendas"
      title="Kelola Agenda"
      orderBy="date"
      columns={[
        { name: "title", label: "Kegiatan" },
        { name: "date", label: "Tanggal" },
        { name: "time", label: "Waktu" },
        { name: "location", label: "Lokasi" },
      ]}
      fields={[
        { name: "title", label: "Nama kegiatan", required: true },
        { name: "date", label: "Tanggal", type: "date", required: true },
        { name: "time", label: "Waktu", help: "Contoh: 08.00 WITA" },
        { name: "location", label: "Lokasi" },
        { name: "description", label: "Deskripsi", type: "textarea" },
      ]}
    />
  );
}