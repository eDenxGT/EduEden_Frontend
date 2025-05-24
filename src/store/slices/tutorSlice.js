import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	tutorData: null,
	token: null,
	toggleTheme: false,
	isAuthenticated: false
};

const tutorSlice = createSlice({
	name: "tutor",
	initialState: INITIAL_STATE,
	reducers: {
		tutorLogin(state, action) {
			console.log(action.payload);
			
			state.tutorData = action.payload.tutorData;
			state.token = action.payload.token;
			state.isAuthenticated = true
		},
		tutorUpdate(state, action) {			
			state.tutorData = {
				...state.tutorData,
				...action.payload
			}
		},
		tutorChangeTheme(state, action) {
			state.toggleTheme = action.payload;
		},
		tutorLogout(state) {
			state.tutorData = null;
			state.token = null;
			state.isAuthenticated = false
         localStorage.getItem("activeItem") &&
			localStorage.removeItem("activeItem");
		},
	},
});

export const {tutorChangeTheme, tutorUpdate, tutorLogin, tutorLogout} = tutorSlice.actions;

export default tutorSlice.reducer;
