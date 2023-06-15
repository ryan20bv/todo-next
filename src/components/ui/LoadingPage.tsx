import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";

interface PropsType {
	status: string;
}

const LoadingPage: React.FC<PropsType> = ({ status }) => {
	return (
		<Card>
			<CardHeader
				title={status}
				from='index_api'
				iconFunction={() => {}}
			/>
			<div className='bg-white w-full h-full flex justify-center p-10'>
				<h1>{status}</h1>
			</div>
		</Card>
	);
};

export default LoadingPage;
