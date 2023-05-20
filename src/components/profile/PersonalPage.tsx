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

import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";

const PersonalPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError, authData } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { data: session, status } = useSession();
	const { userId, apiToken } = authData;
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

	useEffect(() => {
		const getAllCategoryByUser = async (userId: string) => {
			console.log(userId);
			let userCategory = [];

			try {
				const url = "http://localhost:5000/api/category/user/" + userId;
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + apiToken,
					},
				};
				const response = await fetch(url, options);
				console.log(response);
				const data = await response.json();
				console.log(data);
			} catch (err) {
				console.log("userCategory", err);
			}
		};

		getAllCategoryByUser(userId);
	}, [userId]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	const title = <h1>Personal Todo</h1>;
	return (
		<Card>
			<CardHeader title={title} />
		</Card>
	);
};

export default PersonalPage;
