export function tanggalIndo(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });
}

export function pecahTanggal(iso: string) {
  const d = new Date(iso);
  const opsi = { timeZone: "Asia/Makassar" } as const;
  return {
    hari: d.toLocaleDateString("id-ID", { day: "numeric", ...opsi }),
    bulan: d.toLocaleDateString("id-ID", { month: "short", ...opsi }).toUpperCase(),
    tahun: d.toLocaleDateString("id-ID", { year: "numeric", ...opsi }),
  };
}

export function formatAngka(n: number | null | undefined, desimal = 0): string {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "-";
  return Number(n).toLocaleString("id-ID", {
    minimumFractionDigits: desimal,
    maximumFractionDigits: desimal,
  });
}