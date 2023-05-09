import React, { useRef, useState } from "react";
interface propsTypes {
	onToggle: () => void;
}

const SignUpForm: React.FC<propsTypes> = ({ onToggle }) => {
	const [isDataValid, setIsDataValid] = useState<boolean>(true);
	const fNameInputRef = useRef<HTMLInputElement>(null);
	const lNameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const submitSignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
			return;
		}

		const submitToApi = async () => {
			const inputData = {
				firstName: enteredFName,
				lastName: enteredLName,
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
				console.log(data);
			} catch (err) {
				console.log(err);
			}
		};
		submitToApi();
	};
	return (
		<section>
			<form onSubmit={submitSignUpFormHandler}>
				<div className='flex flex-col'>
					<label htmlFor='fName'>First Name</label>
					<input
						type='text'
						name='fName'
						id='fName'
						required
						autoComplete='off'
						ref={fNameInputRef}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='lName'>Last Name</label>
					<input
						type='text'
						name='lName'
						id='lName'
						required
						autoComplete='off'
						ref={lNameInputRef}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						autoComplete='off'
						ref={emailInputRef}
					/>
				</div>
				<div className='flex flex-col'>
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
				</div>
				{!isDataValid && <p>Fill up the form properly!</p>}
				<button>SIGN UP</button>
			</form>
			<div>
				<p>Already a user?</p>
				<button onClick={onToggle}>LOGIN</button>
			</div>
		</section>
	);
};

export default SignUpForm;
