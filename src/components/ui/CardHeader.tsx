import React from "react";

import {
	ChevronDoubleLeftIcon,
	Bars3Icon,
	Square3Stack3DIcon,
	HomeIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

interface propsTypes {
	title: React.ReactElement;
	onIconHandler?: () => void;
	from: string;
	iconFunction?: () => void;
	showCategoryList?: boolean;
}

const CardHeader: React.FC<propsTypes> = (props) => {
	const clickBackHandler = async () => {
		if (props.onIconHandler) {
			props.onIconHandler();
		}
	};

	let icon = <span></span>;

	if (props.from === "home") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				data-testid={`menu_button`}
			>
				<Bars3Icon className='text-red-600 h-6' />
			</button>
		);
	} else if (props.from === "category") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={props.iconFunction}
				data-testid={`squaresStack_button`}
			>
				{props.showCategoryList ? (
					<XMarkIcon className='text-red-600 h-6' />
				) : (
					<Square3Stack3DIcon className='text-red-600 h-6' />
				)}
			</button>
		);
	} else if (props.from === "generalSubtask") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				onClick={clickBackHandler}
				data-testid={`back_button`}
			>
				<ChevronDoubleLeftIcon className='text-red-600 h-6' />
			</button>
		);
	} else if (props.from === "login") {
		icon = (
			<button
				className='absolute left-4 text-red-600 h-6'
				data-testid={`login_home_button`}
			>
				<HomeIcon className='text-red-600 h-6' />
			</button>
		);
	}

	return (
		<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center relative min-h-[40px]'>
			{icon}

			{props.title}
		</section>
	);
};

export default CardHeader;
