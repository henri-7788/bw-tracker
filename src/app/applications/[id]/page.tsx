"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function ApplicationDetails() {
  const { id } = useParams() as { id: string };
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/applications/${id}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || 'Could not load');
      } else {
        setApp(json.data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function onDelete() {
    if (!confirm('Delete application?')) return;
    const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    if (res.ok) router.push('/applications');
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Application</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <LogoutButton />
        </div>
      </div>
      {loading ? <div>Loading…</div> : app ? (
        <div>
          <h2>{app.company} — {app.role}</h2>
          <div>Applied at: {new Date(app.applied_at).toLocaleDateString()}</div>
          <div>Status: {app.status}</div>
          <p>Notes: {app.notes}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => router.push(`/applications/${id}/edit`)}>Edit</button>
            <button onClick={onDelete} style={{ marginLeft: 8 }}>Delete</button>
            <button onClick={() => router.push('/applications')} style={{ marginLeft: 8 }}>Back</button>
          </div>
        </div>
      ) : <div>{error || "Not found"}</div>}
    </main>
  );
}
