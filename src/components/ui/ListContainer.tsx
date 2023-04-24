import React from "react";

interface propsTypes {
	children: React.ReactNode;
}

const ListContainer: React.FC<propsTypes> = (props) => {
	return (
		<section className='border border-black bg-white w-[95%] h-96 overflow-y-scroll mb-4 p-2'>
			{props.children}
		</section>
	);
};

export default ListContainer;
