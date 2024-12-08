import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	course_id: "",
	title: "",
	category: "",
	duration: "",
	language: "",
	level: "",
	course_description: "",
	course_thumbnail: "",
	course_thumbnail_preview: "",
	price: "",
	lectures: [],
	deletedLectures: [],
};

const updateCourseSlice = createSlice({
	name: "updateCourse",
	initialState,
	reducers: {
		setInitialData: (state, action) => {
			console.log(action.payload);

			return { ...state, ...action.payload };
		},

		updateFormData: (state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},

		addLecture: (state, action) => {
			const { title, description, duration, pdf_notes } = action.payload;
			const newLecture = {
				lecture_id:
					"lecture" +
					Date.now() +
					Math.floor(Math.random() * 100000 + Date.now() + 900000),
				course_id: state.course_id,
				title,
				description,
				duration,
				pdf_notes,
			};
			state.lectures.push(newLecture);
		},

		updateLecture: (state, action) => {
			const { lectureId, updatedData } = action.payload;
			const lectureIndex = state.lectures.findIndex(
				(lecture) => lecture._id === lectureId
			);
			if (lectureIndex !== -1) {
				state.lectures[lectureIndex] = {
					...state.lectures[lectureIndex],
					...updatedData,
				};
			}
		},

		removeLecture: (state, action) => {
			state.lectures = state.lectures.filter(
				(lecture) => lecture._id !== action.payload
			);
         state.deletedLectures= [...state.deletedLectures,action.payload];
		},

		resetFormData: () => {
			return initialState;
		},
	},
});

export const {
	setInitialData,
	updateFormData,
	addLecture,
	updateLecture,
	removeLecture,
	resetFormData,
} = updateCourseSlice.actions;

export default updateCourseSlice.reducer;
