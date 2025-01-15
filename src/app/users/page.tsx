"use client";
import dynamic from "next/dynamic";

const UserPage = dynamic(() => import("@/pages/UserPage/UserPage"), {
  ssr: false,
});

export default function Users() {
  return (
    <div>
      <UserPage />
    </div>
  );
}
