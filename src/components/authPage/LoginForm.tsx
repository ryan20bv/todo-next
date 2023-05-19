import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	logInAction,
	authErrorAction,
} from "@/reduxToolkit/auth/auth-action/authAction";

interface propsTypes {
	onToggle: () => void;
}

const LoginForm: React.FC<propsTypes> = ({ onToggle }) => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const Router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const submitLoginFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");

		const enteredEmail = emailInputRef.current?.value;
		const enteredPassword = passwordInputRef.current?.value;

		if (
			!enteredEmail ||
			enteredEmail.trim() === "" ||
			!enteredEmail.includes("@")
		) {
			// setErrorMessage("Invalid email!");
			dispatch(authErrorAction("Invalid email!"));
			return;
		}
		if (
			!enteredPassword ||
			enteredPassword.trim() === "" ||
			enteredPassword.length < 6
		) {
			// console.log("Invalid form");
			// setErrorMessage("Invalid password. Min of 6 characters required!");
			dispatch(authErrorAction("Invalid password. Min of 6 characters required!"));
			return;
		}

		dispatch(logInAction(enteredEmail, enteredPassword));
		// const loginHandler = async () => {
		// 	let result;

		// try {
		// 	result = await signIn("credentials", {
		// 		redirect: false,
		// 		email: enteredEmail,
		// 		password: enteredPassword,
		// 	});
		// 	console.log(result);
		// 	if (!result?.ok) {
		// 		throw new Error("Invalid Email or password!");
		// 	}
		// 	Router.replace("/t");
		// 	setIsLoggingIn(false);
		// } catch (err: any) {
		// 	console.log(err.message);
		// 	setErrorMessage(err.message);
		// 	setIsLoggingIn(false);
		// }
		// };
		// loginHandler();
	};

	const toggleShowPasswordHandler = () => {
		setShowPassword((prevState) => !prevState);
	};

	if (isAuthenticated) {
		Router.replace("/t");
	}
	return (
		<section className='my-8  w-3/4'>
			<form onSubmit={submitLoginFormHandler}>
				<div className='divide-y divide-gray-200'>
					<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
						<div className='relative mb-6'>
							<input
								type='email'
								name='email'
								id='email'
								required
								autoComplete='off'
								ref={emailInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='Email address'
							/>

							<label
								htmlFor='email'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Email Address
							</label>
						</div>
						<div className='relative mb-6 flex items-center'>
							<div>
								<input
									type={showPassword ? "text" : "password"}
									name='password'
									id='password'
									required
									autoComplete='off'
									min={6}
									ref={passwordInputRef}
									className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
									placeholder='Password'
								/>

								<label
									htmlFor='password'
									className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
								>
									Password
								</label>
							</div>
							<div
								className=' h-10 flex items-end pb-2'
								onClick={toggleShowPasswordHandler}
							>
								{showPassword && <EyeIcon className='h-5' />}
								{!showPassword && <EyeSlashIcon className='h-5' />}
							</div>
						</div>
						{authError && authError.trim().length > 0 && (
							<p className='text-red-500 text-xs text-center'>{authError}</p>
						)}
						<div className='flex justify-end '>
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
									<p className='ml-4'>Logging In...</p>
								</button>
							)}
							{!isSendingData && (
								<button className='bg-blue-500 text-white rounded-md px-4 py-1'>
									LOGIN
								</button>
							)}
						</div>
					</div>
				</div>
			</form>
			<div className='flex items-center justify-center  my-4'>
				<hr className='border-2 border-black w-16 ' />
				<p className='mx-6'>OR</p>
				<hr className='border-2 border-black w-16' />
			</div>

			<div className='flex items-center justify-around'>
				<p>Need an account?</p>
				<button onClick={onToggle}>
					<p className='text-red-500 underline'>SIGN UP</p>
				</button>
			</div>
		</section>
	);
};

export default LoginForm;
