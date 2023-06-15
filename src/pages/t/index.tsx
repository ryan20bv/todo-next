import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getSession } from "next-auth/react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	logoutAuthAction,
} from "@/reduxToolkit/auth/auth-action/authAction";
import { IAuthData } from "@/DUMMY_DATA/MODEL";

import LoadingPage from "@/components/ui/LoadingPage";

const Index = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

	const { currentCategory } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();

			if (!session) {
				dispatch(logoutAuthAction());
				router.push("/n");
				// window.location.href = "/";
			} else {
				const data: any = session.user?.name;
				const newData: IAuthData = {
					userId: data.userData?.id,
					userName: data.userData?.fName + " " + data.userData?.lName,
					userEmail: data.userData?.email,
					apiToken: data.token,
					expires: session.expires,
				};
				await dispatch(authDataAction(newData));

				setIsFetchingData(false);
			}
		};
		checkForSession();
	}, [dispatch, router]);

	if (!isFetchingData) {
		if (Object.keys(currentCategory).length !== 0) {
			let str = currentCategory.categoryName;
			str = str.replace(/\s+/g, "-").toLowerCase();
			router.push(`/t/${str}`);
		}
	}

	return <LoadingPage status='Loading...' />;
};

export default Index;
