import CrudManager from "../../../components/admin/CrudManager";

export default function DataSekolahAdmin() {
  return (
    <CrudManager
      table="education_stats"
      title="Kelola Data Sekolah Kecamatan"
      orderBy="order_number"
      ascending={true}
      defaults={{ school_year: "2024/2025", order_number: 5 }}
      columns={[
        { name: "level", label: "Jenjang" },
        { name: "public_schools", label: "Negeri" },
        { name: "private_schools", label: "Swasta" },
        { name: "teachers", label: "Guru" },
        { name: "students", label: "Murid" },
      ]}
      fields={[
        { name: "level", label: "Jenjang", required: true, help: "Contoh: TK, SD, SMP, SMA" },
        { name: "public_schools", label: "Jumlah sekolah negeri" },
        { name: "private_schools", label: "Jumlah sekolah swasta" },
        { name: "teachers", label: "Jumlah guru" },
        { name: "students", label: "Jumlah murid" },
        { name: "school_year", label: "Tahun ajaran" },
        { name: "order_number", label: "Nomor urut" },
      ]}
    />
  );
}