"use client";
import React, { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }
  return (
    <button onClick={logout} disabled={loading} className="logout-btn">
      Logout
    </button>
  );
}
