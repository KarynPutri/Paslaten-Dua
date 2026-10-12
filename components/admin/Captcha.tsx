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
  const [terbuka, setTerbuka] = useState(false);
  const [t, setT] = useState<Tantangan | null>(null);
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [lulus, setLulus] = useState(false);
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);
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

  // Kembali ke kondisi awal (belum dicentang) saat login gagal
  useEffect(() => {
    setTerbuka(false);
    setLulus(false);
    setT(null);
    setDipilih([]);
    setPesan("");
    onChange(false);
  }, [resetKey, onChange]);

  // Tombol Esc menutup jendela
  useEffect(() => {
    if (!terbuka) return;
    const tombol = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerbuka(false);
    };
    window.addEventListener("keydown", tombol);
    return () => window.removeEventListener("keydown", tombol);
  }, [terbuka]);

  function buka() {
    if (lulus) return;
    setTerbuka(true);
    muat();
  }

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
      setTerbuka(false);
      setPesan("");
      onChange(true);
    } else {
      await muat(d.msg);
    }
  }

  return (
    <>
      {/* Kotak "Saya bukan robot" */}
      <button
        type="button"
        onClick={buka}
        disabled={lulus}
        className="w-100 d-flex align-items-center justify-content-between text-start"
        style={{
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 12,
          background: "#ffffff",
          padding: "14px 16px",
          color: "var(--teks, #1f1512)",
        }}
      >
        <span className="d-flex align-items-center gap-3">
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              border: lulus ? "2px solid #2e7d32" : "2px solid rgba(0,0,0,0.35)",
              background: lulus ? "#2e7d32" : "#ffffff",
              color: "#ffffff",
            }}
          >
            {lulus && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            )}
          </span>
          <span className="fw-semibold">Saya bukan robot</span>
        </span>
        <span className="small text-end" style={{ color: "var(--teks-redup, #6b5a52)", lineHeight: 1.2 }}>
          Verifikasi
          <br />
          gambar
        </span>
      </button>

      {/* Jendela tantangan gambar */}
      {terbuka && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setTerbuka(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3000,
            backgroundColor: "rgba(31, 21, 18, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 380,
              background: "#ffffff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="p-3 text-white"
              style={{ background: "var(--merah-tua, #5a1a14)" }}
            >
              <div className="small" style={{ opacity: 0.85 }}>Pilih semua gambar yang berisi</div>
              <div className="fs-4 fw-bold text-uppercase">{t ? t.label : "..."}</div>
            </div>

            <div className="p-3">
              {memuat && <p className="small mb-0 py-4 text-center">Memuat gambar...</p>}

              {!memuat && t && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {t.cells.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pilih(i)}
                      style={{
                        padding: 0,
                        border: dipilih.includes(i)
                          ? "3px solid var(--merah, #9b2c22)"
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
              )}

              {pesan && <div className="small text-danger mt-2">{pesan}</div>}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-link p-0"
                  onClick={() => muat()}
                  disabled={memuat || mengecek}
                >
                  Ganti gambar
                </button>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setTerbuka(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary px-3"
                    onClick={periksa}
                    disabled={memuat || mengecek || !t}
                  >
                    {mengecek ? "Memeriksa..." : "Verifikasi"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}