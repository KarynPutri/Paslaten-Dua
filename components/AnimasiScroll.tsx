"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Elemen yang diberi animasi saat discroll. Tambahkan nama kelas lain di sini bila perlu.
const SELECTOR = [
  ".kartu-lembut",
  ".kartu-budaya",
  ".kartu-fasilitas-unggulan",
  ".kartu-metrik-pendidikan",
  ".kartu-jenjang-pendidikan",
  ".wadah-tabel-geser",
  ".judul-seksi",
  ".sej-fakta",
  ".sej-lini-item",
  ".sej-arsip",
  ".sej-air",
  ".sej-kutipan",
  ".sej-penutup",
].join(",");

export default function AnimasiScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("reveal-in");
          // Setelah selesai, kembalikan gaya asli (agar efek hover kartu tetap jalan)
          window.setTimeout(() => {
            el.classList.remove("reveal", "reveal-in");
            el.style.transitionDelay = "";
          }, 1100);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const siapkan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = "1";

        // Elemen yang sudah terlihat saat halaman dibuka tidak dianimasikan (hindari kedipan)
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

        const kolom = el.closest<HTMLElement>('[class*="col-"]') ?? el;
        const urutan = kolom.parentElement
          ? Array.from(kolom.parentElement.children).indexOf(kolom)
          : 0;
        el.style.transitionDelay = `${Math.min(urutan, 5) * 80}ms`;
        el.classList.add("reveal");
        io.observe(el);
      });
    };

    siapkan();

    // Tangkap elemen yang muncul belakangan (misalnya setelah data dimuat atau filter diubah)
    let jadwal = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(jadwal);
      jadwal = requestAnimationFrame(siapkan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(jadwal);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}