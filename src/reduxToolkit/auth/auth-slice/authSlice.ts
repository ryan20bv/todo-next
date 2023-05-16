import { createSlice } from "@reduxjs/toolkit";

export type authDataType = {
	userId: string;
	userName: string;
	userEmail: string;
	apiToken: string;
	expires: string;
};

interface IAuthState {
	authError: string;
	isSendingData: boolean;
	isAuthenticated: boolean;
	authData: authDataType;
}

const initialAuthState: IAuthState = {
	authError: "",
	isSendingData: false,
	isAuthenticated: false,
	authData: {} as authDataType,
};

const authSlice = createSlice({
	name: "Auth Slice",
	initialState: initialAuthState,
	reducers: {
		toggleSendingData(state, action) {
			state.isSendingData = action.payload.isSendingData;
		},
		updateIsAuthState(state, action) {
			state.isAuthenticated = action.payload.isAuthenticated;
		},
		updateAuthError(state, action) {
			state.authError = action.payload.authError;
		},
		updateIsAuthDataState(state, action) {
			state.authData = action.payload.authData;
		},
	},
});

export const {
	updateIsAuthState,
	toggleSendingData,
	updateAuthError,
	updateIsAuthDataState,
} = authSlice.actions;
export default authSlice;
