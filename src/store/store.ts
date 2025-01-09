import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/usersApi";
import usersReduser from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReduser,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      usersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
