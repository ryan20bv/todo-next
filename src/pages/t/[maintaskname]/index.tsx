import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";

import MainPage from "@/components/profile/MainPage";

const MainTaskPage = () => {
	const router = useRouter();
	// console.log(router);
	return <MainPage />;
};

export default MainTaskPage;
