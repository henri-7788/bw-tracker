"use client";
import React from "react";
import Link from "next/link";

type Props = {
  app: any;
};

export default function ApplicationItem({ app }: Props) {
  return (
    <div className="application-item">
      <div className="row">
        <div className="meta">
          <h3>{app.company} - {app.role}</h3>
          <div className="small">Applied: {new Date(app.applied_at).toLocaleDateString()}</div>
        </div>
        <div className="actions">
          <Link href={`/applications/${app.id}`} className="button">View</Link>
        </div>
      </div>
      <p className="status">Status: {app.status}</p>
      {app.notes && <p className="notes">{app.notes}</p>}
    </div>
  );
}
