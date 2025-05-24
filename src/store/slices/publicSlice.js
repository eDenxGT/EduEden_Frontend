import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	toggleTheme: false,
};

const publicSlice = createSlice({
	name: "public",
	initialState: INITIAL_STATE,
	reducers: {

		publicChangeTheme(state, action) {
			state.toggleTheme = action.payload;
		},
	},
});

export const {publicChangeTheme} = publicSlice.actions;

export default publicSlice.reducer;