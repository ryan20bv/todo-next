import React, { useEffect } from "react";
import LoadingPage from "@/components/ui/LoadingPage";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { logoutAuthAction } from "@/reduxToolkit/auth/auth-action/authAction";
import { resetPersonalTodoStateAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

const LoggingOut = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });

		dispatch(logoutAuthAction());
		dispatch(resetPersonalTodoStateAction());
	}, [dispatch]);

	return <LoadingPage status='Logging Out...' />;
};

export default LoggingOut;
