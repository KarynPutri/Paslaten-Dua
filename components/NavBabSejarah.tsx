"use client";

import { useEffect, useState } from "react";

export default function NavBabSejarah({ item }: { item: { id: string; label: string }[] }) {
  const [aktif, setAktif] = useState(item[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAktif(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    item.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [item]);

  return (
    <nav className="sej-titik" aria-label="Navigasi bab">
      {item.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={aktif === i.id ? "aktif" : ""} aria-label={i.label}>
          <span>{i.label}</span>
        </a>
      ))}
    </nav>
  );
}