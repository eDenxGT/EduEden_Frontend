import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	adminData: null,
	token: null,
	toggleTheme: false,
	isAuthenticated: false
};

const adminSlice = createSlice({
	name: "admin",
	initialState: INITIAL_STATE,
	reducers: {
		adminLogin(state, action) {
			state.adminData = action.payload.adminData;
			state.token = action.payload.token;
			state.isAuthenticated = true
		},
		adminChangeTheme(state, action) {
			state.toggleTheme = action.payload;
		},
		adminLogout(state) {
			state.adminData = null;
			state.token = null;
			state.isAuthenticated = false
			localStorage.getItem("activeItem") &&
			localStorage.removeItem("activeItem");
		},
	},
});

export const {adminChangeTheme, adminLogin, adminLogout} = adminSlice.actions;

export default adminSlice.reducer;
