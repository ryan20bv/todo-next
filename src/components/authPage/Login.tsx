import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import LoadingPage from "../ui/LoadingPage";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { authErrorAction } from "@/reduxToolkit/auth/auth-action/authAction";

const Login = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
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
		return <LoadingPage status='Loading...' />;
	}
	const iconFunctionHandler = () => {
		dispatch(authErrorAction(""));
		router.push("/n");
	};

	const toggleLoginState = () => {
		dispatch(authErrorAction(""));
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
				iconFunction={iconFunctionHandler}
			/>
			{isLoggingIn && <LoginForm onToggle={toggleLoginState} />}
			{!isLoggingIn && <SignUpForm onToggle={toggleLoginState} />}
		</Card>
	);
};

export default Login;
