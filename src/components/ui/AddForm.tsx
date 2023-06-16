import React, { useRef } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	onAddHandler: (newTaskName: string) => void;
	placeHolder: string;
}

const AddForm: React.FC<propsTypes> = ({ onAddHandler, placeHolder }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;
		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}

		onAddHandler(enteredInput);
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
		<section className=' w-full px-3 flex '>
			<form
				action=''
				onSubmit={submitTodoHandler}
				className=' w-full flex justify-between '
			>
				<input
					type='text'
					placeholder={placeHolder}
					required
					ref={inputRef}
					className='py-1 px-2 focus:outline-none w-[85%] border border-black '
					id={`add_input`}
					// data-testid={`filter_active`}
				/>

				<button>
					<PlusCircleIcon
						className='text-green-600 h-8 '
						data-testid={`add_confirm_button`}
					/>
				</button>
			</form>
			<button onClick={cancelAddHandler}>
				<XCircleIcon
					className='text-red-600 h-8 mx-2'
					data-testid={`add_cancel_button`}
				/>
			</button>
		</section>
	);
};

export default AddForm;
