import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

function isAuthed(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("bw_auth=1");
}

export async function GET(req: Request, { params }: any) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const id = params.id;
  const { data, error } = await supabase.from("applications").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: Request, { params }: any) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const id = params.id;
  const body = await req.json();
  const { company, role, applied_at, status, notes } = body;
  const { data, error } = await supabase.from("applications").update({ company, role, applied_at, status, notes }).eq("id", id).select();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: Request, { params }: any) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const id = params.id;
  const { data, error } = await supabase.from("applications").delete().eq("id", id).select();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}
