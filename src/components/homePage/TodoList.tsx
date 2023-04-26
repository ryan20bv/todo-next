import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Summary from "../ui/Summary";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";

import { deleteAllDoneAction } from "@/reduxToolkit/todo/todo-action/todoAction";

import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}
const TodoList: React.FC<propsType> = ({ allTasks }) => {
	const dispatch = useAppDispatch();
	const [selectedTab, setSelectedTab] = useState<string>("all");

	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};
	const deleteAllDoneTodoHandler = () => {
		dispatch(deleteAllDoneAction());
	};

	let filteredTodoList = allTasks;
	if (selectedTab === "active") {
		filteredTodoList = allTasks.filter((todo: ITask) => todo.isDone === false);
	} else if (selectedTab === "done") {
		filteredTodoList = allTasks.filter((todo: ITask) => todo.isDone === true);
	}

	let todoLength: number = filteredTodoList.length;
	return (
		<>
			<div className='h-96 bg-white  overflow-y-scroll mb-4 border border-black '>
				<ul className='p-3  h-full'>
					{todoLength === 0 && <h2>Todo is Empty - {selectedTab}</h2>}
					{todoLength > 0 &&
						filteredTodoList.map((task, index) => (
							<TodoItem
								key={task._id}
								task={task}
								index={index}
							/>
						))}
				</ul>
			</div>
			<Summary
				length={todoLength}
				selectedTab={selectedTab}
				onSelectTab={updateSelectedTabHandler}
				onDeleteAllDone={deleteAllDoneTodoHandler}
			/>
		</>
	);
};

export default TodoList;
