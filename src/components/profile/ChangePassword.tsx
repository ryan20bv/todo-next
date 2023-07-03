import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	clearAuthDataAction,
	clearErrorAction,
	authErrorAction,
	toggleSendingDataAction,
	toggleShowModalAction,
} from "@/reduxToolkit/auth/auth-action/authAction";

import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import Modal from "../ui/Modal";
import LoadingPage from "../ui/LoadingPage";

import useSanitizeLoginHook from "@/customHooks/use-sanitizeLogin";
const ChangePasswordPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { isSendingData, authError, authData, isShowingModal } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const currPassInputRef = useRef<HTMLInputElement>(null)!;
	const newPassInputRef = useRef<HTMLInputElement>(null);
	const confPassInputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [authMessage, setAuthMessage] = useState<string>("");
	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	// current
	const [currHasError, setCurrHasError] = useState<boolean>(false);
	const [newHasError, setNewHasError] = useState<boolean>(false);
	const [conHasError, setConHasError] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<{
		status: boolean;
		errorMessage: string;
	}>({ status: false, errorMessage: "" });

	const { handlerInputPassword } = useSanitizeLoginHook();

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();
			dispatch(toggleSendingDataAction(false));
			dispatch(clearErrorAction());
			// console.log(session);
			if (!session) {
				dispatch(clearAuthDataAction());
				router.push("/");
				// window.location.href = "/";
			} else {
				const data: any = session.user?.name;
				const newData = {
					userId: data.userData?.id,
					userName: data.userData?.fName + " " + data.userData?.lName,
					userEmail: data.userData?.email,
					apiToken: data.token,
					expires: session.expires,
				};

				dispatch(authDataAction(newData));
				setIsLoading(false);
			}
		};
		checkForSession();
	}, [dispatch, router]);

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const { value, id } = e.currentTarget;

		if (id === "current") {
			const validatedValue = handlerInputPassword(value);
			if (!currPassInputRef.current) {
				return;
			}
			setCurrHasError(false);
			currPassInputRef.current.value = validatedValue;
		} else if (id === "new") {
			const validatedValue = handlerInputPassword(value);
			if (!newPassInputRef.current) {
				return;
			}
			setNewHasError(false);

			newPassInputRef.current.value = validatedValue;
		} else if (id === "confirm") {
			setConHasError(false);
			const validatedValue = handlerInputPassword(value);
			if (!confPassInputRef.current) {
				return;
			}

			confPassInputRef.current.value = validatedValue;
		}
	};

	const submitNewPasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(clearErrorAction());
		setGeneralError({
			status: false,
			errorMessage: "",
		});

		const enteredCurrPassword = currPassInputRef.current?.value;
		const enteredNewPassword = newPassInputRef.current?.value;
		const enteredConfPassword = confPassInputRef.current?.value;

		if (
			(!enteredCurrPassword || enteredCurrPassword.trim().length === 0) &&
			(!enteredNewPassword || enteredNewPassword.trim().length === 0) &&
			(!enteredConfPassword || enteredConfPassword.trim().length === 0)
		) {
			setGeneralError({
				status: true,
				errorMessage: "Password should be min of 6 characters!",
			});

			return;
		}

		if (
			!enteredCurrPassword ||
			enteredCurrPassword.trim().length === 0 ||
			enteredCurrPassword.length < 6
		) {
			setCurrHasError(true);
		}
		if (
			!enteredNewPassword ||
			enteredNewPassword.trim().length === 0 ||
			enteredNewPassword.length < 6
		) {
			setNewHasError(true);
		}
		if (
			!enteredConfPassword ||
			enteredConfPassword.trim().length === 0 ||
			enteredConfPassword.length < 6
		) {
			setConHasError(true);
		}

		if (enteredCurrPassword?.trim() === enteredNewPassword?.trim()) {
			setGeneralError({
				status: true,
				errorMessage: "Current and new Password should not be the same!",
			});

			return;
		}

		if (enteredNewPassword?.trim() !== enteredConfPassword?.trim()) {
			setGeneralError({
				status: true,
				errorMessage: "New and confirm password does not match!",
			});

			return;
		}
		let noError: boolean = false;
		noError = !currHasError && !newHasError && !conHasError;

		if (!noError) {
			return;
		}
		dispatch(toggleSendingDataAction(true));

		const { userId, userEmail, apiToken } = authData;

		const submitToApi = async () => {
			const inputData = {
				userInfo: {
					user_id: userId,
					email: userEmail,
					password: enteredCurrPassword,
					newPassword: enteredNewPassword,
				},
				token: apiToken,
			};

			const url = `/api/auth/changePassword`;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputData),
			};
			try {
				const response = await fetch(url, options);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || "Something went wrong!");
				}
				console.log("data", data);
				setAuthMessage(data.message);
				dispatch(toggleShowModalAction(true));
			} catch (err: any) {
				dispatch(authErrorAction(err.message));
			}
			dispatch(toggleSendingDataAction(false));
		};
		submitToApi();
	};

	const closeModalHandler = () => {
		setAuthMessage("");
		dispatch(toggleShowModalAction(false));
	};
	const confirmModalHandler = () => {
		signOut({ callbackUrl: "http://localhost:3000/login" });
	};

	const toggleShowPasswordHandler = (identifier: string) => {
		if (identifier === "curr") {
			setShowCurrentPassword((prevState) => !prevState);
		} else if (identifier === "new") {
			setShowNewPassword((prevState) => !prevState);
		} else if (identifier === "conf") {
			setShowConfirmPassword((prevState) => !prevState);
		}
	};

	const backArrowHandler = () => {
		router.back();
	};

	if (isLoading) {
		return <LoadingPage status='Loading...' />;
	}

	return (
		<Card>
			<CardHeader
				title='Profile'
				from='profile'
				iconFunction={backArrowHandler}
			/>
			<section className='my-8  w-3/4'>
				<form onSubmit={submitNewPasswordHandler}>
					<div className='divide-y divide-gray-200'>
						<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
							<div className='relative mb-6 flex items-center'>
								<div>
									<input
										type={showCurrentPassword ? "text" : "password"}
										name='current'
										id='current'
										// required
										autoComplete='off'
										min={6}
										ref={currPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='	Current Password'
										onInput={handleInput}
									/>
									<label
										htmlFor='current'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										Current Password
									</label>
									{currHasError && (
										<p className='text-red-500 text-xs '>*Min 6 characters</p>
									)}
								</div>
								<div
									className=' h-10 flex items-end pb-2'
									onClick={() => toggleShowPasswordHandler("curr")}
								>
									{showCurrentPassword && <EyeIcon className='h-5' />}
									{!showCurrentPassword && <EyeSlashIcon className='h-5' />}
								</div>
							</div>
							<div className='relative mb-6 flex items-center'>
								<div>
									<input
										type={showNewPassword ? "text" : "password"}
										name='new'
										id='new'
										// required
										autoComplete='off'
										min={6}
										ref={newPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='New Password'
										onInput={handleInput}
									/>
									<label
										htmlFor='new'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										New Password
									</label>
									{newHasError && (
										<p className='text-red-500 text-xs '>*Min 6 characters</p>
									)}
								</div>
								<div
									className=' h-10 flex items-end pb-2'
									onClick={() => toggleShowPasswordHandler("new")}
								>
									{showNewPassword && <EyeIcon className='h-5' />}
									{!showNewPassword && <EyeSlashIcon className='h-5' />}
								</div>
							</div>
							<div className='relative mb-6 flex items-center'>
								<div>
									<input
										type={showConfirmPassword ? "text" : "password"}
										name='confirm'
										id='confirm'
										// required
										autoComplete='off'
										min={6}
										ref={confPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='Confirm Password'
										onInput={handleInput}
									/>
									<label
										htmlFor='confirm'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										Confirm Password
									</label>
									{conHasError && (
										<p className='text-red-500 text-xs '>*Min 6 characters</p>
									)}
								</div>
								<div
									className=' h-10 flex items-end pb-2'
									onClick={() => toggleShowPasswordHandler("conf")}
								>
									{showConfirmPassword && <EyeIcon className='h-5' />}
									{!showConfirmPassword && <EyeSlashIcon className='h-5' />}
								</div>
							</div>

							{generalError.status && (
								<p className='text-red-500 text-xs text-center'>
									{generalError.errorMessage}
								</p>
							)}
							{authError && authError.trim().length > 0 && (
								<p className='text-red-500 text-xs text-center'>{authError}</p>
							)}

							<div className='flex justify-end'>
								{isSendingData && (
									<button
										className='bg-blue-500 text-white rounded-md px-4 py-1 flex items-center '
										disabled
									>
										<div
											className='inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
											role='status'
										>
											<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'></span>
										</div>
										<p className='ml-4'>Sending Data...</p>
									</button>
								)}
								{!isSendingData && (
									<button className='bg-blue-500 text-white rounded-md px-4 py-1 '>
										SUBMIT
									</button>
								)}
							</div>
						</div>
					</div>
				</form>
			</section>
			{isShowingModal && (
				<Modal
					message={authMessage}
					onCloseModal={closeModalHandler}
					onConfirm={confirmModalHandler}
				/>
			)}
		</Card>
	);
};

export default ChangePasswordPage;
