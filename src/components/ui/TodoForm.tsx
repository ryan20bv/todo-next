import React, { FormEvent, useRef } from "react";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsTypes {
	onAddTodo: (newTodo: string) => void;
}

const TodoForm: React.FC<propsTypes> = ({ onAddTodo }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoHandler = (e: FormEvent<HTMLFormElement>) => {
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
			<button>ADD</button>
		</form>
	);
};

export default TodoForm;
