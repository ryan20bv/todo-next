import React from "react";

interface propsTypes {
	children: React.ReactNode;
}

const Card: React.FC<propsTypes> = (props) => {
	return (
		<main className='   flex justify-center h-[36rem]'>
			<div className='flex flex-col items-center w-[95%] sm:w-96 border border-black'>
				{props.children}
			</div>
		</main>
	);
};

export default Card;
