export interface ICategory {
	categoryId: string;
	creatorId: string;
	categoryName: string;
}

export interface IMainTask {
	categoryId: string;
	mainTaskId: string;
	mainTaskName: string;
	subTaskList: ISubTask[];
	isAllSubTaskDone: boolean;
}

export interface ISubTask {
	mainTaskId: string;
	subTaskId: string;
	subTaskName: string;
	isDone: boolean;
}

export interface IUpdateMainTaskName {
	enteredNewMainTaskName: string;
	mainTask_id: string;
}
