import React from "react";
import MainNav from "./MainNav";
interface propsTypes {
	children: React.ReactNode;
}
const Layout: React.FC<propsTypes> = (props) => {
	return (
		<main className='bg-[#E3E9FF] h-screen w-screen'>
			<MainNav />
			<section>{props.children}</section>
		</main>
	);
};

export default Layout;
