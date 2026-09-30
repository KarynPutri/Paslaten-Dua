// Titik lokasi Kelurahan Paslaten Dua, Kecamatan Tomohon Timur, Kota Tomohon.
// Sumber: OpenStreetMap (node 1308637239). Ubah nilai di sini bila ingin
// menunjuk titik lain, misalnya tepat di Kantor Kelurahan.
export const LOKASI_PASLATEN_DUA = {
  nama: "Kelurahan Paslaten Dua",
  wilayah: "Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara",
  kodePos: "95446",
  lat: 1.3229105,
  lng: 124.8407606,
  zoom: 15,
};

export const linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${LOKASI_PASLATEN_DUA.lat},${LOKASI_PASLATEN_DUA.lng}`;

export const linkPetunjukArah = `https://www.google.com/maps/dir/?api=1&destination=${LOKASI_PASLATEN_DUA.lat},${LOKASI_PASLATEN_DUA.lng}`;
