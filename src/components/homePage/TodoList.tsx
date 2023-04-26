import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Summary from "../ui/Summary";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}
const TodoList: React.FC<propsType> = ({ allTasks }) => {
	const [selectedTab, setSelectedTab] = useState<string>("all");

	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
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
					{filteredTodoList.map((task, index) => (
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
			/>
		</>
	);
};

export default TodoList;
