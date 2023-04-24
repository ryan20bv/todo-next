import React from "react";

interface propsTypes {
	children: React.ReactNode;
}

const Card: React.FC<propsTypes> = (props) => {
	return (
		<main className=' pt-2 pb-6 flex justify-center border border-red-400'>
			<div className='flex flex-col items-center w-[90%] sm:w-96 border border-black'>
				<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center'>
					<h1>TODO nextJS</h1>
				</section>

				{props.children}
			</div>
		</main>
	);
};

export default Card;
