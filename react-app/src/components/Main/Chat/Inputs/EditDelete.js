import { useState } from "react";

import ReactTooltip from "react-tooltip";

import { Modal } from "../../../../context/Modal";
import DeleteChat from "../../Modal/Chat/DeleteChat";

const EditDelete = ({ chatId, disabled, setDisabled }) => {
	const [showModal, setShowModal] = useState(false);

	const onClose = () => {
		setShowModal(false);
	};

	return (
		<div className="chat-edit-delete">
			<div
				className="chat-edit-delete-btn"
				data-tip="Edit"
				onClick={() => setDisabled(false)}
			>
				<i className="fa-solid fa-pen"></i>
			</div>
			<div
				className="chat-edit-delete-btn"
				data-tip="Delete"
				onClick={() => setShowModal(true)}
			>
				<i className="fa-solid fa-trash-can"></i>
			</div>
			<ReactTooltip place="bottom" type="dark" effect="solid" />
			{showModal && (
				<Modal onClose={onClose}>
					<DeleteChat chatId={chatId} onClose={onClose} />
				</Modal>
			)}
		</div>
	);
};

export default EditDelete;
