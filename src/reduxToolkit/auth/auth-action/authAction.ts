import {
	updateIsAuthState,
	toggleSendingData,
	updateAuthError,
	updateIsAuthDataState,
	toggleShowingModalState,
	resetAuthStateRed,
} from "../auth-slice/authSlice";
import { IAuthData } from "@/DUMMY_DATA/MODEL";
import { signIn } from "next-auth/react";
import { getRawDataAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

export const logInAction =
	(emailInput: string, passwordInput: string) =>
	async (dispatch: any, getState: any) => {
		dispatch(updateAuthError({ authError: "" }));
		dispatch(toggleSendingData({ isSendingData: true }));
		try {
			const result = await signIn("username-login", {
				email: emailInput,
				password: passwordInput,
				redirect: false,
			});

			if (!result?.ok) {
				throw new Error("Invalid Email or password!");
			}
			dispatch(updateIsAuthState({ isAuthenticated: true }));
		} catch (err: any) {
			dispatch(updateAuthError({ authError: err.message }));
			dispatch(toggleSendingData({ isSendingData: false }));
		}
	};
export const authErrorAction =
	(message: string) => async (dispatch: any, getState: any) => {
		dispatch(updateAuthError({ authError: message }));
	};
export const clearErrorAction = () => async (dispatch: any, getState: any) => {
	dispatch(updateAuthError({ authError: "" }));
};

export const authDataAction =
	(data: IAuthData) => async (dispatch: any, getState: any) => {
		await dispatch(updateIsAuthDataState({ authData: data }));
		await dispatch(updateIsAuthState({ isAuthenticated: true }));
		dispatch(getRawDataAction(data.userId, data.apiToken));
	};

export const clearAuthDataAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsAuthDataState({ authData: {} as IAuthData }));
		dispatch(clearErrorAction());
	};

export const toggleSendingDataAction =
	(status: boolean) => async (dispatch: any, getState: any) => {
		dispatch(toggleSendingData({ isSendingData: status }));
	};

export const toggleShowModalAction =
	(status: boolean) => async (dispatch: any, getState: any) => {
		dispatch(toggleShowingModalState({ isShowingModalStatus: status }));
	};
export const logoutAuthAction = () => async (dispatch: any, getState: any) => {
	dispatch(resetAuthStateRed({}));
};
