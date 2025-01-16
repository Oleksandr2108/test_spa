"use client";

import UsersList from "@/components/UsersList/UsersList";
import { Suspense } from "react";

const UserPage = () => {
  return (
    <div className="">
      <Suspense>
        <UsersList />
      </Suspense>
    </div>
  );
};

export default UserPage;
