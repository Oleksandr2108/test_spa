import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  user: User | null;
  users: User[];
  searchTerm: string;
  selectedCompany: string;
  selectedLimit: number;
  currentPage: number;
  limit: number;
  filteredUsers: User[];
  totalPage: number;
}

const initialState: UsersState = {
  user: null,
  users: [],
  searchTerm: "",
  selectedCompany: "All Companies",
  selectedLimit: 5,
  currentPage: 1,
  limit: 5,
  filteredUsers: [],
  totalPage: 1,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedCompany(state, action: PayloadAction<string>) {
      state.selectedCompany = action.payload;
    },
    setSelectedLimit(state, action: PayloadAction<number>) {
      state.selectedLimit = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    applyFilters(state) {
      const filtered = state.users.filter((user: User) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase());
        const matchesCompany =
          state.selectedCompany === "All Companies" ||
          user.company.name === state.selectedCompany;

        return matchesSearch && matchesCompany;
      });

      state.totalPage = Math.ceil(filtered.length / state.limit);

      const startIndex = (state.currentPage - 1) * state.limit;
      const endIndex = startIndex + state.limit;

      state.filteredUsers = filtered.slice(startIndex, endIndex);
     
    },
  },
});

export const {
  setUser,
  setUsers,
  setSearchTerm,
  setSelectedCompany,
  setSelectedLimit,
  setCurrentPage,
  setLimit,
  applyFilters,
} = usersSlice.actions;

export default usersSlice.reducer;
