import React from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const MainNav = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const goToLoginHandler = () => {
		router.push("/login");
	};
	const logOutHandler = () => {
		signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });
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
