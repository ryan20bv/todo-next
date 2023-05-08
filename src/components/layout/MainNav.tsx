import React, { useContext } from "react";
import AuthenticationContext from "@/loginContext/authentication-context";

const MainNav = () => {
	const AuthCtx = useContext(AuthenticationContext);
	const { loginHandler, isAuthenticated, logoutHandler } = AuthCtx;
	const onLoginHandler = () => {
		loginHandler();
	};
	const onLogoutHandler = () => {
		logoutHandler();
	};

	return (
		<nav className='py-2 px-4 flex justify-end'>
			{!isAuthenticated && <button onClick={onLoginHandler}>Login</button>}
			{isAuthenticated && <button onClick={onLogoutHandler}>Logout</button>}
		</nav>
	);
};

export default MainNav;
