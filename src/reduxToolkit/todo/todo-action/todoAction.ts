import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import {
	getAllTodoRed,
	updateFirstLoadRed,
	setSelectedTodoRed,
	addNewTodoRed,
	// updateFilteredTodoListRed,
	updateTodoDoneStatusRed,
	deleteTodoRed,
	deleteAllDoneRed,
	updateEditingStatusRed,
	updateTodoListAfterEditRed,
	resetIsEditingRed,
	updateTodoListRed,
} from "../todo-slice/todoSlice";

import { IMainTask } from "@/DUMMY_DATA/MODEL";
import { v4 as uuidv4 } from "uuid";

// checked
export const getAllTodoAction = () => async (dispatch: any, getState: any) => {
	const allTodos = getAllTasks();

	await dispatch(getAllTodoRed({ allTodos }));
	await dispatch(updateFirstLoadRed({ firstLoad: false }));
	dispatch(updateLocaleStorageAction());
};

// checked
export const updateTodoListAction =
	(allTodos: IMainTask[]) => async (dispatch: any, getState: any) => {
		// console.log(allTodos);

		await dispatch(updateTodoListRed({ updatedTodoList: allTodos }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
		dispatch(updateLocaleStorageAction());
	};
// checked
export const setSelectedTodoAction =
	(todo: IMainTask) => async (dispatch: any, getState: any) => {
		const { mainTodoList } = getState().todoReducer;
		await dispatch(setSelectedTodoRed({ selectedTodo: todo }));
		dispatch(updateLocaleStorageAction());
	};
// checked
export const updateStateAfterRefreshFirstLoadAction =
	(mainTodoList: IMainTask[], selectedTodo: IMainTask) =>
	async (dispatch: any, getState: any) => {
		await dispatch(updateTodoListRed({ updatedTodoList: mainTodoList }));
		await dispatch(setSelectedTodoRed({ selectedTodo }));
		dispatch(updateFirstLoadRed({ firstLoad: false }));
	};

// checked
export const addNewTodoAction =
	(newTask: string) => async (dispatch: any, getState: any) => {
		const newTodo: IMainTask = {
			categoryId: "Todo next js",
			mainTaskId: uuidv4(),
			mainTaskName: newTask,
			isAllSubTaskDone: false,
			subTaskList: [],
		};

		// console.log(getState().todoReducer);
		const { mainTodoList } = getState().todoReducer;
		const updatedTodos = [...mainTodoList, newTodo];

		await dispatch(addNewTodoRed({ updatedTodos }));
		dispatch(updateLocaleStorageAction());
		// dispatch(updateFilteredTodoListAction(selectedTab));
	};

// checked
export const updateLocaleStorageAction =
	() => async (dispatch: any, getState: any) => {
		const { mainTodoList, selectedTodo } = getState().todoReducer;
		const todoDataStored = { mainTodoList, selectedTodo };
		const allTodosDataAsString = JSON.stringify(todoDataStored);
		window.localStorage.setItem("todoDataStored", allTodosDataAsString);
	};

/* export const updateTodoIsDoneAction =
	(id: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const todoIndex = todoList.findIndex((todo: ITask) => todo._id === id);
		let copyOfTodoList = [...todoList];

		copyOfTodoList[todoIndex] = {
			...copyOfTodoList[todoIndex],
			isDone: !copyOfTodoList[todoIndex].isDone,
		};
		dispatch(updateTodoDoneStatusRed({ updatedTodoList: copyOfTodoList }));

		// dispatch(updateFilteredTodoListAction(selectedTab));
	}; */
// checked
export const deleteMainTodoAction =
	(id: string) => async (dispatch: any, getState: any) => {
		const { mainTodoList, selectedTab } = getState().todoReducer;
		const updatedTodoList = mainTodoList.filter(
			(todo: IMainTask) => todo.mainTaskId !== id
		);
		await dispatch(deleteTodoRed({ updatedTodoList }));
		dispatch(updateLocaleStorageAction());
	};
// working on
export const deleteAllDoneMainTaskAction =
	() => async (dispatch: any, getState: any) => {
		const { mainTodoList } = getState().todoReducer;
		const updatedTodoList = mainTodoList.filter(
			(todo: IMainTask) => todo.isAllSubTaskDone === false
		);
		await dispatch(deleteAllDoneRed({ updatedTodoList }));

		dispatch(updateLocaleStorageAction());
	};

// checked
export const editSelectedTodoAction =
	(todoToEdit: IMainTask) => async (dispatch: any) => {
		dispatch(updateEditingStatusRed({ isEditingStatus: true, todoToEdit }));
	};
// checked
export const confirmEditAction =
	(newTaskName: string) => async (dispatch: any, getState: any) => {
		const { mainTodoList, mainTodoToEdit } = getState().todoReducer;
		let indexToEdit = mainTodoList.findIndex(
			(todo: IMainTask) => todo.mainTaskId === mainTodoToEdit.mainTaskId
		);

		let copyOfTodoList = [...mainTodoList];
		copyOfTodoList[indexToEdit] = {
			...copyOfTodoList[indexToEdit],
			mainTaskName: newTaskName,
		};
		await dispatch(updateTodoListAfterEditRed({ todoList: copyOfTodoList }));
		dispatch(updateLocaleStorageAction());
	};
// checked
export const cancelEditMainTaskAction = () => async (dispatch: any) => {
	dispatch(resetIsEditingRed({}));
};
