import React, { useRef } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { addNewTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";

const AddForm = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;
		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}

		dispatch(addNewTodoAction(enteredInput));
		inputRef.current.value = "";
	};

	const cancelAddHandler = () => {
		const enteredInput = inputRef.current?.value;
		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}
		inputRef.current.value = "";
	};

	return (
		<section className=' my-4  w-[95%] flex '>
			<form
				action=''
				onSubmit={submitTodoHandler}
				className=' w-full flex justify-between '
			>
				<input
					type='text'
					placeholder='add todo'
					required
					ref={inputRef}
					className='py-2 px-2 focus:outline-none w-[85%] border border-black '
				/>

				<button>
					<PlusCircleIcon className='text-green-600 h-8' />
				</button>
			</form>
			<button onClick={cancelAddHandler}>
				<XCircleIcon className='text-red-600 h-8 mx-2' />
			</button>
		</section>
	);
};

export default AddForm;
