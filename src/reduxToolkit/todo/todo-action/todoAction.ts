import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import {
	getAllTodoRed,
	updateFirstLoadRed,
	addNewTodoRed,
	updateFilteredTodoListRed,
	updateTodoDoneStatusRed,
	deleteTodoRed,
	deleteAllDoneRed,
	updateEditingStatusRed,
	updateTodoListAfterEditRed,
	resetIsEditingRed,
} from "../todo-slice/todoSlice";

import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import { v4 as uuidv4 } from "uuid";

export const getAllTodoAction = () => async (dispatch: any) => {
	dispatch(updateFirstLoadRed({ firstLoad: true }));
	const allTodos = getAllTasks();
	const allTodosAsString = JSON.stringify(allTodos);
	window.localStorage.setItem("allTodos", allTodosAsString);
	await dispatch(getAllTodoRed({ allTodos }));
	await dispatch(updateFirstLoadRed({ firstLoad: false }));
	dispatch(updateFilteredTodoListAction("all"));
};

export const addNewTodoAction =
	(newTask: string) => async (dispatch: any, getState: any) => {
		const newTodo: ITask = {
			_id: uuidv4(),
			name: newTask,
			isDone: false,
			details: [],
		};

		// console.log(getState().todoReducer);
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodos = [...todoList, newTodo];
		await dispatch(addNewTodoRed({ updatedTodos }));
		dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const updateFilteredTodoListAction =
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
	};

export const updateTodoIsDoneAction =
	(id: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const todoIndex = todoList.findIndex((todo: ITask) => todo._id === id);
		let copyOfTodoList = [...todoList];

		copyOfTodoList[todoIndex] = {
			...copyOfTodoList[todoIndex],
			isDone: !copyOfTodoList[todoIndex].isDone,
		};
		await dispatch(updateTodoDoneStatusRed({ updatedTodoList: copyOfTodoList }));

		dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const deleteTodoAction =
	(id: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodoList = todoList.filter((todo: ITask) => todo._id !== id);
		await dispatch(deleteTodoRed({ updatedTodoList }));
		dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const deleteAllDoneAction =
	() => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab } = getState().todoReducer;
		const updatedTodoList = todoList.filter(
			(todo: ITask) => todo.isDone === false
		);
		await dispatch(deleteAllDoneRed({ updatedTodoList }));
		dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const selectTodoToEditAction =
	(todoToEdit: ITask) => async (dispatch: any) => {
		dispatch(updateEditingStatusRed({ isEditingStatus: true, todoToEdit }));
	};

export const confirmEditAction =
	(newTaskName: string) => async (dispatch: any, getState: any) => {
		const { todoList, selectedTab, todoToEdit } = getState().todoReducer;
		let indexToEdit = todoList.findIndex(
			(todo: ITask) => todo._id === todoToEdit._id
		);

		let copyOfTodoList = [...todoList];
		copyOfTodoList[indexToEdit] = {
			...copyOfTodoList[indexToEdit],
			name: newTaskName,
		};
		await dispatch(updateTodoListAfterEditRed({ todoList: copyOfTodoList }));
		dispatch(updateFilteredTodoListAction(selectedTab));
	};

export const cancelEditTodoAction = () => async (dispatch: any) => {
	dispatch(resetIsEditingRed({}));
};
