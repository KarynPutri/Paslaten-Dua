import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomInt } from "crypto";
import { buatToken } from "../../../../lib/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = path.join(process.cwd(), "captcha_photos");
const KATEGORI = ["mobil", "sepeda", "bus", "motor"];

function foto(folder: string) {
  const dir = path.join(BASE, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => path.join(dir, f));
}

function acak<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dataUrl(p: string) {
  const mime = p.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(p).toString("base64")}`;
}

export async function GET() {
  if (!process.env.CAPTCHA_SECRET) {
    return NextResponse.json({ setup_needed: true, message: "CAPTCHA_SECRET belum diatur di .env.local." });
  }

  const pengecoh = foto("distractor");
  const valid = KATEGORI.map((k) => ({ k, files: foto(k) })).filter((c) => c.files.length >= 3);

  if (valid.length === 0 || pengecoh.length < 6) {
    return NextResponse.json({
      setup_needed: true,
      message: "Foto captcha belum lengkap (min. 3 foto per kategori dan 6 foto distractor).",
    });
  }

  const total = 9;
  const jumlahTarget = 3;
  const pilih = acak(valid)[0];
  const targetCells = acak([...Array(total).keys()]).slice(0, jumlahTarget).sort((a, b) => a - b);
  const fTarget = acak(pilih.files).slice(0, jumlahTarget);
  const fPengecoh = acak(pengecoh).slice(0, total - jumlahTarget);

  let t = 0;
  let d = 0;
  const cells = Array.from({ length: total }, (_, i) =>
    dataUrl(targetCells.includes(i) ? fTarget[t++] : fPengecoh[d++])
  );

  return NextResponse.json(
    { label: pilih.k, cells, token: buatToken(targetCells) },
    { headers: { "Cache-Control": "no-store" } }
  );
}