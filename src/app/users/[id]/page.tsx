"use client";

import UserDetail from "@/components/UserDetail/UserDetail";
import { useGetUserByIdQuery } from "@/store/services/usersApi";
import React from "react";

export const UserById = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { data: user } = useGetUserByIdQuery(id);
  return (
    <div>
      <UserDetail user={user} />
    </div>
  );
};

export default UserById;
