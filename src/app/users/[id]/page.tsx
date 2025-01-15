"use client";

import dynamic from "next/dynamic";

import { useGetUserByIdQuery } from "@/store/services/usersApi";
import { setUser } from "@/store/slices/usersSlice";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UserDetailPage = dynamic(
  () => import("@/pages/UserDetailPage/UserDetailPage"),
  {
    ssr: false,
  }
);
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserById({ params }: PageProps) {
  const dispatch = useDispatch();
  const { id } = React.use(params);
  const { data: user } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      <UserDetailPage />
    </div>
  );
}
