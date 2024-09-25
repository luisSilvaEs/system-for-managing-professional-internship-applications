// app/private/queries/studentDetail/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function StudentDetail() {
  const { numeroControl } = useParams();

  return (
    <div>
      <h1>Student Detail</h1>
      <p>Numero de Control: {numeroControl}</p>
    </div>
  );
}
