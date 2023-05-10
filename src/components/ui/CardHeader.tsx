import React from "react";

import { ChevronDoubleLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface propsTypes {
	title: React.ReactElement;
	onIconHandler?: () => void;
	isInDetails?: boolean;
}

const CardHeader: React.FC<propsTypes> = (props) => {
	const clickBackHandler = async () => {
		if (props.onIconHandler) {
			props.onIconHandler();
		}
	};

	const icon = props.isInDetails ? (
		<button
			className='absolute left-4 text-red-600 h-6'
			onClick={clickBackHandler}
			data-testid={`back_button`}
		>
			<ChevronDoubleLeftIcon className='text-red-600 h-6' />
		</button>
	) : (
		<button
			className='absolute left-4 text-red-600 h-6'
			data-testid={`menu_button`}
		>
			<Bars3Icon className='text-red-600 h-6' />
		</button>
	);
	return (
		<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center relative min-h-[40px]'>
			{icon}

			{props.title}
		</section>
	);
};

export default CardHeader;
