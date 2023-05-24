import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const AnyPage = () => {
	const router = useRouter();
	const { isAuthenticated, isSendingData, authError, authData } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/t");
			return;
		} else {
			router.replace("/");
		}
	}, [router, isAuthenticated]);

	return <div>404 page</div>;
};

export default AnyPage;
