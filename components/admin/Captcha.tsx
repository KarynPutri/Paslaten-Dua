"use client";

import { useCallback, useEffect, useState } from "react";

type Tantangan = { label: string; cells: string[]; token: string };

export default function Captcha({
  resetKey,
  onChange,
}: {
  resetKey: number;
  onChange: (lulus: boolean) => void;
}) {
  const [t, setT] = useState<Tantangan | null>(null);
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [lulus, setLulus] = useState(false);
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [mengecek, setMengecek] = useState(false);

  const muat = useCallback(
    async (info = "") => {
      setMemuat(true);
      setDipilih([]);
      setLulus(false);
      onChange(false);
      try {
        const r = await fetch("/api/captcha/images", { cache: "no-store" });
        const d = await r.json();
        if (d.setup_needed) {
          setT(null);
          setPesan(d.message);
        } else {
          setT(d);
          setPesan(info);
        }
      } catch {
        setT(null);
        setPesan("Gagal memuat verifikasi gambar.");
      }
      setMemuat(false);
    },
    [onChange]
  );

  useEffect(() => {
    muat();
  }, [muat, resetKey]);

  function pilih(i: number) {
    setDipilih((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  }

  async function periksa() {
    if (!t || dipilih.length === 0) {
      setPesan("Pilih gambar terlebih dahulu.");
      return;
    }
    setMengecek(true);
    const r = await fetch("/api/captcha/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: t.token, selected: dipilih }),
    });
    const d = await r.json();
    setMengecek(false);
    if (d.ok) {
      setLulus(true);
      setPesan("");
      onChange(true);
    } else {
      await muat(d.msg);
    }
  }

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="small fw-semibold">Verifikasi gambar</span>
        <button
          type="button"
          className="btn btn-sm btn-link p-0"
          onClick={() => muat()}
          disabled={memuat || lulus}
        >
          Ganti gambar
        </button>
      </div>

      {memuat && <p className="small mb-0">Memuat...</p>}

      {!memuat && lulus && (
        <div className="alert alert-success py-2 mb-0">Verifikasi berhasil.</div>
      )}

      {!memuat && !lulus && t && (
        <>
          <p className="small mb-2">
            Pilih semua gambar yang berisi <strong>{t.label}</strong>.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {t.cells.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pilih(i)}
                style={{
                  padding: 0,
                  border: dipilih.includes(i)
                    ? "3px solid var(--merah, #5aa0d8)"
                    : "3px solid transparent",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "none",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mt-2 w-100"
            onClick={periksa}
            disabled={mengecek}
          >
            {mengecek ? "Memeriksa..." : "Verifikasi"}
          </button>
        </>
      )}

      {pesan && <div className="small text-danger mt-2">{pesan}</div>}
    </div>
  );
}