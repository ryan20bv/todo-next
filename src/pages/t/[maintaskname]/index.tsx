import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";

const MainTaskPage = () => {
	const router = useRouter();
	console.log(router);
	return (
		<Card>
			<CardHeader
				title='MainTaskPage'
				from='index'
			/>
			<p>Loading</p>
		</Card>
	);
};

export default MainTaskPage;
