import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import PersonalPage from "@/components/profile/PersonalPage";

const MainTaskPage = () => {
	const router = useRouter();
	console.log(router);
	return <PersonalPage />;
};

export default MainTaskPage;
