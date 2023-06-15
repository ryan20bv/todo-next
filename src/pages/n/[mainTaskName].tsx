import React, { useEffect } from "react";

import TaskDetail from "@/components/task/TaskDetail";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { updateStateAfterRefreshFirstLoadAction } from "@/reduxToolkit/todo/todo-action/todoAction";

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

export default TaskDetails;
