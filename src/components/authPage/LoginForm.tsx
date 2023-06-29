import React, { useRef, useState } from "react";

import { useRouter } from "next/router";

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

	// const emailInputRef = useRef<HTMLInputElement>(null);
	// const passwordInputRef = useRef<HTMLInputElement>(null);

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [enteredEmail, setEnteredEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<boolean>(false);
	const [enteredPassword, setEnteredPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<boolean>(false);

	const changeInputEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailError(false);
		const enteredValue = e.currentTarget.value.trim();

		const regex = /^[-_=]+|[^a-zA-Z0-9@.]+$/;

		const trimmedValue = enteredValue.trimStart().replace(regex, "");
		setEnteredEmail(trimmedValue.trim());
	};

	const changeInputPasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setPasswordError(false);
		let enteredValue = e.currentTarget.value.trim();
		let valueLength = enteredValue.length;

		if (valueLength > 1 && enteredValue[valueLength - 1] === ".") {
			enteredValue = enteredValue.slice(0, enteredValue.length - 1);
		}

		const regex = /^[-_=]|[^.a-zA-Z0-9]+$/;

		const trimmedValue = enteredValue.trimStart().replace(regex, "");

		setEnteredPassword(trimmedValue.trim());
	};

	const validateEnteredPasswordHandler = (inputPassword: string) => {
		const isValidPassword = (input: string): boolean => {
			const validPasswordRegex = /^(?=.*[a-zA-Z0-9])(?=[^.]*\.?[^.]*$).{6,}$/;
			return validPasswordRegex.test(input);
		};
		const isPasswordValid = isValidPassword(inputPassword);

		if (!isPasswordValid) {
			setPasswordError(true);
		}
		return isPasswordValid;
	};

	const validateEnteredEmailHandler = (inputEmail: string) => {
		const isValidEmail = (input: string): boolean => {
			const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			return validEmailRegex.test(input);
		};
		const isEmailValid = isValidEmail(inputEmail);

		return isEmailValid;
	};

	const submitLoginFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isEmailValid = validateEnteredEmailHandler(enteredEmail);

		if (!isEmailValid) {
			setEmailError(true);
		}
		const isPasswordValid = validateEnteredPasswordHandler(enteredPassword);

		if (!isPasswordValid) {
			setPasswordError(true);
		}

		const inputAreValid: boolean = isEmailValid && isPasswordValid;

		if (!inputAreValid) {
			return;
		}
		dispatch(logInAction(enteredEmail, enteredPassword));
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
								type='text'
								name='email'
								id='email'
								// required
								autoComplete='off'
								// ref={emailInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='Email address'
								value={enteredEmail}
								onBlur={() => validateEnteredEmailHandler(enteredEmail)}
								onChange={changeInputEmailHandler}
							/>

							<label
								htmlFor='email'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Email Address
							</label>
							{emailError && (
								<p className='text-red-500 text-xs '>*Enter a valid Email address</p>
							)}
						</div>
						<div className='relative mb-6 flex items-center'>
							<div>
								<input
									type={showPassword ? "text" : "password"}
									name='password'
									id='password'
									// required
									autoComplete='off'
									min={6}
									// ref={passwordInputRef}
									className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
									placeholder='Password'
									value={enteredPassword}
									onChange={changeInputPasswordHandler}
								/>

								<label
									htmlFor='password'
									className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
								>
									Password
								</label>
								{passwordError && (
									<p className='text-red-500 text-xs '>*Min 6 characters</p>
								)}
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
