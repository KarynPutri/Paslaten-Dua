import CrudManager from "../../../components/admin/CrudManager";

export default function ProfilAdmin() {
  return (
    <CrudManager
      table="profiles"
      title="Kelola Profil, Info Wilayah & Kontak"
      folder="profil"
      single
      columns={[]}
      fields={[
        // Sambutan Lurah (Beranda)
        { name: "lurah_name", label: "Sambutan Lurah: nama lurah" },
        { name: "lurah_photo_url", label: "Sambutan Lurah: foto lurah", type: "image", help: "Maksimal 5 MB." },
        { name: "lurah_message", label: "Sambutan Lurah: isi sambutan", type: "textarea" },

        // Info wilayah (Beranda, bagian "Mengenal Paslaten Dua")
        { name: "area", label: "Info wilayah: luas wilayah", help: "Contoh: 1,25 km²" },
        { name: "population", label: "Info wilayah: jumlah penduduk", help: "Contoh: 3.450 jiwa" },
        { name: "households", label: "Info wilayah: jumlah kepala keluarga", help: "Contoh: 980 KK" },
        {
          name: "neighborhoods",
          label: "Info wilayah: daftar lingkungan",
          type: "lines",
          help: "Satu lingkungan per baris. Jumlah lingkungan dihitung otomatis dari daftar ini.",
        },
        { name: "postal_code", label: "Info wilayah: kode pos", help: "Kalau kosong, otomatis memakai 95446." },
        { name: "data_source", label: "Info wilayah: sumber data", help: "Contoh: BPS Kota Tomohon, 2025" },

        // Profil (halaman Profil)
        { name: "history", label: "Sejarah", type: "textarea" },
        { name: "vision", label: "Visi", type: "textarea" },
        { name: "mission", label: "Misi", type: "textarea" },
        {
          name: "geography",
          label: "Geografis",
          type: "textarea",
          help: "Juga tampil sebagai paragraf pengantar di Beranda.",
        },
        { name: "boundaries.utara", label: "Batas Utara" },
        { name: "boundaries.selatan", label: "Batas Selatan" },
        { name: "boundaries.timur", label: "Batas Timur" },
        { name: "boundaries.barat", label: "Batas Barat" },
        { name: "potential", label: "Potensi wilayah", type: "lines", help: "Satu potensi per baris." },

        // Kontak
        { name: "office_address", label: "Alamat kantor" },
        { name: "phone", label: "Telepon" },
        { name: "whatsapp", label: "WhatsApp" },
        { name: "email", label: "Email" },
        { name: "office_hours", label: "Jam pelayanan" },
      ]}
    />
  );
}