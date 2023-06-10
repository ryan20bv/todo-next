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
					<main className='absolute top-0   w-full h-full flex justify-center items-center'>
						<section
							className='absolute top-0 z-5 w-full h-full  bg-gray-300 bg-opacity-50 flex items-center justify-center'
							onClick={onCloseModal}
						></section>
						<div
							className='absolute top-[30%] border z-10 w-[85%]
				border-black bg-white p-4 rounded-xl mx-6 flex flex-col justify-center items-center'
						>
							{!isSendingData && (
								<>
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
								</>
							)}
							{isSendingData && <p>Deleting...</p>}
						</div>
					</main>,
					notificationPortal
				)}
		</>
	);
};

export default ConfirmationModal;
