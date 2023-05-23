import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Login = () => {
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();

			if (session) {
				window.location.href = "/t";
			} else {
				setIsLoading(false);
			}
		};
		checkForSession();
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const toggleLoginState = () => {
		setIsLoggingIn((prevState) => !prevState);
	};
	let title: string = "LogIn";
	if (!isLoggingIn) {
		title = "Sign up";
	}
	return (
		<Card>
			<CardHeader
				title={title}
				from='login'
			/>
			{isLoggingIn && <LoginForm onToggle={toggleLoginState} />}
			{!isLoggingIn && <SignUpForm onToggle={toggleLoginState} />}
		</Card>
	);
};

export default Login;
