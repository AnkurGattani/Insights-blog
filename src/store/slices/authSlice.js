import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,	// logged in or not
	userData: null,	// user data
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload;
		}, 
		logout: (state) => {
			state.status = false;
			state.userData = null;
		}
	}
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;