import React, { useState } from "react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Login = () => {
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

	const toggleLoginState = () => {
		setIsLoggingIn((prevState) => !prevState);
	};
	let title = <h1>LogIn</h1>;
	if (!isLoggingIn) {
		title = <h1>Sign up</h1>;
	}
	return (
		<Card>
			<CardHeader title={title} />
			{isLoggingIn && <LoginForm onToggle={toggleLoginState} />}
			{!isLoggingIn && <SignUpForm onToggle={toggleLoginState} />}
		</Card>
	);
};

export default Login;
