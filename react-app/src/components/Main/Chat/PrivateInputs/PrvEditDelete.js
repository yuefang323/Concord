import { useState } from "react";

import ReactTooltip from "react-tooltip";

import { Modal } from "../../../../context/Modal";

import DeletePrvChat from "../../Modal/Chat/DeletePrvChat";

const PrvEditDelete = ({ prvChatId, disabled, setDisabled, socket }) => {
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
					<DeletePrvChat prvChatId={prvChatId} onClose={onClose} socket={socket} />
				</Modal>
			)}
		</div>
	);
};

export default PrvEditDelete;
