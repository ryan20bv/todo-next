import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { getSession, useSession, signOut } from "next-auth/react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	logoutAuthAction,
} from "@/reduxToolkit/auth/auth-action/authAction";
import { getRawDataAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";
import LoadingPage from "@/components/ui/LoadingPage";

const Index = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError, authData } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const { rawData, currentCategory } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();
			// console.log(session);
			if (!session) {
				dispatch(logoutAuthAction());
				router.push("/n");
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
			}
		};
		checkForSession();
	}, [dispatch, router]);

	useEffect(() => {
		if (isAuthenticated) {
			if (Object.keys(authData).length !== 0) {
				const { userId, apiToken } = authData;
				dispatch(getRawDataAction(userId, apiToken));
			}
		}
	}, [dispatch, isAuthenticated, authData]);

	// return <PersonalPage />;
	if (Object.keys(currentCategory).length !== 0) {
		let str = currentCategory.categoryName;
		str = str.replace(/\s+/g, "-").toLowerCase();
		router.push(`/t/${str}`);
	}
	return <LoadingPage />;
};

export default Index;
