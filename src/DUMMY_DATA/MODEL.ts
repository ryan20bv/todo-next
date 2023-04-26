export interface ITodoDetails {
	_id: string;
	item: string;
	isDone: boolean;
}

export interface ITask {
	_id: string;
	name: string;
	isDone: boolean;
	details: ITodoDetails[];
}
