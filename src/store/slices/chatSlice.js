import { createSlice } from "@reduxjs/toolkit";
import {
	fetchChatsByUserId,
	fetchMessagesByChatId,
	getStudentsByTutorId,
	createNewChat,
} from "../thunks/chatThunks";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chats: [],
		activeChat: null,
		messages: [],
		students: [],
		status: "idle",
		error: null,
	},
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChatsByUserId.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchChatsByUserId.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.chats = action.payload;
			})
			.addCase(fetchChatsByUserId.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(fetchMessagesByChatId.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.messages = action.payload.messages;
			})
			.addCase(fetchMessagesByChatId.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(createNewChat.fulfilled, (state, action) => {
				state.activeChat = action.payload._id;
			})
			.addCase(getStudentsByTutorId.fulfilled, (state, action) => {
				state.students = action.payload;
			});
	},
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
