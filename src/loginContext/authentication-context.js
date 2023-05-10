import { createContext } from "react";

const AuthenticationContext = createContext({
	isAuthenticated: false,
	loginHandler: () => {},
	logoutHandler: () => {},
});

export default AuthenticationContext;
