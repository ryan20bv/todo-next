import { useState } from "react";

const useSanitizeLoginHook = () => {
	const [enteredEmail, setEnteredEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<boolean>(false);
	const [enteredPassword, setEnteredPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const changeInputEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailError(false);
		const enteredValue = e.currentTarget.value.trim().toLowerCase();

		const regex = /^[-_=]+|[^a-zA-Z0-9@.]+$/;
		const trimmedValue = enteredValue.trimStart().replace(regex, "");
		setEnteredEmail(trimmedValue.trim());
	};
	const validateEnteredEmailHandler = (inputEmail: string) => {
		const isValidEmail = (input: string): boolean => {
			const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			return validEmailRegex.test(input);
		};
		const isEmailValid = isValidEmail(inputEmail);

		return isEmailValid;
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
		return isPasswordValid;
	};
	return {
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
	};
};

export default useSanitizeLoginHook;
