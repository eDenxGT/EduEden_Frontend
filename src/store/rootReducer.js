import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import studentReducer from "./slices/studentSlice";
import tutorReducer from "./slices/tutorSlice";
import adminReducer from "./slices/adminSlice";
import publicReducer from "./slices/publicSlice";
import categoryReducer from "./slices/categoriesSlice";
import courseReducer from "./slices/courseSlice";
import lectureReducer from "./slices/lectureSlice";
import newCourseReducer from "./slices/newCourse";
import updateCourseReducer from "./slices/updateCourse";
import cartReducer from "./slices/cartSlice";
import chatReducer from "./slices/chatSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"student",
		"tutor",
		"admin",
		"public",
		// "categories",
		// "courses",
		// "lectures",
		"newCourse",
		"updateCourse",
		// "cart"
	],
};

const rootReducer = combineReducers({
	student: studentReducer,
	tutor: tutorReducer,
	admin: adminReducer,
	public: publicReducer,
	categories: categoryReducer,
	courses: courseReducer,
	lectures: lectureReducer,
	newCourse: newCourseReducer,
	updateCourse: updateCourseReducer,
	cart: cartReducer,
	chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
