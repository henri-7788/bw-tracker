"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewApplicationPage() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [appliedAt, setAppliedAt] = useState(new Date().toISOString().substring(0, 10));
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const payload = { company, role, applied_at: appliedAt, status, notes };
    const res = await fetch('/api/applications', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || json.message || 'Failed to create');
    } else {
      router.push('/applications');
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>New Application</h1>
      <form onSubmit={onSubmit} className="form">
        <label>Company
          <input value={company} onChange={(e) => setCompany(e.target.value)} required />
        </label>
        <label>Role
          <input value={role} onChange={(e) => setRole(e.target.value)} required />
        </label>
        <label>Applied at
          <input type="date" value={appliedAt} onChange={(e) => setAppliedAt(e.target.value)} required />
        </label>
        <label>Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button type="submit">Create</button>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
}
