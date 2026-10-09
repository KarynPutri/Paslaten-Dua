import CrudManager from "../../../components/admin/CrudManager";

export default function StatistikAdmin() {
  return (
    <CrudManager
      table="kelurahan_stats"
      title="Kelola Statistik Kelurahan"
      orderBy="order_number"
      ascending={true}
      defaults={{ order_number: 6, data_year: 2024 }}
      columns={[
        { name: "name", label: "Kelurahan" },
        { name: "male", label: "Laki-laki" },
        { name: "female", label: "Perempuan" },
        { name: "area_km2", label: "Luas (km²)" },
        { name: "lingkungan", label: "Lingkungan" },
      ]}
      fields={[
        { name: "name", label: "Nama kelurahan", required: true, help: "Baris bernama persis \"Paslaten Dua\" dipakai sebagai data utama." },
        { name: "male", label: "Penduduk laki-laki", required: true },
        { name: "female", label: "Penduduk perempuan", required: true },
        { name: "area_km2", label: "Luas wilayah (km²)", help: "Gunakan titik, contoh: 2.83" },
        { name: "lingkungan", label: "Jumlah lingkungan" },
        { name: "civil_servants", label: "Jumlah pegawai kelurahan (PNS)" },
        { name: "distance_district_km", label: "Jarak ke ibukota kecamatan (km)", help: "Gunakan titik, contoh: 1.0" },
        { name: "distance_city_km", label: "Jarak ke ibukota kota (km)", help: "Gunakan titik, contoh: 1.9" },
        { name: "data_year", label: "Tahun data" },
        { name: "order_number", label: "Nomor urut" },
      ]}
    />
  );
}