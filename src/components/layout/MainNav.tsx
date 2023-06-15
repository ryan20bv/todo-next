import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
	ArrowRightOnRectangleIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
const MainNav = () => {
	const router = useRouter();
	const { authData } = useAppSelector((state: RootState) => state.authReducer);

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
			{session && (
				<>
					<p>Hi {authData.userName}</p>
					<button onClick={checkProfileHandler}>
						<UserCircleIcon className='text-blue-600 h-6 mx-1' />
					</button>
					<button onClick={logOutHandler}>
						<ArrowRightOnRectangleIcon className='text-red-600 h-6 mx-1' />
					</button>
				</>
			)}
		</nav>
	);
};

export default MainNav;
