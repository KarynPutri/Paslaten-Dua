export type Para = string | { catatan: string; label?: string };

export type Butir = { judul: string; isi: Para[] };

export type Bagian = {
  kunci: string;
  label: string;
  judul: string;
  pengantar?: Para[];
  kutipan?: { teks: string; ket: string };
  isi?: Para[];
  butir?: Butir[];
};

export const pengantar: string[] = [
  "Paslaten Dua terletak di Kecamatan Tomohon Timur, Kota Tomohon, Provinsi Sulawesi Utara. Wilayah ini merupakan bagian dari kawasan bersejarah Tomohon yang memiliki keterkaitan erat dengan kehidupan masyarakat Minahasa, khususnya sub-etnis Tombulu. Sejarah Paslaten Dua tidak dapat dipisahkan dari perkembangan permukiman tua Paslaten dan pertumbuhan Tomohon sebagai pusat kehidupan sosial, pemerintahan, serta perdagangan di wilayah sekitarnya.",
  "Pada masa lampau, Paslaten masih dikenal sebagai satu kesatuan permukiman. Dalam perkembangan sejarah lokal, kawasan ini memiliki hubungan dengan permukiman tua lainnya di Tomohon, seperti Matani, Walian, Kolongan, Talete, dan Kamasi. Seiring berjalannya waktu, pertumbuhan masyarakat dan perubahan tata pemerintahan membawa perkembangan baru bagi wilayah Paslaten hingga akhirnya dikenal sebagai dua kelurahan, yaitu Paslaten Satu dan Paslaten Dua.",
];

export const sekilas = [
  { angka: "1852", teks: "Pasar pertama Tomohon dibangun di kawasan yang kini termasuk Paslaten Dua (catatan sejarah lokal)" },
  { angka: "Malangen & Kalimpesan", teks: "Mata air yang dikenal dalam sejarah lokal kawasan Paslaten" },
  { angka: "2003", teks: "Kota Tomohon dibentuk melalui UU Nomor 10 Tahun 2003 dan diresmikan pada 4 Agustus 2003" },
  { angka: "Tomohon Timur", teks: "Kecamatan tempat Paslaten Dua berada, di Kota Tomohon, Sulawesi Utara" },
];

export const lini: { waktu: string; teks: string; belum?: boolean }[] = [
  {
    waktu: "Masa leluhur",
    teks: "Para leluhur memilih lokasi permukiman Paslaten karena tersedia lahan pertanian dan sumber air, termasuk Malangen, Mangangaya, dan Kalimpesan.",
  },
  {
    waktu: "Sebelum 1852",
    teks: "Kawasan ini sudah memiliki gudang kopi dan rumah kepala gudang kopi untuk membeli dan mengumpulkan hasil kopi dari berbagai wilayah Tomohon.",
  },
  {
    waktu: "1852",
    teks: "Pasar pertama Tomohon dibangun di kawasan yang kini termasuk wilayah Paslaten Dua (menurut catatan sejarah lokal).",
  },
  {
    waktu: "27 Januari 2003",
    teks: "Pembentukan Kota Tomohon ditetapkan melalui Undang-Undang Nomor 10 Tahun 2003.",
  },
  { waktu: "4 Agustus 2003", teks: "Kota Tomohon diresmikan." },
  {
    waktu: "Kini",
    teks: "Paslaten Dua menjadi bagian dari Kecamatan Tomohon Timur, Kota Tomohon, Provinsi Sulawesi Utara.",
  },
];

export const bagian: Bagian[] = [
  {
    kunci: "asal-usul",
    label: "Asal-usul",
    judul: "Dari Mata Air Menuju Permukiman",
    pengantar: [
      "Kisah awal Paslaten berkaitan dengan perjalanan para leluhur dalam mencari tempat tinggal yang sesuai untuk membangun permukiman. Ketersediaan air, kondisi tanah, dan kemungkinan untuk bercocok tanam menjadi bagian penting dalam pemilihan lokasi tempat tinggal masyarakat pada masa itu.",
    ],
    butir: [
      {
        judul: "Mata Air Malangen",
        isi: [
          "Malangen merupakan salah satu mata air yang disebut dalam catatan sejarah lokal mengenai asal-usul Paslaten. Keberadaan sumber air menjadi unsur penting bagi kehidupan masyarakat, baik untuk memenuhi kebutuhan sehari-hari maupun mendukung kegiatan pertanian.",
          "Mata air Malangen hingga kini dikenal dalam cerita sejarah kawasan Paslaten Dua dan menjadi bagian dari ingatan masyarakat mengenai lingkungan tempat para leluhur membangun kehidupan.",
        ],
      },
      {
        judul: "Mata Air Kalimpesan",
        isi: [
          "Selain Malangen, Kalimpesan juga disebut sebagai salah satu sumber air yang berkaitan dengan kawasan Paslaten Dua. Keberadaan beberapa sumber air di wilayah ini menunjukkan pentingnya kondisi alam dalam perkembangan permukiman lama Tomohon.",
          "Malangen dan Kalimpesan menjadi bagian penting dalam kisah mengenai hubungan masyarakat Paslaten dengan lingkungan alam di sekitarnya.",
        ],
      },
      {
        judul: "Kehidupan Para Leluhur",
        isi: [
          "Dalam tuturan sejarah lokal, pemilihan tempat tinggal oleh para leluhur berkaitan dengan pencarian lokasi yang mendukung kehidupan masyarakat. Tanah yang dapat dimanfaatkan untuk pertanian dan ketersediaan sumber air menjadi pertimbangan penting dalam perkembangan permukiman.",
          "Cerita mengenai asal-usul Paslaten diwariskan melalui tuturan masyarakat dan menjadi bagian dari identitas sejarah wilayah ini.",
        ],
      },
      {
        judul: "Berkembang Menjadi Kampung",
        isi: [
          "Seiring bertambahnya penduduk dan berkembangnya kehidupan sosial, permukiman Paslaten tumbuh menjadi salah satu kampung penting dalam kawasan Tomohon lama. Perkembangan tersebut berlangsung bersama perubahan kehidupan masyarakat dan tata pemerintahan dari masa ke masa.",
        ],
      },
    ],
  },
  {
    kunci: "asal-nama",
    label: "Asal nama",
    judul: "Paslaten dan Letaknya di Antara Matani dan Talete",
    pengantar: [
      "Dalam salah satu catatan sejarah lokal, nama Paslaten dikaitkan dengan ungkapan berikut, yang menggambarkan lokasi permukiman di antara Matani dan Talete.",
    ],
    kutipan: {
      teks: "witi ni Pinaselat ne Matani wo ne Talete",
      ket: "Ungkapan dalam catatan sejarah lokal mengenai asal nama Paslaten",
    },
    isi: [
      "Kisah tersebut menyebutkan bahwa para tetua masyarakat bermusyawarah untuk menentukan lokasi permukiman setelah terjadinya gempa. Melalui tradisi yang dikenal sebagai Sumoring, mereka mencari petunjuk untuk menentukan tempat yang sesuai bagi kehidupan masyarakat.",
      "Moningka Tuneng Kaparang disebut dalam cerita tersebut sebagai tokoh yang memimpin proses itu. Bastiaan Kaunang kemudian ditugaskan sebagai *Tumuturu*, yaitu orang yang bertugas menunjukkan lokasi. Tempat yang dipilih dinilai sesuai karena memiliki lahan yang dapat dimanfaatkan untuk pertanian serta sumber air, termasuk Malangen, Mangangaya, dan Kalimpesan.",
      {
        label: "Catatan sumber",
        catatan:
          "Cerita ini merupakan bagian dari sejarah lokal yang dituturkan dalam catatan sejarah Tomohon. Rincian mengenai asal nama dan tokoh-tokoh yang terlibat masih perlu dibandingkan dengan sumber sejarah lain serta keterangan para tetua masyarakat Paslaten.",
      },
    ],
  },
  {
    kunci: "peran-perdagangan",
    label: "Peran Paslaten dalam sejarah Tomohon",
    judul: "Kawasan Perdagangan pada Abad ke-19",
    pengantar: [
      "Paslaten memiliki peran penting dalam perkembangan awal Tomohon, khususnya dalam kegiatan perdagangan dan pemerintahan.",
    ],
    butir: [
      {
        judul: "Pasar Pertama Tomohon",
        isi: [
          "Menurut catatan sejarah lokal mengenai Tomohon, pasar pertama Tomohon dibangun pada tahun 1852 di kawasan yang sekarang termasuk wilayah Paslaten Dua. Keberadaan pasar ini menjadi salah satu penanda penting perkembangan kegiatan ekonomi masyarakat pada abad ke-19.",
          "Pasar menjadi tempat berlangsungnya pertukaran hasil bumi dan berbagai kebutuhan masyarakat. Keberadaannya juga memperkuat hubungan perdagangan antara Tomohon dan wilayah-wilayah lain di Minahasa.",
        ],
      },
      {
        judul: "Gudang Kopi",
        isi: [
          "Sebelum pasar tersebut dibangun, kawasan ini telah memiliki gudang kopi dan rumah kepala gudang kopi. Tempat tersebut digunakan untuk membeli serta mengumpulkan hasil kopi dari berbagai wilayah Tomohon.",
          "Kegiatan pengumpulan kopi menunjukkan bahwa kawasan Paslaten telah berperan dalam jaringan perdagangan hasil bumi. Dengan demikian, sejarah Paslaten Dua tidak hanya berkaitan dengan perkembangan permukiman, tetapi juga dengan pertumbuhan ekonomi Tomohon.",
        ],
      },
      {
        judul: "Pusat Aktivitas Pemerintahan",
        isi: [
          "Catatan sejarah lokal juga menyebutkan bahwa Paslaten pernah menjadi lokasi tempat tinggal kepala distrik ketika pusat pemerintahan Tomohon berpindah. Hal ini memperlihatkan bahwa kawasan Paslaten memiliki peran dalam perkembangan pemerintahan dan kehidupan masyarakat pada masa lampau.",
          "Peran perdagangan dan pemerintahan tersebut menjadikan Paslaten sebagai salah satu kawasan penting dalam sejarah Tomohon.",
        ],
      },
    ],
  },
  {
    kunci: "perkembangan-wilayah",
    label: "Perkembangan wilayah",
    judul: "Dari Satu Paslaten Menjadi Dua Kelurahan",
    pengantar: [
      "Pada masa awal, Paslaten dikenal sebagai satu kesatuan wilayah. Dalam perkembangannya, perubahan jumlah penduduk, kebutuhan pelayanan, dan penataan pemerintahan mendorong pembagian wilayah administratif.",
    ],
    butir: [
      {
        judul: "Paslaten sebagai Satu Kesatuan",
        isi: [
          "Sebelum dikenal sebagai Paslaten Satu dan Paslaten Dua, wilayah ini disebut sebagai Paslaten. Sejarah kedua kelurahan tersebut karena itu memiliki akar sejarah yang sama, terutama dalam hal asal-usul permukiman dan perkembangan masyarakatnya.",
        ],
      },
      {
        judul: "Pembagian Wilayah",
        isi: [
          "Paslaten kemudian berkembang menjadi dua wilayah administratif, yaitu Paslaten Satu dan Paslaten Dua. Pembagian tersebut menandai perkembangan penataan pemerintahan setempat.",   
        ],
      },
      {
        judul: "Menjadi Bagian dari Kota Tomohon",
        isi: [
          "Pada 27 Januari 2003, pembentukan Kota Tomohon ditetapkan melalui Undang-Undang Nomor 10 Tahun 2003. Kota Tomohon kemudian diresmikan pada 4 Agustus 2003.",
          "Dalam perkembangan administrasi selanjutnya, Paslaten Dua menjadi bagian dari Kecamatan Tomohon Timur, Kota Tomohon, Provinsi Sulawesi Utara. Status tersebut menempatkan Paslaten Dua dalam struktur pemerintahan kota yang berjalan hingga sekarang.",
        ],
      },
    ],
  },
  {
    kunci: "catatan-sejarah",
    label: "Catatan sejarah",
    judul: "Tuturan Masyarakat dan Sumber Tertulis",
    pengantar: [
      "Sejarah Paslaten Dua tersusun dari cerita yang diwariskan masyarakat serta catatan mengenai perkembangan Tomohon. Kedua jenis sumber ini membantu menjelaskan hubungan antara lingkungan alam, kehidupan leluhur, dan perkembangan wilayah.",
    ],
    butir: [
      {
        judul: "Tuturan Masyarakat",
        isi: [
          "Cerita mengenai asal-usul permukiman, mata air Malangen dan Kalimpesan, serta tokoh-tokoh leluhur menjadi bagian dari sejarah lokal Paslaten. Informasi tersebut perlu terus dihimpun melalui wawancara dengan para tetua dan tokoh masyarakat agar kisah yang diwariskan dapat didokumentasikan dengan baik.",
        ],
      },
      {
        judul: "Catatan Sejarah Lokal",
        isi: [
          "Catatan mengenai pembangunan pasar pertama Tomohon pada 1852, keberadaan gudang kopi, dan perkembangan pusat pemerintahan memberikan gambaran tentang peran kawasan Paslaten pada abad ke-19.",
        ],
      },
      {
        judul: "Catatan Administratif",
        isi: [
          "Riwayat pembentukan Paslaten Dua sebagai kelurahan tersendiri memerlukan dukungan dokumen administratif, seperti keputusan pemekaran, peraturan pemerintah daerah, atau arsip pemerintahan setempat. Dokumen tersebut penting untuk memastikan tahun pembentukan dan perubahan batas wilayah secara akurat.",
        ],
      },
    ],
  },
  {
    kunci: "warisan",
    label: "Warisan sejarah",
    judul: "Alam, Perdagangan, dan Kehidupan Masyarakat",
    butir: [
      {
        judul: "Mata Air",
        isi: [
          "Malangen dan Kalimpesan merupakan sumber air yang dikenal dalam sejarah lokal Paslaten. Keduanya menjadi bagian dari cerita tentang hubungan masyarakat dengan lingkungan alam.",
        ],
      },
      {
        judul: "Pertanian dan Hasil Bumi",
        isi: [
          "Ketersediaan lahan pertanian dan kegiatan pengumpulan kopi memperlihatkan hubungan antara kondisi alam Paslaten dengan mata pencaharian masyarakat pada masa lampau.",
        ],
      },
      {
        judul: "Perdagangan",
        isi: [
          "Keberadaan pasar pertama Tomohon dan gudang kopi di kawasan yang kini termasuk Paslaten Dua menunjukkan peran wilayah ini dalam perkembangan perdagangan dan perekonomian Tomohon.",
        ],
      },
      {
        judul: "Kebersamaan Masyarakat",
        isi: [
          "Sejarah permukiman Paslaten juga menggambarkan pentingnya musyawarah dan kerja sama masyarakat dalam menentukan tempat tinggal serta membangun kehidupan bersama. Nilai-nilai tersebut menjadi bagian dari warisan sosial yang patut dijaga oleh generasi berikutnya.",
        ],
      },
    ],
  },
];

export const penutup =
  "**Paslaten Dua merupakan bagian dari sejarah panjang Tomohon.** Dari kawasan yang dikenal melalui sumber air dan kehidupan para leluhur hingga menjadi bagian dari pusat perdagangan pada abad ke-19, wilayah ini menyimpan jejak perkembangan alam, masyarakat, dan pemerintahan yang membentuk identitasnya hingga sekarang.";

export const rujukan = [
  {
    judul: "Tomohon Tahun 1821 — Jelajah Sejarah Tomohon",
    ket: "Membahas kawasan Paslaten, gudang kopi, pasar pertama Tomohon, serta perkembangan pusat pemerintahan.",
    jenis: "Sumber sejarah lokal",
    catatan: "Bukan dokumen resmi pemerintah.",
    resmi: false,
    url: "https://jelajahsejarahtomohon.blogspot.com/2019/09/tomohon-tahun-1821.html",
  },
  {
    judul: "Sejarah Kota Tomohon — Pemerintah Kota Tomohon",
    ket: "Rujukan resmi untuk konteks perkembangan Tomohon dan pembentukan kota pada 2003.",
    jenis: "Resmi · Pemerintah Kota Tomohon",
    catatan: "",
    resmi: true,
    url: "https://tomohon.go.id/sejarah-kota-tomohon/",
  },
  {
    judul: "Kecamatan Tomohon Timur — Pemerintah Kota Tomohon",
    ket: "Mengonfirmasi bahwa Paslaten Dua merupakan salah satu kelurahan di Kecamatan Tomohon Timur.",
    jenis: "Resmi · Pemerintah Kota Tomohon",
    catatan: "",
    resmi: true,
    url: "https://tomohon.go.id/kecamatan-tomohon-timur/",
  },
  {
    judul: "Asal Usul Nama Kota Tomohon — catatan sejarah lokal",
    ket: "Memuat keterangan mengenai mata air Malangen dan Kalimpesan yang dikaitkan dengan kawasan Paslaten Dua.",
    jenis: "Catatan sejarah lokal · Kuwaluhan.com",
    catatan: "",
    resmi: false,
    url: "https://www.kuwaluhan.com/2019/01/sejarah-awal-mula-terbentuknya-kota.html",
  },
];

export const mataAir = [
  { nama: "Malangen", ket: "Disebut dalam catatan sejarah lokal mengenai asal-usul Paslaten" },
  { nama: "Mangangaya", ket: "Disebut sebagai salah satu sumber air di lokasi yang dipilih" },
  { nama: "Kalimpesan", ket: "Sumber air yang berkaitan dengan kawasan Paslaten Dua" },
];

export const langkahSumoring = [
  { judul: "Setelah gempa", teks: "Menurut kisah, penentuan lokasi dilakukan setelah terjadinya gempa." },
  { judul: "Musyawarah tetua", teks: "Para tetua masyarakat bermusyawarah menentukan lokasi permukiman." },
  { judul: "Tradisi Sumoring", teks: "Dicari petunjuk tempat yang sesuai bagi kehidupan masyarakat." },
  { judul: "Moningka Tuneng Kaparang", teks: "Disebut sebagai tokoh yang memimpin proses." },
  { judul: "Bastiaan Kaunang", teks: "Ditugaskan sebagai Tumuturu, penunjuk lokasi." },
  { judul: "Lokasi dipilih", teks: "Memiliki lahan pertanian dan sumber air: Malangen, Mangangaya, Kalimpesan." },
];