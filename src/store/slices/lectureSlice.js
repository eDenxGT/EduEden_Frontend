import { createSlice } from "@reduxjs/toolkit";
import { addLecture, updateLectures, fetchLecturesByCourseId
 } from "../thunks/lectureThunks";

const lectureSlice = createSlice({
	name: "lectures",
	initialState: {
		lectures: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addLecture.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addLecture.fulfilled, (state, action) => {
				state.loading = false;
				state.lectures.push(action.payload);
			})
			.addCase(addLecture.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateLectures.pending, (state)=> {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateLectures.fulfilled, (state, action) => {
				state.loading = false;
				state.lectures = action.payload;
			})
			.addCase(updateLectures.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchLecturesByCourseId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchLecturesByCourseId.fulfilled, (state, action) => {
				state.loading = false;
				state.lectures = action.payload;
			})
			.addCase(fetchLecturesByCourseId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
	},
});


export default lectureSlice.reducer