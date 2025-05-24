import { createSlice } from "@reduxjs/toolkit";

import { getStudentDetails } from "../thunks/studentThunks";

const INITIAL_STATE = {
	studentData: null,
	token: null,
	toggleTheme: false,
	isAuthenticated: false,
};

const studentSlice = createSlice({
	name: "student",
	initialState: INITIAL_STATE,
	reducers: {
		studentLogin(state, action) {
			state.studentData = action.payload.studentData;
			state.isAuthenticated = true;
		},
		studentUpdate(state, action) {
			console.log(action);

			state.studentData = {
				...state.tutorData,
				...action.payload,
			};
		},
		studentChangeTheme(state, action) {
			state.toggleTheme = action.payload;
		},
		studentLogout(state) {
			state.studentData = null;
			state.token = null;
			state.isAuthenticated = false;
			localStorage.getItem("activeItem") &&
				localStorage.removeItem("activeItem");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getStudentDetails.fulfilled, (state, action) => {
			console.log(action.payload)
			state.studentData = action.payload;
			state.isAuthenticated = true;
		})
		// .addCase(getStudentDetails.rejected, (state, action) => {
		// 	state.studentData = null;
		// 	state.token = null;
		// 	state.isAuthenticated = false;
		// })
	},
});

export const {
	studentChangeTheme,
	studentUpdate,
	studentLogin,
	studentLogout,
} = studentSlice.actions;

export default studentSlice.reducer;
