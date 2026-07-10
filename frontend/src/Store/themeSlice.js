import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("lightTheme");
  return savedTheme ? JSON.parse(savedTheme) : false;
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { lightTheme: getInitialTheme() },
  reducers: {
    toggletheme: (state, action) => {
      state.lightTheme = !state.lightTheme;
    },
  },
});

export const { toggletheme } = themeSlice.actions;
export default themeSlice.reducer;
