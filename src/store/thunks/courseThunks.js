import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { uploadImageToCloudinary } from "../../api/uploadToCloudinary";
import { toast } from "sonner";

const addCourse = createAsyncThunk(
	"courses/addCourse",
	async (courseData, { rejectWithValue }) => {
		try {
			const { course_thumbnail, ...courseDetails } = courseData;
			console.log("Course details", courseDetails);

			let thumbnailUrl = null;

			if (course_thumbnail && typeof course_thumbnail !== "string") {
				const imageUploaded = await uploadImageToCloudinary(
					course_thumbnail,
					{
						public_id_prefix: "course_thumbnail",
						transformation: "q_auto",
						folder: "course_thumbnails",
					}
				);

				if (imageUploaded) {
					// toast.success("Course Thumbnail uploaded to cloudinary");
					thumbnailUrl = imageUploaded.secure_url;
				}
			}

			const response = await axiosInstance.post("/courses/new", {
				...courseDetails,
				course_thumbnail: thumbnailUrl ?? course_thumbnail,
			});

			return response?.data?.course;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to add course."
			);
		}
	}
);



const fetchCoursesByStudentId = createAsyncThunk(
	"courses/fetchCoursesByStudentId",
	async (user_id, { rejectWithValue }) => {
		try {
			console.log(user_id);
			const response = await axiosInstance.get(
				`/courses/student/my-courses/${user_id}`
			);

			return response?.data?.courses;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch courses."
			);
		}
	}
);

const fetchCourses = createAsyncThunk(
	"courses/fetchCourses",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get("/courses/get-all");
			return response?.data?.courses;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch courses."
			);
		}
	}
);

const fetchCoursesByCourseId = createAsyncThunk(
	"courses/fetchCoursesByCourseId",
	async ({course_id, role}, { rejectWithValue }) => {
		console.log(course_id);

		try {
			const response = await axiosInstance.get(
				`/courses/get/${course_id}?role=${role}`
			);
			return response?.data?.course;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch course."
			);
		}
	}
);

const updateCourse = createAsyncThunk(
	"courses/updateCourse",
	async (updatedCourse, { rejectWithValue }) => {
		try {
			const { course_thumbnail, ...courseDetails } = updatedCourse;
			console.log("Course details", courseDetails);

			let thumbnailUrl = null;

			if (course_thumbnail && typeof course_thumbnail !== "string") {
				const imageUploaded = await uploadImageToCloudinary(
					course_thumbnail,
					{
						public_id_prefix: "course_thumbnail",
						transformation: "c_fill,w_1280,h_720,q_auto",
						folder: "course_thumbnails",
					}
				);

				if (imageUploaded) {
					toast.success("Course Thumbnail uploaded to cloudinary");
					thumbnailUrl = imageUploaded?.secure_url;
				}
			}
			const response = await axiosInstance.put(
				`/courses/update/${updatedCourse.course_id}`,
				{
					...courseDetails,
					course_thumbnail: thumbnailUrl ?? course_thumbnail,
				}
			);
			return response?.data?.course;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to update course."
			);
		}
	}
);

const handleCourseStatus = createAsyncThunk(
	"courses/handleCourseStatus",
	async (course_id, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`/courses/status/${course_id}`
			);
			return response?.data?.course;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to update course."
			);
		}
	}
);

const fetchCourseProgressByStudentId = createAsyncThunk(
	"courses/fetchCourseProgressByStudentId",
	async ({ student_id, course_id }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/courses/get-progress/${student_id}/${course_id}`
			);
			return response?.data?.courseProgress;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch course."
			);
		}
	}
);

const updateCourseProgressByStudentId = createAsyncThunk(
	"courses/updateCourseProgressByStudentId",
	async (
		{ course_id, student_id, lecture_id, status },
		{ rejectWithValue }
	) => {
		console.log(lecture_id)
		try {
			const response = await axiosInstance.put(
				"/courses/update-course-progress",
				{
					course_id,
					student_id,
					lecture_id,
					status,
				}
			);
			console.log("RESPOSNE:",response)
			if (response?.data?.quiz) return response?.data
			return response?.data?.progress;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to UpdateCourse Progress"
			);
		}
	}
);

const fetchCourseQuizByQuizId = createAsyncThunk(
	"courses/fetchCourseQuizByQuizId",
	async (quiz_id, { rejectWithValue }) => {
		try {
			console.log(quiz_id)
			const response = await axiosInstance.get(
				`/quizzes/get/${quiz_id}`
			);
			console.log(response)
			return response?.data;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch course."
			);
		}
	}
);

export {
	addCourse,
	fetchCourses,
	fetchCoursesByCourseId,
	updateCourse,
	handleCourseStatus,
	fetchCoursesByStudentId,
	fetchCourseProgressByStudentId,
	updateCourseProgressByStudentId,
	fetchCourseQuizByQuizId
};
