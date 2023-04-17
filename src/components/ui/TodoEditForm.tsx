import React, { useState, useRef } from "react";
import { ITask } from "@/DUMMY_DATA/MODEL";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	onCancelEditTodo: () => void;
	todoToEdit: ITask;
	onConfirmEdit: (todoName: string) => void;
}

const TodoEditForm: React.FC<propsTypes> = ({
	onCancelEditTodo,
	todoToEdit,
	onConfirmEdit,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}

		// console.log(enteredInput);
		onConfirmEdit(enteredInput);
	};
	return (
		<form
			action=''
			onSubmit={submitTodoEditHandler}
		>
			<input
				type='text'
				placeholder='add todo'
				required
				defaultValue={todoToEdit.name}
				ref={inputRef}
			/>
			<button onClick={onCancelEditTodo}>
				<XCircleIcon className='text-red-600 h-8' />
			</button>

			<button>
				<CheckIcon className='text-green-600 h-8' />
			</button>
		</form>
	);
};

export default TodoEditForm;
