"use client";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/pagess/HomePage/HomePage"), {
  ssr: false,
});
export default function Home() {
  return <HomePage />;
}
