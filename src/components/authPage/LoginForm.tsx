import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { error } from "console";

interface propsTypes {
	onToggle: () => void;
}

const LoginForm: React.FC<propsTypes> = ({ onToggle }) => {
	const Router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
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
			console.log("Invalid form");
			setErrorMessage("Invalid email!");
			return;
		}
		if (
			!enteredPassword ||
			enteredPassword.trim() === "" ||
			enteredPassword.length < 6
		) {
			console.log("Invalid form");
			setErrorMessage("Invalid password. Min of 6 characters required!");
			return;
		}

		const loginHandler = async () => {
			let result;
			try {
				result = await signIn("credentials", {
					redirect: false,
					email: enteredEmail,
					password: enteredPassword,
				});
				console.log(result);
				if (!result?.ok) {
					throw new Error("Invalid Email or password!");
				}
				Router.replace("/t");
			} catch (err: any) {
				console.log(err.message);
				setErrorMessage(err.message);
			}
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
				{errorMessage && errorMessage.trim().length > 0 && <p>{errorMessage}</p>}

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
