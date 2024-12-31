"use client";

import { useGetUsersQuery } from "@/store/services/usersApi";
import { User } from "@/types/user";
import UserItem from "../UserItem/UserItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import Dropdown from "../Dropdown/Dropdown";

const UsersList = () => {
  const { data: users = [] } = useGetUsersQuery();

  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const currentPage = searchParams?.get("page") || "1";
  const currentLimit = searchParams?.get("limit") || "5";
  const currentCompany = searchParams?.get("company") || "";

  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const classForTableTitle =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

  const { filteredUsers, totalPage } = useFilteredUsers(
    users,
    searchTerm,
    selectedCompany,
    Number(currentPage),
    Number(currentLimit)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
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

  useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      newSearchParams.set("search", searchTerm);
    } else {
      newSearchParams.delete("search");
    }

    newSearchParams.set("page", currentPage);
    newSearchParams.set("limit", currentLimit);
    if (selectedCompany !== "All Companies") {
      newSearchParams.set("company", selectedCompany);
    } else {
      newSearchParams.delete("company");
    }

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }, [currentCompany, currentLimit, currentPage, searchTerm, selectedCompany]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="mb-4 px-3 py-2 border-b "
        />
        <Dropdown
          options={uniqueCompanies}
          selected={selectedCompany}
          onSelect={setSelectedCompany}
        />
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
          {filteredUsers?.map((user: User) => (
            <UserItem
              user={user}
              key={user.id}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={Number(currentPage)}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;
