import React from "react";

import {
	ChevronDoubleLeftIcon,
	Bars3Icon,
	Square3Stack3DIcon,
	HomeIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

interface propsTypes {
	title: string;
	from: string;
	iconFunction: () => void;
	showListOfCategories?: boolean;
}

const CardHeader: React.FC<propsTypes> = ({
	title,
	from,
	iconFunction,
	showListOfCategories,
}) => {
	const clickIconHandler = () => {
		// if (props.onIconHandler) {
		// 	props.onIconHandler();
		// }
		iconFunction();
	};

	let icon = <span></span>;
	// icon = (
	// 	<Bars3Icon
	// 		className='text-red-600 h-6'
	// 		data-testid={`icon_${from}`}
	// 	/>
	// );

	if (from === "category") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={iconFunction}
				data-testid={`squaresStack_button`}
			>
				{showListOfCategories ? (
					<XMarkIcon className='text-red-600 h-6' />
				) : (
					<Square3Stack3DIcon className='text-red-600 h-6' />
				)}
			</button>
		);
	} else if (from === "generalSubtask") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={clickIconHandler}
				data-testid={`back_button`}
			>
				<ChevronDoubleLeftIcon className='text-red-600 h-6' />
			</button>
		);
	} else if (from === "login") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				data-testid={`login_home_button`}
				onClick={clickIconHandler}
			>
				<HomeIcon className='text-red-600 h-6' />
			</button>
		);
	}

	return (
		<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center relative min-h-[40px]'>
			<button className='absolute left-4 text-red-600 h-6'>{icon}</button>

			<h1>{title}</h1>
		</section>
	);
};

export default CardHeader;
