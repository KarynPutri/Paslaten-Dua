"use client";

import { useState } from "react";

export default function SambutanTeks({
  teks,
  batas = 220,
}: {
  teks: string;
  batas?: number;
}) {
  const [terbuka, setTerbuka] = useState(false);
  const panjang = teks.length > batas;

  // Potong di batas kata supaya tidak berhenti di tengah kata
  const potong = teks.slice(0, batas);
  const spasi = potong.lastIndexOf(" ");
  const ringkas = `${(spasi > batas * 0.6 ? potong.slice(0, spasi) : potong).trimEnd()}…`;

  return (
    <>
      <p className="sambutan-ringkas mb-2" style={{ whiteSpace: "pre-line" }}>
        {terbuka || !panjang ? teks : ringkas}
      </p>
      {panjang && (
        <button
          type="button"
          className="tautan-aksi"
          style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
          aria-expanded={terbuka}
          onClick={() => setTerbuka((v) => !v)}
        >
          {terbuka ? "Ringkas" : "Baca sambutan lengkap"}
        </button>
      )}
    </>
  );
}