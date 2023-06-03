import React from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { logoutAuthAction } from "@/reduxToolkit/auth/auth-action/authAction";
import { resetPersonalTodoStateAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const MainNav = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: session } = useSession();

	const goToLoginHandler = () => {
		router.push("/login");
	};
	const logOutHandler = () => {
		/* signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });

		dispatch(logoutAuthAction());
		dispatch(resetPersonalTodoStateAction()); */
		// signOut();
		router.push("/t/loggingout");
	};

	const checkProfileHandler = () => {
		router.push("/t/profile");
	};

	return (
		<nav className='py-2 px-4 flex justify-end'>
			{!session && <button onClick={goToLoginHandler}>Login</button>}
			{session && <button onClick={logOutHandler}>Logout</button>}
			{session && <button onClick={checkProfileHandler}>Profile</button>}
		</nav>
	);
};

export default MainNav;
