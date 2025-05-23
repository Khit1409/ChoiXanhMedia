import { createSlice } from "@reduxjs/toolkit";

///slice mở menu
interface MenuState {
  responsiveMenu: boolean;
  openMenu: boolean | null;
}

const initialState: MenuState = {
  responsiveMenu: false,
  openMenu: null,
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openResponsiveMenu: (state, action) => {
      state.responsiveMenu = action.payload;
    },
    handleOpenUserMenu: (state, action) => {
      state.openMenu = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { openResponsiveMenu, handleOpenUserMenu } = menuSlice.actions;
