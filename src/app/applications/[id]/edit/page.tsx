"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditApplication() {
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/applications/${id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(app) });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || json.message || 'Failed to update');
    } else {
      router.push(`/applications/${id}`);
    }
  }

  if (loading) return <div>Loading…</div>;
  if (!app) return <div>{error || 'Not found'}</div>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Edit Application</h1>
      <form onSubmit={onSubmit} className="form">
        <label>Company
          <input value={app.company} onChange={(e) => setApp({ ...app, company: e.target.value })} required />
        </label>
        <label>Role
          <input value={app.role} onChange={(e) => setApp({ ...app, role: e.target.value })} required />
        </label>
        <label>Applied at
          <input type="date" value={app.applied_at?.substring(0,10)} onChange={(e) => setApp({ ...app, applied_at: e.target.value })} required />
        </label>
        <label>Status
          <select value={app.status} onChange={(e) => setApp({ ...app, status: e.target.value })}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>Notes
          <textarea value={app.notes || ""} onChange={(e) => setApp({ ...app, notes: e.target.value })} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push(`/applications/${id}`)} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
    </main>
  );
}
