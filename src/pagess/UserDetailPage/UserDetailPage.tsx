"use client";

import AddresSection from "@/components/UserDetail/AddresSection/AddresSection";
import CompanySection from "@/components/UserDetail/CompanySection/CompanySection";
import HeaderUserDetail from "@/components/UserDetail/HeaderUserDetail/HeaderUserDetail";
import { RootState } from "@/store/store";

import React from "react";
import { useSelector } from "react-redux";

const UserDetailPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  if (!user) {
    return null;
  }

  return (
    <div className="w-[700px] m-auto relative">
      <HeaderUserDetail />
      <div className="bg-gray-100 p-5 rounded-bl-xl rounded-br-xl">
        <CompanySection />
        <div className="mt-5">
          <AddresSection />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
