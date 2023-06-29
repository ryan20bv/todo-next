import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import useSanitizeInputHook from "@/customHooks/use-sanitizeInput";
import useSanitizeLoginHook from "@/customHooks/use-sanitizeLogin";

interface propsTypes {
	onToggle: () => void;
}

const SignUpForm: React.FC<propsTypes> = ({ onToggle }) => {
	const Router = useRouter();
	const { stringChangeHandler, removeUnderscoreAndHyphen, validateInput } =
		useSanitizeInputHook("");
	const {
		enteredEmail,
		emailError,
		setEmailError,
		changeInputEmailHandler,
		validateEnteredEmailHandler,
		enteredPassword,
		passwordError,
		setPasswordError,
		changeInputPasswordHandler,
		validateEnteredPasswordHandler,
	} = useSanitizeLoginHook();

	const [isDataValid, setIsDataValid] = useState<boolean>(true);

	const [errorMessage, setErrorMessage] = useState<string>("");

	const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [inputFirstName, setInputFirstName] = useState<string>("");
	const [firstNameError, setFirstNameError] = useState<boolean>(false);
	const [inputLastName, setInputLastName] = useState<string>("");
	const [lastNameError, setLastNameError] = useState<boolean>(false);

	const loginHandler = async (emailInput: string, passwordInput: string) => {
		let result;
		try {
			result = await signIn("username-login", {
				redirect: false,
				email: emailInput,
				password: passwordInput,
			});

			if (!result?.ok) {
				throw new Error("Invalid Email or password!");
			}
			Router.replace("/t");
		} catch (err: any) {
			console.log(err.message);
			setIsSigningUp(false);
		}
	};
	// first name validation
	const inputFirstNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const result = stringChangeHandler(e.currentTarget.value);
		setInputFirstName(result);
	};
	const blurInputFirstNameHandler = () => {
		const cleanedStr = removeUnderscoreAndHyphen(inputFirstName);
		const isInValid = validateInput(cleanedStr);
		setFirstNameError(isInValid);
		setInputFirstName(cleanedStr);
	};

	// last name validation
	const inputLastNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const result = stringChangeHandler(e.currentTarget.value);
		setInputLastName(result);
	};
	const blurInputLastNameHandler = () => {
		const cleanedStr = removeUnderscoreAndHyphen(inputLastName);
		const isInValid = validateInput(cleanedStr);
		setLastNameError(isInValid);
		setInputLastName(cleanedStr);
	};
	// email validation

	const submitSignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDataValid(true);
		setErrorMessage("");

		const isEmailValid = validateEnteredEmailHandler(enteredEmail);

		if (!isEmailValid && enteredEmail.length > 0) {
			setEmailError(true);
		}
		const isPasswordValid = validateEnteredPasswordHandler(enteredPassword);

		if (!isPasswordValid && enteredPassword.length > 0) {
			setPasswordError(true);
		}
		if (!inputFirstName || inputFirstName.trim().length === 0) {
			setFirstNameError(true);
		}
		if (!inputLastName || inputLastName.trim().length === 0) {
			setLastNameError(true);
		}
		if (
			!enteredEmail ||
			enteredEmail.trim() === "" ||
			!enteredEmail.includes("@") ||
			!enteredPassword ||
			enteredPassword.trim() === "" ||
			!inputFirstName ||
			inputFirstName.trim().length === 0 ||
			!inputLastName ||
			inputLastName.trim().length === 0
		) {
			setErrorMessage("Fill up the form properly!");
			setIsDataValid(false);
			setIsSigningUp(false);
			return;
		}

		const isAllDataIsValid: boolean =
			!emailError &&
			!passwordError &&
			!firstNameError &&
			!lastNameError &&
			isDataValid;
		console.log(isAllDataIsValid);
		if (!isAllDataIsValid) {
			return;
		}
		setIsSigningUp(true);

		const submitToApi = async () => {
			const inputData = {
				firstName: inputFirstName,
				lastName: inputLastName,
				email: enteredEmail,
				password: enteredPassword,
			};

			const url = `/api/auth/signup`;
			const options = {
				method: "POST",
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

				if (data.newUser.message === "sign-in success") {
					loginHandler(enteredEmail, enteredPassword);
				}
			} catch (err: any) {
				setErrorMessage(err.message);
				setIsDataValid(false);
				setIsSigningUp(false);
			}
		};
		submitToApi();
	};
	const toggleShowPasswordHandler = () => {
		setShowPassword((prevState) => !prevState);
	};
	return (
		<section className='my-8  w-3/4'>
			<form onSubmit={submitSignUpFormHandler}>
				<div className='divide-y divide-gray-200'>
					<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
						<div className='relative mb-6'>
							<input
								type='text'
								name='fName'
								id='fName'
								// required
								autoComplete='off'
								// ref={fNameInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='First Name'
								value={inputFirstName}
								onChange={inputFirstNameHandler}
								onBlur={blurInputFirstNameHandler}
							/>
							<label
								htmlFor='fName'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								First Name
							</label>
							{firstNameError && (
								<p className='text-red-500 text-xs '>*Enter a valid First Name</p>
							)}
						</div>
						<div className='relative mb-6'>
							<input
								type='text'
								name='lName'
								id='lName'
								// required
								autoComplete='off'
								// ref={lNameInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='Last Name'
								value={inputLastName}
								onChange={inputLastNameHandler}
								onBlur={blurInputLastNameHandler}
							/>
							<label
								htmlFor='lName'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Last Name
							</label>

							{lastNameError && (
								<p className='text-red-500 text-xs '>*Enter a valid Last Name</p>
							)}
						</div>
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
						{!isDataValid && (
							<p className='text-red-500 text-xs text-center'>{errorMessage}</p>
						)}
						<div className='flex justify-end'>
							{isSigningUp && (
								<button className='bg-blue-500 text-white rounded-md px-4 py-1 flex items-center disabled'>
									<div
										className='inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
										role='status'
									>
										<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'></span>
									</div>
									<p className='ml-4'>SIGNING UP...</p>
								</button>
							)}
							{!isSigningUp && (
								<button className='bg-blue-500 text-white rounded-md px-4 py-1'>
									SIGN UP
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
				<p>Already a user?</p>
				<button onClick={onToggle}>
					<p className='text-red-500 underline'>LOGIN</p>
				</button>
			</div>
		</section>
	);
};

export default SignUpForm;
