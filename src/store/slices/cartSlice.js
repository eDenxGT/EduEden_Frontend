import { createSlice } from "@reduxjs/toolkit";

import {fetchCartItems, addToCart, removeFromCart} from '../thunks/cartThunks'

const initialState = {
   cart: [],
   isLoading: false,
   error: null,
 };
 
 const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
     clearCart(state) {
       state.cart = [] ;
     },
   },
   extraReducers: (builder) => {
     builder
       .addCase(fetchCartItems.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
       .addCase(fetchCartItems.fulfilled, (state, action) => {                  
         state.isLoading = false;
         state.cart = action?.payload?.courses;       
       })
       .addCase(fetchCartItems.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
       })
       .addCase(addToCart.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
       .addCase(addToCart.fulfilled, (state, action) => {         
         state.isLoading = false;
         state.cart = action?.payload?.courses;
       })
       .addCase(addToCart.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
       })
       .addCase(removeFromCart.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
       .addCase(removeFromCart.fulfilled, (state, action) => {
         state.isLoading = false;
         state.cart = action?.payload?.courses;
       })
       .addCase(removeFromCart.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
       })
   },
 });
 
 export const { clearCart } = cartSlice.actions;
 
 export default cartSlice.reducer;
 