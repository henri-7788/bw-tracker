"use client";
import React, { useEffect, useState } from "react";
import ApplicationItem from "@/components/ApplicationItem";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/applications');
        const json = await res.json();
        if (!res.ok) {
          setError(json.message || 'Failed to load');
        } else {
          setApps(json.data || []);
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Applications</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/applications/new" className="button">New</Link>
          <LogoutButton />
        </div>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="applications-list">
          {apps.length === 0 && <div>No applications yet</div>}
          {apps.map(a => (
            <ApplicationItem key={a.id} app={a} />
          ))}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </main>
  );
}
