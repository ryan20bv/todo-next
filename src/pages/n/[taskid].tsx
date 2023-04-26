import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import TaskDetail from "@/components/task/TaskDetail";
import { GetStaticProps } from "next";

import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import { ITask } from "@/DUMMY_DATA/MODEL";

const TaskDetails = () => {
	return <TaskDetail />;
};

// export async function getStaticPaths() {
// 	const allTasks = getAllTasks();

// 	return {
// 		paths: [
// 			{ params: { taskid: allTasks[0]._id } },
// 			{ params: { taskid: allTasks[1]._id } },
// 		],
// 		fallback: true, // can also be true or 'blocking'
// 	};
// }

// `getStaticPaths` requires using `getStaticProps`
// export const getStaticProps: GetStaticProps = async (context) => {
// 	const taskid = context.params?.taskid;
// 	const allTasks = getAllTasks();
// 	const indexOfTodo = allTasks.findIndex((todo) => todo._id === taskid);
// 	const selectedTodo = {
// 		todoDetail: allTasks[indexOfTodo],
// 		index: indexOfTodo,
// 	};

// 	return {
// 		// Passed to the page component as props
// 		props: { selectedTodo },
// 	};
// };

export default TaskDetails;
