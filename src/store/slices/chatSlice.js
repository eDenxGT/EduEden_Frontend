import { createSlice } from "@reduxjs/toolkit";
import {
	fetchChatsByUserId,
	fetchMessagesByChatId,
	getStudentsByTutorId,
	createNewChat,
	getTutorsByStudentId
} from "../thunks/chatThunks";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chats: [],
		activeChat: null,
		messages: [],
		availableUsersToChat: [],
		status: "idle",
		error: null,
	},
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		setActiveChat: (state, action) => {
			state.activeChat = action.payload;
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
			.addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.messages = action.payload;
			})
			.addCase(createNewChat.fulfilled, (state, action) => {
				state.activeChat = action.payload;
			})
			.addCase(getStudentsByTutorId.fulfilled, (state, action) => {
				state.availableUsersToChat = action.payload;
			})
			.addCase(getTutorsByStudentId.fulfilled, (state, action) => {
				state.availableUsersToChat = action.payload;
			})
	},
});

export const { addMessage, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
