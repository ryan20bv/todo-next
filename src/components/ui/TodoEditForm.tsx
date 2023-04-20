import React, { useState, useRef } from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	confirmEditAction,
	cancelEditTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { ITask } from "@/DUMMY_DATA/MODEL";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	onCancelEditTodo: () => void;
	todoToEdit: ITask;
}

const TodoEditForm: React.FC<propsTypes> = ({
	onCancelEditTodo,
	todoToEdit,
}) => {
	const dispatcher = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}
		dispatcher(confirmEditAction(enteredInput));
		// console.log(enteredInput);
		// onConfirmEdit(enteredInput);
		inputRef.current.value = "";
	};

	const cancelEditHandler = () => {
		dispatcher(cancelEditTodoAction());
	};
	return (
		<section>
			<form
				action=''
				onSubmit={submitTodoEditHandler}
				className='border border-black my-6 w-[90%] flex bg-white justify-between px-2'
			>
				<input
					type='text'
					placeholder='edit todo'
					required
					defaultValue={todoToEdit.name}
					ref={inputRef}
					className='py-2 focus:outline-none'
				/>

				<button>
					<CheckIcon className='text-green-600 h-8' />
				</button>
			</form>
			<button onClick={cancelEditHandler}>
				<XCircleIcon className='text-red-600 h-8' />
			</button>
		</section>
	);
};

export default TodoEditForm;
