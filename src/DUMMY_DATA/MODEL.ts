// export interface ITodoDetails {
// 	_id: string;
// 	item: string;
// 	isDone: boolean;
// }

// export interface ITask {
// 	_id: string;
// 	name: string;
// 	isDone: boolean;
// 	details: ITodoDetails[];
// }

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

export interface INewMainTask {
	enteredMainTaskName: string;
	category_id: string;
	apiToken: string;
}
