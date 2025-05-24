import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  course_id:
    "course" +
    Date.now() +
    Math.floor(Math.random() * 100000 + Date.now() + 900000),
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
};

const newCourseSlice = createSlice({
  name: "newCourse",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    addLecture: (state, action) => {
      const { title, description, duration, pdf_notes } = action.payload;
      const newLecture = {
        _id: "lecture" + nanoid(10),
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
      console.log(action.payload, updatedData);
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
    },

    resetFormData: () => {
      return initialState;
    },
  },
});

export const {
  updateFormData,
  addLecture,
  updateLecture,
  removeLecture,
  resetFormData,
} = newCourseSlice.actions;

export default newCourseSlice.reducer;
