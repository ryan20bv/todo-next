import { Fragment } from "react";
import { useRouter } from "next/router";
import NotAuthenticatedPage from "./n";
import Home from "@/components/homePage/Home";
import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";

import { Roboto } from "next/font/google";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

const HomePage = () => {
	const router = useRouter();

	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.authReducer
	);

	if (!isAuthenticated) {
		router.push("/n");
	} else if (isAuthenticated) {
		router.push("/t");
	}

	return (
		<Card>
			<CardHeader
				title='Loading....'
				from='index_api'
			/>
			<h1>Loading</h1>
		</Card>
	);
};

export default HomePage;
