
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export const useFilteredUsers = (
  users: User[],
  searchQuery: string,
  selectedCompany: string,
  currentPage: number,
  limit: number
) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCompany =
        selectedCompany === "All Companies" ||
        user.company.name === selectedCompany;
      return matchesSearch && matchesCompany;
    });
    setFilteredUsers(filtered);
  }, [searchQuery, selectedCompany, users]);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    filteredUsers: filteredUsers.slice(startIndex, endIndex),
    totalPage: Math.ceil(filteredUsers.length / limit),
  };
};
