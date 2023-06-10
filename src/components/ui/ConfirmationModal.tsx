import React from "react";
import ReactDOM from "react-dom";

// import classes from "./notification.module.css";
interface propsTypes {
	message: string;
	onCloseModal: () => void;
	onConfirm: () => void;
	isSendingData: boolean;
}
const ConfirmationModal: React.FC<propsTypes> = ({
	message,
	onCloseModal,
	onConfirm,
	isSendingData,
}) => {
	const notificationPortal = document.getElementById("notificationPortal");
	const confirmHandler = () => {
		onConfirm();
	};

	return (
		<>
			{notificationPortal &&
				ReactDOM.createPortal(
					<main className='absolute top-0 border border-red-500  w-full h-full'>
						<section
							className='absolute top-0 z-5 w-full h-full border border-black bg-gray-300 bg-opacity-40 flex items-center justify-center'
							onClick={onCloseModal}
						></section>
						<div
							className='absolute top-[30%] border z-10
				border-black bg-white p-4 rounded-xl mx-6 flex flex-col justify-center'
						>
							<p>{message}</p>
							<div className='flex justify-around'>
								{!isSendingData && (
									<>
										<button
											className='bg-green-400 px-4 py-1 rounded-md mt-4'
											onClick={confirmHandler}
										>
											YES
										</button>
										<button
											className='bg-red-400 px-4 py-1 rounded-md mt-4'
											onClick={onCloseModal}
										>
											No
										</button>
									</>
								)}
								{isSendingData && <p>Deleting...</p>}
							</div>
						</div>
					</main>,
					notificationPortal
				)}
		</>
	);
};

export default ConfirmationModal;
