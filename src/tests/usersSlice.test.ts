import usersReducer, {
  applyFilters,
  setCurrentPage,
  setSearchTerm,
  setSelectedCompany,
  setSelectedLimit,
  setUser,
  setUsers,
} from "../store/slices/usersSlice";

import { User } from "@/types/user";

describe("usersSlice", () => {
  const initialState = {
    user: null,
    users: [],
    searchTerm: "",
    selectedCompany: "All Companies",
    selectedLimit: 5,
    currentPage: 1,
    limit: 5,
    filteredUsers: [],
    totalPage: 1,
    totalUsers: 0,
  };

  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const mockUser: User = {
      id: 1,
      name: "Leanne Graha",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };
    const nextState = usersReducer(initialState, setUser(mockUser));
    expect(nextState.user).toEqual(mockUser);
  });

  it("should handle setUsers", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Leanne Graha",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          id: 1,
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howe",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          id: 2,
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
    ];
    const nextState = usersReducer(initialState, setUsers(mockUsers));
    expect(nextState.users).toEqual(mockUsers);
    expect(nextState.totalUsers).toBe(mockUsers.length);
  });

  it("should handle setSearchTerm", () => {
    const nextState = usersReducer(initialState, setSearchTerm("Sasha"));
    expect(nextState.searchTerm).toBe("Sasha");
  });

  it("should handle setSelectedCompany", () => {
    const nextState = usersReducer(
      initialState,
      setSelectedCompany("Timson Lab s.r.o.")
    );
    expect(nextState.selectedCompany).toBe("Timson Lab s.r.o.");
  });

  it("should handle setSelectedLimit", () => {
    const nextState = usersReducer(initialState, setSelectedLimit(10));
    expect(nextState.selectedLimit).toBe(10);
  });

  it("should handle setCurrentPage", () => {
    const nextState = usersReducer(initialState, setCurrentPage(2));
    expect(nextState.currentPage).toBe(2);
  });

  describe("applyFilters", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Leanne Graha",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          id: 1,
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howe",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          id: 2,
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        address: {
          street: "Douglas Extension",
          suite: "Suite 847",
          city: "McKenziehaven",
          zipcode: "59590-4157",
          geo: {
            lat: "-68.6102",
            lng: "-47.0653",
          },
        },
        phone: "1-463-123-4447",
        website: "ramiro.info",
        company: {
          id: 3,
          name: "Romaguera-Jacobson",
          catchPhrase: "Face to face bifurcated interface",
          bs: "e-enable strategic applications",
        },
      },
    ];
    it("should filter users based on search term and company", () => {
      const state = {
        ...initialState,
        users,
        searchTerm: "clementine",
        selectedCompany: "Romaguera-Jacobson",
      };
      const nextState = usersReducer(state, applyFilters());

      expect(nextState.filteredUsers).toEqual([
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          address: {
            street: "Douglas Extension",
            suite: "Suite 847",
            city: "McKenziehaven",
            zipcode: "59590-4157",
            geo: {
              lat: "-68.6102",
              lng: "-47.0653",
            },
          },
          phone: "1-463-123-4447",
          website: "ramiro.info",
          company: {
            id: 3,
            name: "Romaguera-Jacobson",
            catchPhrase: "Face to face bifurcated interface",
            bs: "e-enable strategic applications",
          },
        },
      ]);
      expect(nextState.totalPage).toBe(1);
    });

    it("should paginate filtered users", () => {
      const state = {
        ...initialState,
        users,
        limit: 1,
        currentPage: 3,
      };
      const nextState = usersReducer(state, applyFilters());
      expect(nextState.filteredUsers).toEqual([
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          address: {
            street: "Douglas Extension",
            suite: "Suite 847",
            city: "McKenziehaven",
            zipcode: "59590-4157",
            geo: {
              lat: "-68.6102",
              lng: "-47.0653",
            },
          },
          phone: "1-463-123-4447",
          website: "ramiro.info",
          company: {
            id: 3,
            name: "Romaguera-Jacobson",
            catchPhrase: "Face to face bifurcated interface",
            bs: "e-enable strategic applications",
          },
        },
      ]);
      expect(nextState.totalPage).toBe(3);
    });
  });
});
