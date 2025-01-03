"use client";

import { RootState } from "@/store/store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditUserForm from "../EditUserForm/EditUserForm";

const HeaderUserDetail = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null;
  }
  return (
    <div className="flex items-center  w-full bg-blue-800 rounded-tl-xl rounded-tr-xl  p-5">
      <div className="bg-white rounded-full w-20 h-20"></div>
      <div className="ml-5">
        <h1 className="text-white text-4xl">{user.name}</h1>
        <p className="text-white text-sm">@{user.username}</p>
        <ul className="flex text-white text-xs mt-5">
          <li className="flex ">{user.company.name}</li>
          <li className="flex ml-3">
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </li>
          <li className="flex ml-3">{user.phone}</li>

          <li className="flex ml-3">
            <Link
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.website}
            </Link>
          </li>
        </ul>
      </div>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-blue-500 underline ml-3"
      >
        Edit
      </button>
      {isEditing && (
        <EditUserForm
          user={user}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default HeaderUserDetail;
