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
	if (from === "generalSubtask" || from === "sub_page" || from === "profile") {
		icon = <ChevronDoubleLeftIcon className='text-red-600 h-6' />;
	} else if (from === "login") {
		icon = <HomeIcon className='text-red-600 h-6' />;
	} else if (from === "category") {
		icon = (
			<>
				{showListOfCategories ? (
					<XMarkIcon className='text-red-600 h-6' />
				) : (
					<Square3Stack3DIcon className='text-red-600 h-6' />
				)}
			</>
		);
	}
	return (
		<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center relative min-h-[40px]'>
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={clickIconHandler}
				data-testid={`icon_header_${from}`}
			>
				{icon}
			</button>

			<h1>{title}</h1>
		</section>
	);
};

export default CardHeader;
