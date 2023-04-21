import React from "react";

import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	selectedTodo: {
		todoDetail: ITask;
		index: number;
	};
}

const TaskDetail: React.FC<propsType> = ({ selectedTodo }) => {
	const { todoDetail, index } = selectedTodo;

	return (
		<div>
			<span>{index + 1 + ". "}</span> {todoDetail.name}
		</div>
	);
};

export default TaskDetail;
