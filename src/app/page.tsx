"use client";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/pages/HomePage/HomePage"), {
  ssr: false,
});
export default function Home() {
  return <HomePage />;
}
