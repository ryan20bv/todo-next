import React, { useRef } from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	confirmEditAction,
	cancelEditTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { ITask } from "@/DUMMY_DATA/MODEL";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	todoToEdit: ITask;
}

const TodoEditForm: React.FC<propsTypes> = ({ todoToEdit }) => {
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
		inputRef.current.value = "";
	};

	const cancelEditHandler = () => {
		dispatcher(cancelEditTodoAction());
	};
	return (
		<section className=' my-4  w-[90%] flex '>
			<form
				action=''
				onSubmit={submitTodoEditHandler}
				className=' w-full flex justify-between '
			>
				<input
					type='text'
					placeholder='edit todo'
					required
					defaultValue={todoToEdit.name}
					ref={inputRef}
					className='py-2 px-2 focus:outline-none w-[85%] border border-black '
				/>

				<button>
					<CheckIcon className='text-green-600 h-8' />
				</button>
			</form>
			<button onClick={cancelEditHandler}>
				<XCircleIcon className='text-red-600 h-8 mx-2' />
			</button>
		</section>
	);
};

export default TodoEditForm;
