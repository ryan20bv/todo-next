import React from "react";
import Home from "@/components/homePage/Home";
import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: IMainTask[];
}

const NotAuthenticatedPage: React.FC<propsType> = ({ allTasks }) => {
	return <Home allTasks={allTasks} />;
};

export async function getStaticProps() {
	const allTodos = getAllTasks();

	return {
		props: { allTasks: allTodos }, // will be passed to the page component as props
	};
}

export default NotAuthenticatedPage;
