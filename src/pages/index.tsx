import { Fragment } from "react";
import Home from "@/components/homePage/Home";
import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

interface propsType {
	allTasks: IMainTask[];
}

const HomePage: React.FC<propsType> = ({ allTasks }) => {
	return (
		<Fragment>
			<Home allTasks={allTasks} />
		</Fragment>
	);
};

export async function getStaticProps() {
	const allTodos = getAllTasks();

	return {
		props: { allTasks: allTodos }, // will be passed to the page component as props
	};
}

export default HomePage;
