import { createSlice } from "@reduxjs/toolkit";
import {
	addCourse,
	fetchCourses,
	fetchCoursesByCourseId,
	updateCourse,
	deleteCourseById,
	handleCourseStatus,
	fetchCoursesByStudentId,
	fetchCourseProgressByStudentId,
	updateCourseProgressByStudentId,
	fetchCourseQuizByQuizId
} from "../thunks/courseThunks";

const courseSlice = createSlice({
	name: "courses",
	initialState: {
		courses: [],
		course: null,
		courseProgress: null,
		courseQuiz: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addCourse.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCourse.fulfilled, (state, action) => {
				state.loading = false;
				state.courses.push(action.payload);
			})
			.addCase(addCourse.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCourses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCoursesByCourseId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesByCourseId.fulfilled, (state, action) => {
				state.loading = false;
				state.course = action.payload;
			})
			.addCase(fetchCoursesByCourseId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateCourse.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				state.loading = false;
				state.course = action.payload;
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteCourseById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCourseById.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = state.courses.filter(
					(course) => course._id !== action.payload
				);
			})
			.addCase(deleteCourseById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleCourseStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleCourseStatus.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = state.courses.map((course) =>
					course._id === action.payload._id ? action.payload : course
				);
			})
			.addCase(handleCourseStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCoursesByStudentId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesByStudentId.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchCoursesByStudentId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}).addCase(fetchCourseProgressByStudentId.pending, (state) => {
				state.loading = true;
				state.error = null;
			}).addCase(fetchCourseProgressByStudentId.fulfilled, (state, action) => {
				state.loading = false;
				state.courseProgress = action.payload;
			})
			.addCase(fetchCourseProgressByStudentId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateCourseProgressByStudentId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCourseProgressByStudentId.fulfilled, (state, action) => {
				state.loading = false;
				state.courseProgress = action.payload;
			})
			.addCase(updateCourseProgressByStudentId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCourseQuizByQuizId.fulfilled, (state, action) => {
				console.log(action.payload)
				state.loading = false;
				state.courseQuiz = action.payload;
				console.log(state.courseQuiz)
			})
	},
});

export default courseSlice.reducer;
