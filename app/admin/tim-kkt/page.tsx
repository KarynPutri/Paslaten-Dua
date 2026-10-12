import CrudManager from "../../../components/admin/CrudManager";

export default function TimKKTAdmin() {
  return (
    <CrudManager
      table="kkt_team"
      title="Kelola Tim KKT"
      folder="kkt"
      orderBy="order_number"
      ascending={true}
      defaults={{ order_number: 1, division: "Inti" }}
      columns={[
        { name: "order_number", label: "Urutan" },
        { name: "name", label: "Nama" },
        { name: "division", label: "Divisi" },
        { name: "role", label: "Peran" },
      ]}
      fields={[
        { name: "name", label: "Nama", required: true },
        {
          name: "division",
          label: "Divisi",
          type: "select",
          required: true,
          options: ["Inti", "Divisi Program", "Divisi PDD", "Divisi Pelaporan", "Divisi Humas"],
        },
        { name: "role", label: "Peran / jabatan", help: "Contoh: Koordinator, Sekretaris, Anggota" },
        { name: "study_program", label: "Program studi" },
        {
          name: "order_number",
          label: "Nomor urut",
          required: true,
          help: "Angka kecil tampil lebih dulu dalam divisinya. Saran: Inti 1–3, Program 4–6, PDD 7–9, Pelaporan 10–12, Humas 13–15.",
        },
        { name: "photo_url", label: "Foto", type: "image", help: "Maksimal 5 MB." },
      ]}
    />
  );
}