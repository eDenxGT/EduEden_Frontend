import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { toast } from "sonner";

const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get("/categories/get-all");
			console.log(response);

			return response?.data?.categories;
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

const addCategory = createAsyncThunk(
	"categories/addCategory",
	async (newCategory, { rejectWithValue }) => {
		try {
			console.log(newCategory);

			const response = await axiosInstance.post(
				"/categories/new",
				newCategory
			);
			return response.data.category;
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

const deleteCategory = createAsyncThunk(
	"categories/deleteCategory",
	async (categoryId, { rejectWithValue }) => {
		try {
			await axiosInstance.delete(`/categories/delete/${categoryId}`);
			return categoryId;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const searchCategories = createAsyncThunk(
	"categories/searchCategories",
	async (searchQuery, { rejectWithValue }) => {
		if (!searchQuery) console.log("Search query is required");

		try {
			const response = await axiosInstance.get(
				`/categories/search?query=${searchQuery}`
			);
			return response.data.categories;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to search categories"
			);
		}
	}
);

const updateCategory = createAsyncThunk(
	"categories/updateCategory",
	async (updatedCategory, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`/categories/update/${updatedCategory._id}`,
				updatedCategory
			);
			return response.data.category;
		} catch (error) {
			return rejectWithValue(
				error?.response?.data?.message || "Failed to update category"
			);
		}
	}
);

const categorySlice = createSlice({
	name: "categories",
	initialState: {
		categories: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			//* ====== Fetch Categories ====== *//
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				console.log("Fetched Categories: ", action.payload);
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			//* ====== Add Categories ====== *//
			.addCase(addCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCategory.fulfilled, (state, action) => {
				state.categories.push(action.payload);
				state.loading = false;
				toast.success("Category added successfully!");
			})
			.addCase(addCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error(action.payload || "Failed to add Category");
			})

			//* ====== Delete Categories ====== *//
			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.categories = state.categories.filter(
					(category) => category._id !== action.payload
				);
				toast.success("Category deleted successfully!");
				state.loading = false;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
				toast.error(action.payload || "Failed to delete Category");
			})

			//* ====== Search Categories ====== *//
			.addCase(searchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = Array.isArray(action.payload)
					? action.payload
					: [];
			})
			.addCase(searchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error(action.payload || "Failed to search");
			})

			//* ====== Update Categories ====== *//
			.addCase(updateCategory.pending, (state) => {
				// state.loading = true;
				state.error = null;
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				console.log(action.payload);

				state.loading = false;
				state.categories = state.categories.map((category) =>
					category._id === action.payload._id
						? action.payload
						: category
				);
				toast.success("Category updated successfully!");
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error(action.payload || "Failed to update Category");
			});
	},
});

export default categorySlice.reducer;

export {
	fetchCategories,
	addCategory,
	deleteCategory,
	searchCategories,
	updateCategory,
};
