import React from "react";
interface propsTypes {
	children: React.ReactNode;
}
const Layout: React.FC<propsTypes> = (props) => {
	return <div className='bg-[#E3E9FF]'>{props.children}</div>;
};

export default Layout;
