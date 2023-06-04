import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// imports from redux reducers
import { getRawDataAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

// components import
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import MainPage from "@/components/profile/MainPage";

const MainTaskPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError, authData } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	// console.log(authData);
	const { userId, apiToken } = authData;

	const fetchRawData = useCallback(() => {
		dispatch(getRawDataAction(userId, apiToken));
	}, []);
	/* const entries = performance.getEntriesByType(
		"navigation"
	) as PerformanceNavigationTiming[];
	const windowStatus = entries.map((nav) => nav.type);

	useEffect(() => {
		if (windowStatus[0] === "reload") {
			console.log("fetching");
			fetchRawData();
		}
	}, [windowStatus, fetchRawData]); */

	useEffect(() => {
		fetchRawData();
	}, [fetchRawData]);

	return <MainPage />;
};

export default MainTaskPage;
