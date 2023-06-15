import React, { useEffect, useCallback } from "react";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// imports from redux reducers
import { getRawDataAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

// components import

import MainPage from "@/components/profile/MainPage";

const MainTaskPage = () => {
	const dispatch = useAppDispatch();
	const { authData } = useAppSelector((state: RootState) => state.authReducer);

	const { userId, apiToken } = authData;

	const fetchRawData = useCallback(() => {
		dispatch(getRawDataAction(userId, apiToken));
	}, [dispatch, userId, apiToken]);

	useEffect(() => {
		fetchRawData();
	}, [fetchRawData]);

	return <MainPage />;
};

export default MainTaskPage;
