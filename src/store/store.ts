import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/usersApi";
import usersReduser from "./slices/usersSlice";

const rootReducer = combineReducers({
  users: usersReduser,
  [usersApi.reducerPath]: usersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      usersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { rootReducer };
