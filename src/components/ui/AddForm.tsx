import React, { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	onAddHandler: (newTaskName: string) => void;
	placeHolder: string;
}

const AddForm: React.FC<propsTypes> = ({ onAddHandler, placeHolder }) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [hasError, setHasError] = useState<boolean>(false);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /[^a-zA-Z0-9-_ ]/g;
		const trimmedValue = e.currentTarget.value.trimStart().replace(regex, "");
		const capitalizeFirstCharacter = (str: string): string => {
			if (str.length === 0) {
				return str; // Return empty string if input is empty
			}
			const firstChar = str.charAt(0).toUpperCase(); // Get the first character and capitalize it
			const restOfString = str.slice(1); // Get the remaining characters of the string

			return firstChar + restOfString; // Return the capitalized string
		};

		const capitalizedString = capitalizeFirstCharacter(trimmedValue);

		setInputValue(capitalizedString);
	};

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const removeUnderscoreAndHyphen = (str: string): string => {
			const regex = /[_-](?!\w)/g;
			const cleanedStr = str.replace(regex, "");
			return cleanedStr;
		};
		const cleanedString = removeUnderscoreAndHyphen(inputValue);
		setInputValue(cleanedString);

		if (!cleanedString || cleanedString?.trim().length === 0) {
			setHasError(true);
			return;
		}

		onAddHandler(cleanedString.trim());
		setHasError(false);
		setInputValue("");
	};

	const cancelAddHandler = () => {
		setHasError(false);
		setInputValue("");
	};

	return (
		<section className=' w-full px-3  mt-2 '>
			<div className='flex'>
				<form
					action=''
					onSubmit={submitTodoHandler}
					className=' w-full flex justify-between '
				>
					<input
						type='text'
						placeholder={placeHolder}
						// required
						// ref={inputRef}
						className='py-1 px-2 focus:outline-none w-[85%] border border-black '
						id={`add_input`}
						onChange={changeHandler}
						value={inputValue}
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
						className='text-red-600 h-8 mx-1'
						data-testid={`add_cancel_button`}
					/>
				</button>
			</div>
			{hasError && (
				<p className='text-red-500 text-xs pl-4'>*Please enter a value</p>
			)}
		</section>
	);
};

export default AddForm;
