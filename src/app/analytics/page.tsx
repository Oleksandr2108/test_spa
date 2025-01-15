"use client";
import dynamic from "next/dynamic";

const AnalyticsPage = dynamic(
  () => import("@/pages/AlalyticsPage/AlalyticsPage"),
  {
    ssr: false,
  }
);

export default function Analytics() {
  return <AnalyticsPage />;
}
