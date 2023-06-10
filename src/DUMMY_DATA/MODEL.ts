export interface ICategory {
	_id: string;
	creator_id: string;
	categoryName: string;
	mainTaskList: IMainTask[];
}

export interface IMainTask {
	_id: string;
	creator_id: string;
	category_id: string;
	mainTaskName: string;
	isAllSubTaskDone: boolean;
	subTaskList: ISubTask[];
}

export interface ISubTask {
	_id: string;
	creator_id: string;
	mainTask_id: string;
	subTaskName: string;
	isDone: boolean;
}

export interface IUpdateMainTaskName {
	enteredNewMainTaskName: string;
	mainTask_id: string;
}
