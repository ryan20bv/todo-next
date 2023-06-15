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
const ChangePasswordPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isSendingData, authError, authData, isShowingModal } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const currPassInputRef = useRef<HTMLInputElement>(null);
	const newPassInputRef = useRef<HTMLInputElement>(null);
	const confPassInputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
	const [isDataValid, setIsDataValid] = useState<boolean>(true);
	const [authMessage, setAuthMessage] = useState<string>("");
	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();
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

	const submitNewPasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDataValid(true);
		setIsSigningUp(true);
		dispatch(clearErrorAction());
		dispatch(toggleSendingDataAction(true));

		const enteredCurrPassword = currPassInputRef.current?.value;
		const enteredNewPassword = newPassInputRef.current?.value;
		const enteredConfPassword = confPassInputRef.current?.value;
		// console.log(enteredNewPassword, enteredConfPassword);

		if (
			!enteredCurrPassword ||
			enteredCurrPassword.trim() === "" ||
			enteredCurrPassword.length < 6 ||
			!enteredNewPassword ||
			enteredNewPassword.trim() === "" ||
			enteredNewPassword.length < 6 ||
			!enteredConfPassword ||
			enteredConfPassword.trim() === "" ||
			enteredConfPassword.length < 6
		) {
			dispatch(authErrorAction("Password should be min of 6 characters!"));
			// setIsSigningUp(false);
			dispatch(toggleSendingDataAction(false));
			return;
		}
		if (enteredCurrPassword.trim() === enteredNewPassword.trim()) {
			dispatch(
				authErrorAction("Current and new Password should not be the same!")
			);
			// setIsSigningUp(false);
			dispatch(toggleSendingDataAction(false));
			return;
		}

		if (enteredNewPassword.trim() !== enteredConfPassword.trim()) {
			dispatch(authErrorAction("New and confirm password does not match!"));
			// setIsSigningUp(false);
			dispatch(toggleSendingDataAction(false));
			return;
		}
		// console.log(authData);
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
			// console.log(inputData);
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
				// console.log(response);
				if (!response.ok) {
					// console.log("here");
					// console.log(data);
					throw new Error(data.message || "Something went wrong!");
				}
				console.log("data", data);
				setAuthMessage(data.message);
				dispatch(toggleShowModalAction(true));
			} catch (err: any) {
				// console.log("ERR", err.message);
				dispatch(authErrorAction(err.message));
				// setIsSigningUp(false);
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
										name='currentpassword'
										id='currentpassword'
										required
										autoComplete='off'
										min={6}
										ref={currPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='	Current Password'
									/>
									<label
										htmlFor='currentpassword'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										Current Password
									</label>
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
										name='newpassword'
										id='newpassword'
										required
										autoComplete='off'
										min={6}
										ref={newPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='New Password'
									/>
									<label
										htmlFor='newpassword'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										New Password
									</label>
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
										name='confirmpassword'
										id='confirmpassword'
										required
										autoComplete='off'
										min={6}
										ref={confPassInputRef}
										className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
										placeholder='Confirm Password'
									/>
									<label
										htmlFor='confirmpassword'
										className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
									>
										Confirm Password
									</label>
								</div>
								<div
									className=' h-10 flex items-end pb-2'
									onClick={() => toggleShowPasswordHandler("conf")}
								>
									{showConfirmPassword && <EyeIcon className='h-5' />}
									{!showConfirmPassword && <EyeSlashIcon className='h-5' />}
								</div>
							</div>
							{authError && authError.trim().length > 0 && (
								<p className='text-red-500 text-xs text-center'>{authError}</p>
							)}
							{/* {!isDataValid && (
								<p className='text-red-500'>Fill up the form properly!</p>
							)} */}
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
			{/* <Notification message={authMessage} /> */}
		</Card>
	);
};

export default ChangePasswordPage;
