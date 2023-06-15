import React, { useState, useEffect } from "react";
// import from next
import { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/react";
// import from index store
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// import drom authAction
import {
	authDataAction,
	clearAuthDataAction,
	clearErrorAction,
	authErrorAction,
	toggleSendingDataAction,
	toggleShowModalAction,
} from "@/reduxToolkit/auth/auth-action/authAction";

// import hero icon
import {
	ArrowRightOnRectangleIcon,
	UserCircleIcon,
	KeyIcon,
} from "@heroicons/react/24/outline";

// import components
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import LoadingPage from "../ui/LoadingPage";

const Profile = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isSendingData, authError, authData, isShowingModal } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();
			// console.log(session);
			if (!session) {
				dispatch(clearAuthDataAction());
				router.push("/");
				// window.location.href = "/";
			} else {
				const data: any = session.user?.name;
				const newData = {
					userId: data.userData?.id,
					userName: data.userData?.fName + " " + data.userData?.lName,
					userEmail: data.userData?.email,
					apiToken: data.token,
					expires: session.expires,
				};
				dispatch(authDataAction(newData));
				setIsLoading(false);
			}
		};
		checkForSession();
	}, [dispatch, router]);

	const backArrowHandler = () => {
		router.back();
	};
	const logOutHandler = () => {
		/* signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });

		dispatch(logoutAuthAction());
		dispatch(resetPersonalTodoStateAction()); */
		// signOut();
		router.push("/t/loggingout");
	};

	const changePasswordHandler = () => {
		router.push("/t/profile/change-password");
	};
	if (isLoading) {
		return <LoadingPage status='Loading...' />;
	}

	return (
		<Card>
			<CardHeader
				title='Profile'
				from='profile'
				iconFunction={backArrowHandler}
			/>
			<div className='w-full'>
				<section className='bg-white w-full h-[5rem] relative flex items-center justify-center mb-10'>
					<div className='w-16 h-16 border border-black rounded-full  bg-blue-500 absolute top-[60%] '>
						<div className='text-7xl text-white absolute left-2.5 bottom-0'>
							{authData.userName[0]}
						</div>
					</div>
				</section>
				<div className='flex flex-col items-center w-full '>
					<h1>{authData.userName}</h1>
					<p>{authData.userEmail}</p>
					<div className='m-4'>
						<button onClick={changePasswordHandler}>
							<KeyIcon className='text-blue-600 h-6 mx-4 ' />
						</button>
						<button onClick={logOutHandler}>
							<ArrowRightOnRectangleIcon className='text-red-600 h-6 mx-4' />
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Profile;
