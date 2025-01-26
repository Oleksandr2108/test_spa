import { getUsers } from "@/features/api";
import AnalyticsPage from "@/pagess/AlalyticsPage/AlalyticsPage";
import { Suspense } from "react";

export const metadata = {
  title: "Analytics Page",
  description: "Show analytics ",
};

async function Analytics() {
  const initialUsers = await getUsers();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AnalyticsPage initialUsers={initialUsers} />;
      </Suspense>
    </>
  );
}

export default Analytics;
