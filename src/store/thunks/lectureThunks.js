import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	uploadImageToCloudinary,
	uploadPDFToCloudinary,
	uploadVideoToCloudinary,
} from "../../api/uploadToCloudinary";
import { axiosInstance } from "../../api/axiosConfig";

const addLecture = createAsyncThunk(
	"lectures/addLecture",
	async (lectureData, { rejectWithValue }) => {
		try {
			console.log(lectureData);
			const uploadedLectures = await Promise.all(
				lectureData.map(async (lecture) => {
					const {
						video,
						video_thumbnail,
						pdf_notes,
						...lectureDetails
					} = lecture;
					let videoUrl = null;
					let thumbnailUrl = null;
					let pdfNoteUrl = null;
					if (video && typeof video !== "string") {
						const videoUploaded = await uploadVideoToCloudinary(
							video,
							{
								public_id_prefix: "lecture_video",
								folder: "lecture_videos",
								transformation: "f_auto",
							}
						);

						if (videoUploaded) videoUrl = videoUploaded.secure_url;
					}

					if (pdf_notes && typeof pdf_notes !== "string") {
						const pdfNoteUploaded = await uploadPDFToCloudinary(
							pdf_notes,
							{
								public_id_prefix: "lecture_notes",
								folder: "lecture_pdf_notes",
							}
						);

						if (pdfNoteUploaded)
							pdfNoteUrl = pdfNoteUploaded.secure_url;
					}

					if (
						video_thumbnail &&
						typeof video_thumbnail !== "string"
					) {
						const thumbnailUploaded = await uploadImageToCloudinary(
							video_thumbnail,
							{
								public_id_prefix: "lecture_thumbnail",
								transformation: "c_fill,w_1280,h_720,q_auto",
								folder: "lecture_thumbnails",
							}
						);

						if (thumbnailUploaded)
							thumbnailUrl = thumbnailUploaded.secure_url;
					}
					const response = await axiosInstance.post("/lectures/new", {
						...lectureDetails,
						video: videoUrl ?? video,
						thumbnail: thumbnailUrl ?? video_thumbnail,
						pdf_notes: pdfNoteUrl ?? pdf_notes,
					});
					return response?.data?.lecture;
				})
			);
			return uploadedLectures;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to add lecture."
			);
		}
	}
);

const updateLectures = createAsyncThunk(
	"lectures/updateLectures",
	async (lecturesData, { rejectWithValue }) => {
		try {
			const updatedLectures = await Promise.all(
				lecturesData.map(async (lecture) => {
					const {
						lecture_id,
						video,
						video_thumbnail,
						pdf_notes,
						...lectureDetails
					} = lecture;

					let videoUrl = null;
					let thumbnailUrl = null;
					let pdfNoteUrl = null;

					if (video && typeof video !== "string") {
						const videoUploaded = await uploadVideoToCloudinary(
							video,
							{
								public_id_prefix: "lecture_video",
								folder: "lecture_videos",
								transformation: "f_auto",
							}
						);
						if (videoUploaded) videoUrl = videoUploaded.secure_url;
					}

					if (pdf_notes && typeof pdf_notes !== "string") {
						const pdfNoteUploaded = await uploadPDFToCloudinary(
							pdf_notes,
							{
								public_id_prefix: "lecture_notes",
								folder: "lecture_pdf_notes",
							}
						);
						if (pdfNoteUploaded)
							pdfNoteUrl = pdfNoteUploaded.secure_url;
					}

					if (
						video_thumbnail &&
						typeof video_thumbnail !== "string"
					) {
						const thumbnailUploaded = await uploadImageToCloudinary(
							video_thumbnail,
							{
								public_id_prefix: "lecture_thumbnail",
								transformation: "c_fill,w_1280,h_720,q_auto",
								folder: "lecture_thumbnails",
							}
						);
						if (thumbnailUploaded)
							thumbnailUrl = thumbnailUploaded.secure_url;
					}

					const response = await axiosInstance.put(
						`/lectures/update/${lecture_id}`,
						{
							...lectureDetails,
							video: videoUrl ?? video,
							video_thumbnail: thumbnailUrl ?? video_thumbnail,
							pdf_notes: pdfNoteUrl ?? pdf_notes,
						}
					);
					console.log(response);

					return response?.data?.lecture;
				})
			);

			return updatedLectures;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to update lectures."
			);
		}
	}
);

const fetchLecturesByCourseId = createAsyncThunk(
	"lectures/fetchLecturesByCourseId",
	async ({ course_id, student_id }, { rejectWithValue }) => {
		// console.log(course_id, student_id)
		try {
			const response = await axiosInstance.get(
				`/lectures/get-by-course_id/${course_id}?student_id=${student_id}`
			);
			// console.log("LECTURE FETCHING:",response)
			return response?.data?.lectures;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to fetch lectures."
			);
		}
	}
);

export { addLecture, updateLectures, fetchLecturesByCourseId };
