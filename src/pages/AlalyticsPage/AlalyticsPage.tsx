"use client";

import Chart from "@/components/Chart/Chart";
import MapUsers from "@/components/Map/Map";
import { useGetUsersQuery } from "@/store/services/usersApi";
import { setUsers } from "@/store/slices/usersSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlalyticsPage = () => {
  const dispatch = useDispatch();
  const { data: users = [] } = useGetUsersQuery();
  useEffect(() => {
    if (users.length > 0) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);
  const totalUsers = useSelector((state: RootState) => state.users.totalUsers);
  console.log(totalUsers);
  return (
    <div>
      <h1 className="text-center text-blue-600 font-extrabold text-6xl">
        Analytics Page
      </h1>
      <div className=" flex items-center p-11 w-full h-32  rounded-xl border border-gray-500 mt-10">
        <h1 className="text-4xl text-gray-600 font-bold">Total users </h1>
        <h1 className="text-4xl text-blue-700 font-bold ml-5">{totalUsers}</h1>
      </div>
      <div className="flex mt-10 justify-between">
        <div className=" w-[48%]">
          <h2 className="text-2xl text-gray-500 font-semibold text-center mb-4">
            Count users in company
          </h2>
          <Chart />
        </div>
        <div className=" w-[48%] h-[200px]">
          <h2 className="text-2xl text-gray-500 font-semibold text-center mb-4">
            Map
          </h2>
          <MapUsers />
        </div>
      </div>
    </div>
  );
};

export default AlalyticsPage;
