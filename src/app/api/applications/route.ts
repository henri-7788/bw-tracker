import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

function isAuthed(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("bw_auth=1");
}

export async function GET(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabase.from("applications").select("*").order("applied_at", { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { company, role, applied_at, status = "applied", notes = "" } = body;
  if (!company || !role || !applied_at) return NextResponse.json({ ok: false, message: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("applications").insert([{ company, role, applied_at, status, notes }]).select();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}
