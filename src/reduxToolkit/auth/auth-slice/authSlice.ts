import { createSlice } from "@reduxjs/toolkit";
import { IAuthData } from "@/DUMMY_DATA/MODEL";

// export type authDataType = {
// 	userId: string;
// 	userName: string;
// 	userEmail: string;
// 	apiToken: string;
// 	expires: string;
// };

interface IAuthState {
	authError: string;
	isSendingData: boolean;
	isAuthenticated: boolean;
	authData: IAuthData;
	isShowingModal: boolean;
}

const initialAuthState: IAuthState = {
	authError: "",
	isSendingData: false,
	isAuthenticated: false,
	authData: {} as IAuthData,
	isShowingModal: false,
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
		toggleShowingModalState(state, action) {
			state.isShowingModal = action.payload.isShowingModalStatus;
		},
		resetAuthStateRed(state, action) {
			state.authError = "";
			state.isSendingData = false;
			state.isAuthenticated = false;
			state.authData = {} as IAuthData;
			state.isShowingModal = false;
		},
	},
});

export const {
	updateIsAuthState,
	toggleSendingData,
	updateAuthError,
	updateIsAuthDataState,
	toggleShowingModalState,
	resetAuthStateRed,
} = authSlice.actions;
export default authSlice;
