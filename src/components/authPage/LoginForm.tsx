import React, { useRef } from "react";
import { signIn } from "next-auth/react";

interface propsTypes {
	onToggle: () => void;
}

const LoginForm: React.FC<propsTypes> = ({ onToggle }) => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const submitLoginFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current?.value;
		const enteredPassword = passwordInputRef.current?.value;

		if (
			!enteredEmail ||
			enteredEmail.trim() === "" ||
			!enteredEmail.includes("@") ||
			!enteredPassword ||
			enteredPassword.trim() === "" ||
			enteredPassword.length < 6
		) {
			return;
		}

		const loginHandler = async () => {
			const inputData = {
				email: enteredEmail,
				password: enteredPassword,
			};
			console.log(inputData);
			const result = await signIn("credentials", {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});
			console.log(result);
		};
		loginHandler();
	};

	return (
		<section>
			<form onSubmit={submitLoginFormHandler}>
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

				<button>LOGIN</button>
			</form>

			<h1>OR</h1>
			<div>
				<p>Need an account?</p>
				<button onClick={onToggle}>SIGN UP</button>
			</div>
		</section>
	);
};

export default LoginForm;
