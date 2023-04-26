import React from "react";

import { ChevronDoubleLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface propsTypes {
	title: React.ReactElement;
	onIconHandler: () => void;
	isInDetails: boolean;
}

const CardHeader: React.FC<propsTypes> = (props) => {
	const clickHandler = async () => {
		props.onIconHandler();
	};

	const icon = props.isInDetails ? (
		<ChevronDoubleLeftIcon className='text-red-600 h-6' />
	) : (
		<Bars3Icon className='text-red-600 h-6' />
	);
	return (
		<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center relative min-h-[40px]'>
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={clickHandler}
			>
				{icon}
			</button>
			{props.title}
		</section>
	);
};

export default CardHeader;
