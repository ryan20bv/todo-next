import React, { useEffect } from "react";
import { useRouter } from "next/router";

const AnyPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace("/");
	}, []);

	return <div>404 page</div>;
};

export default AnyPage;