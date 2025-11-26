"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function Header() {
  return (
    <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link href="/applications" style={{ marginRight: 12 }}>Applications</Link>
        <Link href="/applications/new">New</Link>
      </div>
      <LogoutButton />
    </header>
  );
}
