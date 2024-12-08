import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance }  from "../../api/axiosConfig";

const getStudentDetails = createAsyncThunk(
   "student/getStudentDetails",
   async (student_id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/student/get-student-details/${student_id}`);
         return response?.data?.student;
      } catch (error) {
         return rejectWithValue(error?.response?.data?.message);
      }
   }
);

export { getStudentDetails };