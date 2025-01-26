"use client";

import { useGetUsersQuery } from "@/store/services/usersApi";
import { User } from "@/types/user";
import UserItem from "../UserItem/UserItem";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Dropdown from "../Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedCompany,
  setCurrentPage,
  setLimit,
  setUsers,
  applyFilters,
} from "@/store/slices/usersSlice";
import { RootState } from "@/store/store";
import ExportUsersButton from "../ExportComponent/Export";

interface UsersListProps {
  initialUsers: User[];
}
const UsersList = ({ initialUsers }: UsersListProps) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { data: users = initialUsers } = useGetUsersQuery();

  const searchQuery = searchParams?.get("search") || "";
  const currentPage = searchParams?.get("page") || "1";
  const currentLimit = searchParams?.get("limit") || "5";
  const currentCompany = searchParams?.get("company") || "";

  const {
    searchTerm,
    selectedCompany,
    currentPage: page,
    filteredUsers,
    totalPage,
    limit,
  } = useSelector((state: RootState) => state.users);

  const classForTableTitle =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

  useEffect(() => {
    if (users.length > 0) {
      dispatch(setUsers(users));
      dispatch(applyFilters());
    }
  }, [users, dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(searchQuery));
    dispatch(setCurrentPage(Number(currentPage)));
    dispatch(setLimit(Number(currentLimit)));
    if (currentCompany) {
      dispatch(setSelectedCompany(currentCompany));
    }
  }, [searchQuery, currentPage, currentLimit, currentCompany, dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [searchTerm, selectedCompany, page, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("page", String(page));
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const uniqueCompanies = Array.from(
    new Set(
      users.map((user) =>
        JSON.stringify({ id: user.company.id, nameCompany: user.company.name })
      )
    )
  ).map((company) => JSON.parse(company));
  
  const handleLimitChange = () => {
    if (users.length > limit) {
      const newLimit = limit + 5;
      dispatch(setLimit(newLimit));
      dispatch(applyFilters());

      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("limit", newLimit.toString());
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      newSearchParams.set("search", searchTerm);
    } else {
      newSearchParams.delete("search");
    }

    newSearchParams.set("page", String(page));
    newSearchParams.set("limit", currentLimit);
    if (selectedCompany !== "All Companies") {
      newSearchParams.set("company", selectedCompany);
    } else {
      newSearchParams.delete("company");
    }

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }, [currentLimit, page, searchTerm, selectedCompany]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="mb-4 px-3 py-2 border-b"
        />
        <div className="flex w-96 justify-between">
          <Dropdown
            options={uniqueCompanies}
            selected={selectedCompany}
            onSelect={(company) => dispatch(setSelectedCompany(company))}
          />
          <ExportUsersButton />
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={classForTableTitle}>ID</th>
            <th className={classForTableTitle}>Name</th>
            <th className={classForTableTitle}>Email</th>
            <th className={classForTableTitle}>Company</th>
            <th className={classForTableTitle}></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers?.map((user: User, index: number) => (
            <UserItem
              user={user}
              key={user.id}
              index={index}
              limit={limit}
            />
          ))}
        </tbody>
      </table>
      {users.length > limit && (
        <div
          className=" w-40 bg-blue-200 rounded-lg m-auto my-5 text-center cursor-pointer"
          onClick={() => handleLimitChange()}
        >
          {" "}
          Show more{" "}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;
