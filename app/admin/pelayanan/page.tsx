import CrudManager from "../../../components/admin/CrudManager";

export default function PelayananAdmin() {
  return (
    <CrudManager
      table="services"
      title="Kelola Pelayanan"
      orderBy="id"
      ascending={true}
      columns={[
        { name: "name", label: "Layanan" },
        { name: "service_hours", label: "Jam pelayanan" },
      ]}
      fields={[
        { name: "name", label: "Nama layanan", required: true },
        {
          name: "requirements",
          label: "Persyaratan",
          type: "lines",
          help: "Satu persyaratan per baris.",
        },
        {
          name: "procedure",
          label: "Prosedur",
          type: "lines",
          help: "Satu langkah per baris, tanpa nomor.",
        },
        { name: "service_hours", label: "Jam pelayanan" },
      ]}
    />
  );
}