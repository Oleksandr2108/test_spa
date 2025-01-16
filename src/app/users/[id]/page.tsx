"use client";

import UserDetailPage from "@/pagess/UserDetailPage/UserDetailPage";
import { useGetUserByIdQuery } from "@/store/services/usersApi";
import { setUser } from "@/store/slices/usersSlice";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

const UserById = ({ params }: { params: Promise<{ id: string }> }) => {
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
      <Suspense>
        <UserDetailPage />
      </Suspense>
    </div>
  );
};

export default UserById;
