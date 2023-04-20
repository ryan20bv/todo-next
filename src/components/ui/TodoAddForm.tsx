import React, { useRef } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { addNewTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";

import { ITask } from "@/DUMMY_DATA/MODEL";

const TodoAddForm: React.FC<propsTypes> = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}

		// onAddTodo(enteredInput);
		dispatch(addNewTodoAction(enteredInput));
		inputRef.current.value = "";
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
