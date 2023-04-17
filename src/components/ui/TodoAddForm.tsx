import React, { FormEvent, useRef, useState } from "react";
import { PlusCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsTypes {
	onAddTodo: (newTodo: string) => void;
}

const TodoAddForm: React.FC<propsTypes> = ({ onAddTodo }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}

		console.log(enteredInput);
		onAddTodo(enteredInput);
	};

	return (
		<form
			action=''
			onSubmit={submitTodoHandler}
		>
			<input
				type='text'
				placeholder='add todo'
				required
				ref={inputRef}
			/>

			<button>
				<PlusCircleIcon className='text-green-600 h-8' />
			</button>
		</form>
	);
};

export default TodoAddForm;
