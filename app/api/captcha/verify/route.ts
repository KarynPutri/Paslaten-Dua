import { NextResponse } from "next/server";
import { cekToken } from "../../../../lib/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const dipilih = Array.from(
    new Set(
      (Array.isArray(body.selected) ? body.selected : [])
        .map(Number)
        .filter((n: number) => Number.isInteger(n) && n >= 0 && n < 9)
    )
  ) as number[];

  return NextResponse.json(cekToken(String(body.token ?? ""), dipilih));
}