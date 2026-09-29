import CrudManager from "../../../components/admin/CrudManager";

export default function ProfilAdmin() {
  return (
    <CrudManager
      table="profiles"
      title="Kelola Profil & Kontak"
      single
      columns={[]}
      fields={[
        { name: "history", label: "Sejarah", type: "textarea" },
        { name: "vision", label: "Visi", type: "textarea" },
        { name: "mission", label: "Misi", type: "textarea" },
        { name: "geography", label: "Geografis", type: "textarea" },
        { name: "boundaries.utara", label: "Batas Utara" },
        { name: "boundaries.selatan", label: "Batas Selatan" },
        { name: "boundaries.timur", label: "Batas Timur" },
        { name: "boundaries.barat", label: "Batas Barat" },
        {
          name: "potential",
          label: "Potensi wilayah",
          type: "lines",
          help: "Satu potensi per baris.",
        },
        { name: "office_address", label: "Alamat kantor" },
        { name: "phone", label: "Telepon" },
        { name: "whatsapp", label: "WhatsApp" },
        { name: "email", label: "Email" },
        { name: "office_hours", label: "Jam pelayanan" },
      ]}
    />
  );
}