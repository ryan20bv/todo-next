import { Fragment } from "react";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import Home from "@/components/homePage/Home";
import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import { ITask } from "@/DUMMY_DATA/MODEL";

import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

interface propsType {
	allTasks: ITask[];
}

const HomePage: React.FC<propsType> = ({ allTasks }) => {
	return (
		<Fragment>
			<Home allTasks={allTasks} />
		</Fragment>
	);
};

export async function getStaticProps(context) {
	const allTodos = getAllTasks();
	return {
		props: { allTasks: allTodos }, // will be passed to the page component as props
	};
}

export default HomePage;
