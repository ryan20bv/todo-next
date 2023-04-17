export class TodoClass {
	isDone: boolean;
	constructor(public _id: string, public name: string) {
		this._id = _id;
		this.name = name;
		this.isDone = false;
	}
}

export interface ITask {
	_id: string;
	name: string;
	isDone: boolean;
}
