import { BASE_URL } from "../utils/constants";
import fetchMock from "jest-fetch-mock";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
} from "../store/services/usersApi";
import { usersApi } from "../store/services/usersApi";
import { User } from "@/types/user";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store/store";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
  store.dispatch(usersApi.util.resetApiState());
  fetchMock.resetMocks();
});

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("usersApi", () => {
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
      phone: "1-770-736-8031 x564",
      website: "hildegard",
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
      username: "Samanth",
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
      phone: "1-463-123-444",
      website: "ramiro.info",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Face to face bifurcated interface",
        bs: "e-enable strategic applications",
      },
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
      address: {
        street: "Hoeger Mall",
        suite: "Apt. 692",
        city: "South Elvis",
        zipcode: "53919-4257",
        geo: {
          lat: "29.4572",
          lng: "-164.2990",
        },
      },
      phone: "493-170-9623 x156",
      website: "kale.biz",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Multi-tiered zero tolerance productivity",
        bs: "transition cutting-edge web services",
      },
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      address: {
        street: "Skiles Walks",
        suite: "Suite 351",
        city: "Roscoeview",
        zipcode: "33263",
        geo: {
          lat: "-31.8129",
          lng: "62.5342",
        },
      },
      phone: "(254)954-1289",
      website: "demarco.info",
      company: {
        id: 5,
        name: "Keebler LLC",
        catchPhrase: "User-centric fault-tolerant solution",
        bs: "revolutionize end-to-end systems",
      },
    },
    {
      id: 6,
      name: "Mrs. Dennis Schulist",
      username: "Leopoldo_Corkery",
      email: "Karley_Dach@jasper.info",
      address: {
        street: "Norberto Crossing",
        suite: "Apt. 950",
        city: "South Christy",
        zipcode: "23505-1337",
        geo: {
          lat: "-71.4197",
          lng: "71.7478",
        },
      },
      phone: "1-477-935-8478 x6430",
      website: "ola.org",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Synchronised bottom-line interface",
        bs: "e-enable innovative applications",
      },
    },
    {
      id: 7,
      name: "Kurtis Weissnat",
      username: "Elwyn.Skiles",
      email: "Telly.Hoeger@billy.biz",
      address: {
        street: "Rex Trail",
        suite: "Suite 280",
        city: "Howemouth",
        zipcode: "58804-1099",
        geo: {
          lat: "24.8918",
          lng: "21.8984",
        },
      },
      phone: "210.067.6132",
      website: "elvis.io",
      company: {
        id: 2,
        name: "Deckow-Crist",
        catchPhrase: "Configurable multimedia task-force",
        bs: "generate enterprise e-tailers",
      },
    },
    {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      email: "Sherwood@rosamond.me",
      address: {
        street: "Ellsworth Summit",
        suite: "Suite 729",
        city: "Aliyaview",
        zipcode: "45169",
        geo: {
          lat: "-14.3990",
          lng: "-120.7677",
        },
      },
      phone: "586.493.6943 x140",
      website: "jacynthe.com",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Implemented secondary concept",
        bs: "e-enable extensible e-tailers",
      },
    },
    {
      id: 9,
      name: "Glenna Reichert",
      username: "Delphine",
      email: "Chaim_McDermott@dana.io",
      address: {
        street: "Dayna Park",
        suite: "Suite 449",
        city: "Bartholomebury",
        zipcode: "76495-3109",
        geo: {
          lat: "24.6463",
          lng: "-168.8889",
        },
      },
      phone: "(775)976-6794 x41206",
      website: "conrad.com",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Switchable contextually-based project",
        bs: "aggregate real-time technologies",
      },
    },
    {
      id: 10,
      name: "Clementina DuBuq",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      address: {
        street: "Kattie Turnpike",
        suite: "Suite 198",
        city: "Lebsackbury",
        zipcode: "31428-2261",
        geo: {
          lat: "-38.2386",
          lng: "57.2232",
        },
      },
      phone: "024-648-3804",
      website: "ambrose.net",
      company: {
        id: 6,
        name: "Hoeger LLC",
        catchPhrase: "Centralized empowering task-force",
        bs: "target end-to-end models",
      },
    },
    {
      id: 11,
      name: "Ashley Cox",
      username: "Ashley.Cox",
      email: "Ashley@domain.com",
      address: {
        street: "Hill Valley",
        suite: "Apt. 300",
        city: "Silverville",
        zipcode: "52300-2400",
        geo: {
          lat: "12.3456",
          lng: "78.9101",
        },
      },
      phone: "987-654-3210",
      website: "silver.com",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Innovative solutions for modern problems",
        bs: "empower user-centric platforms",
      },
    },
    {
      id: 12,
      name: "Michael Anderson",
      username: "mike.anderson",
      email: "michael.anderson@company.com",
      address: {
        street: "Pine Street",
        suite: "Apt. 405",
        city: "New Haven",
        zipcode: "45678-1234",
        geo: {
          lat: "41.2345",
          lng: "-72.9876",
        },
      },
      phone: "203-555-0123",
      website: "anderson.net",
      company: {
        id: 2,
        name: "Deckow-Crist",
        catchPhrase: "Dynamic solutions for global markets",
        bs: "optimize cross-platform initiatives",
      },
    },
    {
      id: 13,
      name: "Sarah Johnson",
      username: "sjohnson",
      email: "sarah.j@business.net",
      address: {
        street: "Maple Avenue",
        suite: "Suite 202",
        city: "Springfield",
        zipcode: "67890-5678",
        geo: {
          lat: "42.3456",
          lng: "-71.8765",
        },
      },
      phone: "413-555-0124",
      website: "sjohnson.com",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Innovative business solutions",
        bs: "streamline virtual experiences",
      },
    },
    {
      id: 14,
      name: "David Wilson",
      username: "dwilson",
      email: "david.wilson@tech.io",
      address: {
        street: "Oak Road",
        suite: "Unit 303",
        city: "Riverside",
        zipcode: "34567-8901",
        geo: {
          lat: "33.4567",
          lng: "-117.7654",
        },
      },
      phone: "951-555-0125",
      website: "dwilson.io",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Next-generation technology solutions",
        bs: "revolutionize digital transformation",
      },
    },
    {
      id: 15,
      name: "Emily Brown",
      username: "ebrown",
      email: "emily.brown@domain.com",
      address: {
        street: "Cedar Lane",
        suite: "Apt. 505",
        city: "Lakewood",
        zipcode: "23456-7890",
        geo: {
          lat: "39.5678",
          lng: "-105.6543",
        },
      },
      phone: "303-555-0126",
      website: "emilybrown.net",
      company: {
        id: 5,
        name: "Keebler LLC",
        catchPhrase: "Innovative digital solutions",
        bs: "leverage cloud technologies",
      },
    },
    {
      id: 16,
      name: "James Taylor",
      username: "jtaylor",
      email: "james.t@company.net",
      address: {
        street: "Birch Street",
        suite: "Suite 606",
        city: "Mountain View",
        zipcode: "94043-1234",
        geo: {
          lat: "37.3861",
          lng: "-122.0839",
        },
      },
      phone: "650-555-0127",
      website: "jtaylor.com",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Innovative tech solutions",
        bs: "enable digital transformation",
      },
    },
    {
      id: 17,
      name: "Emma Davis",
      username: "edavis",
      email: "emma.davis@tech.com",
      address: {
        street: "Willow Way",
        suite: "Apt. 707",
        city: "Seattle",
        zipcode: "98101-5678",
        geo: {
          lat: "47.6062",
          lng: "-122.3321",
        },
      },
      phone: "206-555-0128",
      website: "emmadavis.io",
      company: {
        id: 2,
        name: "Deckow-Crist",
        catchPhrase: "Leading edge solutions",
        bs: "innovate digital experiences",
      },
    },
    {
      id: 18,
      name: "William Miller",
      username: "wmiller",
      email: "william.m@business.io",
      address: {
        street: "Elm Court",
        suite: "Suite 808",
        city: "Portland",
        zipcode: "97201-9012",
        geo: {
          lat: "45.5155",
          lng: "-122.6789",
        },
      },
      phone: "503-555-0129",
      website: "wmiller.net",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Future-ready solutions",
        bs: "transform digital platforms",
      },
    },
    {
      id: 19,
      name: "Olivia Martinez",
      username: "omartinez",
      email: "olivia.m@company.net",
      address: {
        street: "Spruce Avenue",
        suite: "Unit 909",
        city: "Austin",
        zipcode: "78701-3456",
        geo: {
          lat: "30.2672",
          lng: "-97.7431",
        },
      },
      phone: "512-555-0130",
      website: "oliviam.com",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Innovative business solutions",
        bs: "optimize digital strategies",
      },
    },
    {
      id: 20,
      name: "Benjamin Garcia",
      username: "bgarcia",
      email: "ben.garcia@tech.net",
      address: {
        street: "Aspen Circle",
        suite: "Apt. 1010",
        city: "Denver",
        zipcode: "80202-7890",
        geo: {
          lat: "39.7392",
          lng: "-104.9903",
        },
      },
      phone: "303-555-0131",
      website: "bengarcia.io",
      company: {
        id: 5,
        name: "Keebler LLC",
        catchPhrase: "Next-gen digital solutions",
        bs: "revolutionize user experiences",
      },
    },
    {
      id: 21,
      name: "Isabella Rodriguez",
      username: "irodriguez",
      email: "isabella.r@domain.io",
      address: {
        street: "Magnolia Drive",
        suite: "Suite 1111",
        city: "Miami",
        zipcode: "33101-2345",
        geo: {
          lat: "25.7617",
          lng: "-80.1918",
        },
      },
      phone: "305-555-0132",
      website: "isabellar.com",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Digital transformation solutions",
        bs: "enable cloud innovations",
      },
    },
    {
      id: 22,
      name: "Ethan Thompson",
      username: "ethompson",
      email: "ethan.t@company.com",
      address: {
        street: "Redwood Lane",
        suite: "Apt. 1212",
        city: "Boston",
        zipcode: "02108-6789",
        geo: {
          lat: "42.3601",
          lng: "-71.0589",
        },
      },
      phone: "617-555-0133",
      website: "ethant.net",
      company: {
        id: 2,
        name: "Deckow-Crist",
        catchPhrase: "Enterprise digital solutions",
        bs: "transform business processes",
      },
    },
    {
      id: 23,
      name: "Sophia Lee",
      username: "slee",
      email: "sophia.lee@tech.com",
      address: {
        street: "Sequoia Street",
        suite: "Unit 1313",
        city: "San Francisco",
        zipcode: "94102-0123",
        geo: {
          lat: "37.7749",
          lng: "-122.4194",
        },
      },
      phone: "415-555-0134",
      website: "sophialee.io",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Innovative tech solutions",
        bs: "optimize digital platforms",
      },
    },
    {
      id: 24,
      name: "Alexander White",
      username: "awhite",
      email: "alex.white@business.net",
      address: {
        street: "Sycamore Court",
        suite: "Suite 1414",
        city: "Chicago",
        zipcode: "60601-4567",
        geo: {
          lat: "41.8781",
          lng: "-87.6298",
        },
      },
      phone: "312-555-0135",
      website: "alexwhite.com",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Digital innovation solutions",
        bs: "revolutionize customer experiences",
      },
    },
    {
      id: 25,
      name: "Mia Clark",
      username: "mclark",
      email: "mia.clark@domain.net",
      address: {
        street: "Juniper Road",
        suite: "Apt. 1515",
        city: "Las Vegas",
        zipcode: "89101-8901",
        geo: {
          lat: "36.1699",
          lng: "-115.1398",
        },
      },
      phone: "702-555-0136",
      website: "miaclark.io",
      company: {
        id: 5,
        name: "Keebler LLC",
        catchPhrase: "Next-generation solutions",
        bs: "enable digital innovations",
      },
    },
    {
      id: 26,
      name: "Daniel Martin",
      username: "dmartin",
      email: "daniel.m@tech.io",
      address: {
        street: "Palm Avenue",
        suite: "Unit 1616",
        city: "San Diego",
        zipcode: "92101-2345",
        geo: {
          lat: "32.7157",
          lng: "-117.1611",
        },
      },
      phone: "619-555-0137",
      website: "danielm.net",
      company: {
        id: 1,
        name: "Romaguera-Crona",
        catchPhrase: "Enterprise solutions",
        bs: "transform digital experiences",
      },
    },
    {
      id: 27,
      name: "Ava Anderson",
      username: "aanderson",
      email: "ava.a@company.com",
      address: {
        street: "Cypress Lane",
        suite: "Suite 1717",
        city: "Phoenix",
        zipcode: "85001-6789",
        geo: {
          lat: "33.4484",
          lng: "-112.0740",
        },
      },
      phone: "602-555-0138",
      website: "avaa.com",
      company: {
        id: 2,
        name: "Deckow-Crist",
        catchPhrase: "Digital business solutions",
        bs: "innovate customer experiences",
      },
    },
    {
      id: 28,
      name: "Joseph Taylor",
      username: "jtaylor2",
      email: "joseph.t@business.io",
      address: {
        street: "Laurel Street",
        suite: "Apt. 1818",
        city: "Houston",
        zipcode: "77001-0123",
        geo: {
          lat: "29.7604",
          lng: "-95.3698",
        },
      },
      phone: "713-555-0139",
      website: "josepht.net",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Tech innovation solutions",
        bs: "optimize business processes",
      },
    },
    {
      id: 29,
      name: "Victoria Moore",
      username: "vmoore",
      email: "victoria.m@tech.net",
      address: {
        street: "Chestnut Avenue",
        suite: "Unit 1919",
        city: "Dallas",
        zipcode: "75201-4567",
        geo: {
          lat: "32.7767",
          lng: "-96.7970",
        },
      },
      phone: "214-555-0140",
      website: "victoriam.io",
      company: {
        id: 4,
        name: "Robel-Corkery",
        catchPhrase: "Digital transformation experts",
        bs: "revolutionize digital strategies",
      },
    },
    {
      id: 30,
      name: "Masha Leek",
      username: "abadu",
      email: "masha.leek@tech.com",
      address: {
        street: "Sequoia Street",
        suite: "Unit 1313",
        city: "San Francisco",
        zipcode: "94102-0123",
        geo: {
          lat: "37.7749",
          lng: "-122.4194",
        },
      },
      phone: "415-555-0134",
      website: "sophialee.io",
      company: {
        id: 3,
        name: "Romaguera-Jacobson",
        catchPhrase: "Innovative tech solutions",
        bs: "optimize digital platforms",
      },
    },
  ];

  // const mockUsers2: User[] = []

  describe("useGetUsers", () => {
    beforeEach(() => {
      fetchMock.mockOnceIf(`${BASE_URL}/users.json`, JSON.stringify(mockUsers));
    });

    it("fetch users", async () => {
      const { result } = renderHook(() => useGetUsersQuery(), { wrapper });

      expect(result.current).toMatchObject({
        status: "pending",
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current).toMatchObject({
        status: "fulfilled",
        data: mockUsers,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });

      expect(result.current.data).toEqual(mockUsers);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("useGetUserById", () => {
    const userId = 1;
    beforeEach(() => {
      fetchMock.mockOnceIf(`${BASE_URL}/users.json`, JSON.stringify(mockUsers));
    });

    it("Fetch user by id", async () => {
      const { result } = renderHook(
        () => useGetUserByIdQuery(userId.toString()),
        { wrapper }
      );

      expect(result.current).toMatchObject({
        status: "pending",
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const expectedUser = mockUsers.find((user) => user.id === userId);

      expect(result.current).toMatchObject({
        status: "fulfilled",
        data: expectedUser,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("Not found user by id", async () => {
      const { result } = renderHook(() => useGetUserByIdQuery("50"), {
        wrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeUndefined();
    });
  });
});
