import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import TaskDetail from "@/components/task/TaskDetail";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { updateStateAfterRefreshFirstLoadAction } from "@/reduxToolkit/todo/todo-action/todoAction";

import { GetStaticProps } from "next";

import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

const TaskDetails = () => {
	const dispatch = useAppDispatch();

	const { firstLoad } = useAppSelector((state: RootState) => state.todoReducer);
	useEffect(() => {
		if (firstLoad) {
			const allTodoInLocalStorage = window.localStorage.getItem("todoDataStored");

			if (allTodoInLocalStorage) {
				const parsedData = JSON.parse(allTodoInLocalStorage);
				dispatch(
					updateStateAfterRefreshFirstLoadAction(
						parsedData.mainTodoList,
						parsedData.selectedTodo
					)
				);
			}
		}
	}, [firstLoad, dispatch]);

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
