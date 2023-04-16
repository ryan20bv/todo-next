import React from "react";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	return (
		<main className='flex flex-col items-center w-screen h-screen pt-8'>
			<h1>TODO nextJS</h1>
			<form action=''>
				<input
					type='text'
					placeholder='add todo'
				/>
				<button>ADD</button>
			</form>
			<ul>
				{allTasks.map((task) => (
					<li key={task._id}> {task.name}</li>
				))}
			</ul>
		</main>
	);
};

export default Home;
