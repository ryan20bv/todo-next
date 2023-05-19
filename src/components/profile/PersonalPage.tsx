import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	clearAuthDataAction,
} from "@/reduxToolkit/auth/auth-action/authAction";

const PersonalPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { data: session, status } = useSession();
	// console.log(session);
	// console.log(status);
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
					userName: data.userData?.fName + data.userData?.lName,
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
	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		router.push("/");
	// 	}
	// }, [isAuthenticated]);

	// useEffect(() => {
	// 	if (session) {
	// 		const newData = {
	// 			userId: session.user?.name?.userData?.id,
	// 			userName:
	// 				session.user?.name?.userData?.fName + session.user?.name?.userData?.lName,
	// 			userEmail: session.user?.name?.userData?.email,
	// 			apiToken: session.user?.name?.token,
	// 			expires: session.expires,
	// 		};
	// 		dispatch(authDataAction(newData));
	// 	}
	// }, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <div>PersonalPage</div>;
};

export default PersonalPage;
