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
			className='border border-black my-6 w-[90%] flex bg-white justify-between px-2'
		>
			<input
				type='text'
				placeholder='add todo'
				required
				ref={inputRef}
				className='py-2 focus:outline-none'
			/>

			<button>
				<PlusCircleIcon className='text-green-600 h-8' />
			</button>
		</form>
	);
};

export default TodoAddForm;
