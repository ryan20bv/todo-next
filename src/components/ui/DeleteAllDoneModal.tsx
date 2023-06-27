import React from "react";
import ReactDOM from "react-dom";

// import classes from "./notification.module.css";
interface propsTypes {
	message: string;
	onCloseModal: () => void;
	onConfirm: () => void;
	isDeletingData: boolean;
	// isToggleUpdating: boolean;
	isUpdatingData: boolean;
	updateMessage: string;
}
const DeleteAllDoneModal: React.FC<propsTypes> = ({
	message,
	onCloseModal,
	onConfirm,
	isDeletingData,
	// isToggleUpdating,
	isUpdatingData,
	updateMessage,
}) => {
	const notificationPortal = document.getElementById("notificationPortal");
	const confirmHandler = () => {
		onConfirm();
	};

	return (
		<>
			{notificationPortal &&
				ReactDOM.createPortal(
					<main className='absolute top-0   w-full h-full flex justify-center items-center'>
						<section
							className='absolute top-0 z-5 w-full h-full  bg-gray-300 bg-opacity-40 flex items-center justify-center'
							// onClick={onCloseModal}
						></section>
						{isDeletingData && !isUpdatingData && (
							<div
								className='absolute top-[40%] border z-10 w-[85%]
				border-black bg-white p-4 rounded-xl mx-6 flex flex-col justify-center items-center'
							>
								<p>{message}</p>
								<div className='flex justify-around  w-[70%] mt-4'>
									<button
										className='bg-green-400 px-4 py-1 rounded-lg '
										onClick={confirmHandler}
									>
										YES
									</button>
									<button
										className='bg-red-400 px-4 py-1 rounded-lg '
										onClick={onCloseModal}
									>
										No
									</button>
								</div>
							</div>
						)}
						{isUpdatingData && (
							<div
								className='absolute top-[40%] border z-10 w-[85%]
				border-black bg-white  p-4 rounded-xl mx-6 flex flex-col justify-center items-center'
							>
								<p>{updateMessage}</p>
							</div>
						)}
					</main>,
					notificationPortal
				)}
		</>
	);
};

export default DeleteAllDoneModal;
