import React from "react";
import TodoItem from "./TodoItem";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}
const TodoList: React.FC<propsType> = ({ allTasks }) => {
	return (
		<ul className='border border-black bg-white w-[90%] h-full overflow-y-scroll mb-4'>
			{allTasks.map((task) => (
				<TodoItem
					key={task._id}
					task={task}
				/>
			))}
		</ul>
	);
};

export default TodoList;
