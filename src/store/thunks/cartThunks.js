import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

const fetchCartItems = createAsyncThunk(
	"cart/fetchCartItems",
	async (user_id, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/cart/get-items/${user_id}`
			);
         console.log(response);
         
			return response?.data?.cart;
		} catch (error) {
			console.log("Fetch cart items error:",error)
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ course_id, user_id }, { rejectWithValue }) => {
		console.log("coursecart",course_id, user_id);
		
		try {
			const response = await axiosInstance.post("/cart/add-item", {
				course_id,
				user_id,
			});
			return response?.data?.cart;
		} catch (error) {
			console.log("Add cart items error:",error)
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async ({ course_id, student_id }, { rejectWithValue }) => {
		try {
         console.log(course_id, student_id);
         
			const response = await axiosInstance.put("/cart/remove-item", {
				course_id, student_id ,
			});
         console.log(response);
         
			return response?.data?.cart;
		} catch (error) {
			console.log("Remove cart items error:",error)
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);


export { fetchCartItems, addToCart, removeFromCart };
