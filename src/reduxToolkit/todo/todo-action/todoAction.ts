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

import { ITask, ITodoDetails, IMainTask } from "@/DUMMY_DATA/MODEL";
import { v4 as uuidv4 } from "uuid";

// checked
export const getAllTodoAction = () => async (dispatch: any, getState: any) => {
	const allTodos = getAllTasks();
	dispatch(updateLocaleStorageAction(allTodos));
	await dispatch(getAllTodoRed({ allTodos }));
	await dispatch(updateFirstLoadRed({ firstLoad: false }));
	// dispatch(updateFilteredTodoListAction("all"));
};

// checked
export const updateTodoListAction =
	(allTodos: IMainTask[]) => async (dispatch: any, getState: any) => {
		// console.log(allTodos);
		const { selectedTab } = getState().todoReducer;
		await dispatch(updateTodoListRed({ updatedTodoList: allTodos }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
		dispatch(updateLocaleStorageAction(allTodos));
	};

export const setSelectedTodoAction =
	(todo: IMainTask) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedTodoRed({ selectedTodo: todo }));
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
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodos = [...todoList, newTodo];
		dispatch(updateLocaleStorageAction(updatedTodos));
		dispatch(addNewTodoRed({ updatedTodos }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
	};

// checked
export const updateLocaleStorageAction =
	(allTodos: IMainTask[]) => async (dispatch: any) => {
		const allTodosAsString = JSON.stringify(allTodos);
		window.localStorage.setItem("allTodos", allTodosAsString);
	};

/* export const updateFilteredTodoListAction =
	(tabName: string) => async (dispatch: any, getState: any) => {
		// console.log(tabName);
		const { todoList } = getState().todoReducer;
		let filteredTodoList = todoList;
		if (tabName === "active") {
			filteredTodoList = todoList.filter((todo: ITask) => todo.isDone === false);
		} else if (tabName === "done") {
			filteredTodoList = todoList.filter((todo: ITask) => todo.isDone === true);
		}

		dispatch(
			updateFilteredTodoListRed({
				selectedTab: tabName,
				updatedFilteredTodoList: filteredTodoList,
			})
		);
	}; */

export const updateTodoIsDoneAction =
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
	};

export const deleteTodoAction =
	(id: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodoList = todoList.filter((todo: ITask) => todo._id !== id);
		dispatch(deleteTodoRed({ updatedTodoList }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const deleteAllDoneAction =
	() => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodoList = todoList.filter(
			(todo: ITask) => todo.isDone === false
		);
		dispatch(deleteAllDoneRed({ updatedTodoList }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
	};

// checked
export const editSelectedTodoAction =
	(todoToEdit: IMainTask) => async (dispatch: any) => {
		dispatch(updateEditingStatusRed({ isEditingStatus: true, todoToEdit }));
	};
// checked
export const confirmEditAction =
	(newTaskName: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab, todoToEdit } = getState().todoReducer;
		let indexToEdit = todoList.findIndex(
			(todo: IMainTask) => todo.mainTaskId === todoToEdit.mainTaskId
		);

		let copyOfTodoList = [...todoList];
		copyOfTodoList[indexToEdit] = {
			...copyOfTodoList[indexToEdit],
			mainTaskName: newTaskName,
		};
		dispatch(updateTodoListAfterEditRed({ todoList: copyOfTodoList }));
		// dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const cancelEditTodoAction = () => async (dispatch: any) => {
	dispatch(resetIsEditingRed({}));
};
