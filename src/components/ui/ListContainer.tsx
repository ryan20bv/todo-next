import React from "react";

interface propsTypes {
	children: React.ReactNode;
}

const ListContainer: React.FC<propsTypes> = (props) => {
	return <section className=' w-full h-[90%] p-3'>{props.children}</section>;
};

export default ListContainer;
