import {
	updateIsAuthState,
	toggleSendingData,
	updateAuthError,
	updateIsAuthDataState,
	toggleShowingModalState,
} from "../auth-slice/authSlice";
import { authDataType } from "../auth-slice/authSlice";
import { signIn } from "next-auth/react";

export const logInAction =
	(emailInput: string, passwordInput: string) =>
	async (dispatch: any, getState: any) => {
		dispatch(updateAuthError({ authError: "" }));
		dispatch(toggleSendingData({ isSendingData: true }));
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email: emailInput,
				password: passwordInput,
			});
			console.log(emailInput, passwordInput);
			console.log(result);
			if (!result?.ok) {
				throw new Error("Invalid Email or password!");
			}
			dispatch(updateIsAuthState({ isAuthenticated: true }));
			dispatch(toggleSendingData({ isSendingData: false }));
			// Router.replace("/t");
			// setIsLoggingIn(false);
		} catch (err: any) {
			console.log(err.message);
			// setErrorMessage(err.message);
			// setIsLoggingIn(false);
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
	(data: authDataType) => async (dispatch: any, getState: any) => {
		// console.log(data);
		dispatch(updateIsAuthDataState({ authData: data }));
		dispatch(updateIsAuthState({ isAuthenticated: true }));
	};

export const clearAuthDataAction =
	() => async (dispatch: any, getState: any) => {
		// console.log(data);
		dispatch(updateIsAuthDataState({ authData: {} as authDataType }));
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
