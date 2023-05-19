import React from "react";
import ReactDOM from "react-dom";

// import classes from "./notification.module.css";
interface propsTypes {
	message: string;
	onCloseModal: () => void;
	onConfirm: () => void;
}
const Modal: React.FC<propsTypes> = ({ message, onCloseModal, onConfirm }) => {
	const notificationPortal = document.getElementById("notificationPortal");
	const confirmHandler = () => {
		onConfirm();
	};

	return (
		<>
			{notificationPortal &&
				ReactDOM.createPortal(
					<section className='absolute top-0 z-10 w-full h-full border border-black bg-gray-300 bg-opacity-40 flex items-center justify-center'>
						<div
							className='border
				border-black bg-white p-6 rounded-xl'
						>
							<p>{message}</p>
							<p>Please Log In again!</p>
							<button
								className='bg-green-400 px-4 py-1 rounded-md mt-4'
								onClick={confirmHandler}
							>
								OK
							</button>
						</div>
					</section>,
					notificationPortal
				)}
		</>
	);
};

export default Modal;
