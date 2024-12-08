import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

const fetchMessagesByChatId = createAsyncThunk(
	"chat/fetchMessagesByChatId",
	async (chatId, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/chats/get-messages/${chatId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "An error occurred");
		}
	}
);

const fetchChatsByUserId = createAsyncThunk(
	"chat/fetchChatsByUserId",
	async ({user_id, role}, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/chats/get-chats/${user_id}?role=${role}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "An error occurred");
		}
	}
);

const getStudentsByTutorId = createAsyncThunk(
  "chat/getStudentsByTutorId",
  async (tutor_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chats/get-students/${tutor_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
)



const createNewChat = createAsyncThunk(
	"chat/createNewChat",
	async (newChatDetails, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(
				`/chats/create-chat`,
				newChatDetails
			);
			console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "An error occurred");
		}
	}
);


export { fetchMessagesByChatId, fetchChatsByUserId, createNewChat, getStudentsByTutorId };
