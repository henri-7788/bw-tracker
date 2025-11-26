import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.WEB_PASSWORD ?? "";
    if (!password || password !== expected) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    const cookieValue = "1";
    const maxAge = 60 * 60 * 24 * 7; // 1 week
    const res = NextResponse.json({ ok: true });
    res.headers.append("Set-Cookie", `bw_auth=${cookieValue}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`);
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Bad request" }, { status: 400 });
  }
}
