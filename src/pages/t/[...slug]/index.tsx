import React from "react";
import { useRouter } from "next/router";

const SlugIndex = () => {
	const router = useRouter();
	console.log(router);
	return <div>Slug Index</div>;
};

export default SlugIndex;
