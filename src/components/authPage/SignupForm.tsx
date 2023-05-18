import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

interface propsTypes {
	onToggle: () => void;
}

const SignUpForm: React.FC<propsTypes> = ({ onToggle }) => {
	const Router = useRouter();
	const [isDataValid, setIsDataValid] = useState<boolean>(true);
	const fNameInputRef = useRef<HTMLInputElement>(null);
	const lNameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

	const loginHandler = async (emailInput: string, passwordInput: string) => {
		let result;
		try {
			result = await signIn("credentials", {
				redirect: false,
				email: emailInput,
				password: passwordInput,
			});
			console.log(result);
			if (!result?.ok) {
				throw new Error("Invalid Email or password!");
			}
			Router.replace("/t");
			setIsSigningUp(false);
		} catch (err: any) {
			console.log(err.message);
			setIsSigningUp(false);
		}
	};

	const submitSignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDataValid(true);
		setIsSigningUp(true);

		const enteredFName = fNameInputRef.current?.value;
		const enteredLName = lNameInputRef.current?.value;
		const enteredEmail = emailInputRef.current?.value;
		const enteredPassword = passwordInputRef.current?.value;

		if (
			!enteredEmail ||
			enteredEmail.trim() === "" ||
			!enteredEmail.includes("@") ||
			!enteredFName ||
			enteredFName.trim() === "" ||
			!enteredLName ||
			enteredLName.trim() === "" ||
			!enteredPassword ||
			enteredPassword.trim() === "" ||
			enteredPassword.length < 6
		) {
			setIsDataValid(false);
			setIsSigningUp(false);
			return;
		}

		const submitToApi = async () => {
			const inputData = {
				firstName: enteredFName,
				lastName: enteredLName,
				email: enteredEmail,
				password: enteredPassword,
			};
			// console.log(inputData);
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
				console.log(data.newUser);
				if (data.newUser.message === "sign-in success") {
					loginHandler(enteredEmail, enteredPassword);
				}
			} catch (err) {
				console.log(err);
				setIsSigningUp(false);
			}
		};
		submitToApi();
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
								required
								autoComplete='off'
								ref={fNameInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='First Name'
							/>
							<label
								htmlFor='fName'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								First Name
							</label>
						</div>
						<div className='relative mb-6'>
							<input
								type='text'
								name='lName'
								id='lName'
								required
								autoComplete='off'
								ref={lNameInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='Last Name'
							/>
							<label
								htmlFor='lName'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Last Name
							</label>
						</div>
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
						<div className='relative mb-6'>
							<input
								type='password'
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
						{!isDataValid && (
							<p className='text-red-500'>Fill up the form properly!</p>
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
				{/* <div className='flex flex-col'>
					<label htmlFor='fName'>First Name</label>
					<input
						type='text'
						name='fName'
						id='fName'
						required
						autoComplete='off'
						ref={fNameInputRef}
					/>
				</div> */}
				{/* <div className='flex flex-col'>
					<label htmlFor='lName'>Last Name</label>
					<input
						type='text'
						name='lName'
						id='lName'
						required
						autoComplete='off'
						ref={lNameInputRef}
					/>
				</div> */}
				{/* <div className='flex flex-col'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						autoComplete='off'
						ref={emailInputRef}
					/>
				</div> */}
				{/* <div className='flex flex-col'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						required
						autoComplete='off'
						min={6}
						ref={passwordInputRef}
					/>
				</div> */}
				{/* {!isDataValid && <p>Fill up the form properly!</p>}
				<button>SIGN UP</button> */}
			</form>
			{/* <div>
				<p>Already a user?</p>
				<button onClick={onToggle}>LOGIN</button>
			</div> */}

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
