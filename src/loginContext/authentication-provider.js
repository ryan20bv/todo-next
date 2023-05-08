import React, { useState } from "react";
import AuthenticationContext from "./authentication-context";

const AuthenticationProvider = (props) => {
	const [isLogin, setIsLogin] = useState(false);

	const loginHandler = () => {
		setIsLogin(true);
	};
	const logoutHandler = () => {
		setIsLogin(false);
	};
	const authenticationValue = {
		isAuthenticated: isLogin,
		loginHandler: loginHandler,
		logoutHandler: logoutHandler,
	};

	return (
		<AuthenticationContext.Provider value={authenticationValue}>
			{props.children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
