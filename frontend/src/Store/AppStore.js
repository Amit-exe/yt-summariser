import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

appStore.subscribe(() => {
  const state = appStore.getState();
  localStorage.setItem("lightTheme", JSON.stringify(state.theme.lightTheme));
});

export default appStore;
