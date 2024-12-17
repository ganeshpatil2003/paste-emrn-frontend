import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../rootReducer";
import { userApi } from "../apis/userApi";
import { pasteApi } from "../apis/pasteApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddelware) =>
    defaultMiddelware().concat(userApi.middleware, pasteApi.middleware),
});

const initializeApp = async () => {
  await store.dispatch(userApi.endpoints.getUser);
};

initializeApp();

export { store };
