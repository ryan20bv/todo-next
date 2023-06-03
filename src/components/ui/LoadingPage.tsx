import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import ListContainer from "./ListContainer";

const LoadingPage = () => {
	return (
		<Card>
			<CardHeader
				title='Loading....'
				from='index_api'
				iconFunction={() => {}}
			/>
			<div className='bg-white w-full h-full flex justify-center p-10'>
				<h1>Loading</h1>
			</div>
		</Card>
	);
};

export default LoadingPage;
