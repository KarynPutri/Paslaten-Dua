import { createHmac, randomBytes, timingSafeEqual } from "crypto";

function tandatangan(nonce: string, exp: number, sel: number[]) {
  return createHmac("sha256", process.env.CAPTCHA_SECRET ?? "")
    .update(`${nonce}.${exp}.${[...sel].sort((a, b) => a - b).join(",")}`)
    .digest("hex");
}

export function buatToken(jawaban: number[]) {
  const nonce = randomBytes(8).toString("hex");
  const exp = Date.now() + 3 * 60 * 1000; // berlaku 3 menit
  return `${nonce}.${exp}.${tandatangan(nonce, exp, jawaban)}`;
}

export function cekToken(token: string, dipilih: number[]) {
  const [nonce, expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!process.env.CAPTCHA_SECRET) return { ok: false, msg: "CAPTCHA_SECRET belum diatur." };
  if (!nonce || !exp || !sig) return { ok: false, msg: "Tantangan tidak valid. Muat ulang." };
  if (Date.now() > exp) return { ok: false, msg: "Tantangan kedaluwarsa. Muat ulang." };

  const a = Buffer.from(tandatangan(nonce, exp, dipilih));
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, msg: "Pilihan kurang tepat. Coba tantangan baru." };
  }
  return { ok: true, msg: "" };
}