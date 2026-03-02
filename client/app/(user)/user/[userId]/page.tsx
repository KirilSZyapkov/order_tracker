"use client";

import { useParams } from "next/navigation";
export default function UserPage() {
  const params = useParams();
  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {params.userId}</p>
    </div>
  );
}