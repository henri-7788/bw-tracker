"use client";
import React, { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ password }), headers: { "content-type": "application/json" } });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Login failed");
      } else {
        window.location.href = "/applications";
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
