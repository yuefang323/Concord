import { useState } from "react";

import { Modal } from "../../../../context/Modal";

import Dropdown from "./Dropdown";

import LeaveServerModal from "../../Modal/Server/LeaveServer";

const TopLeft = ({ server }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("leave");

	const toggleDropdown = () => {
		if (showDropdown) {
			setShowDropdown(false);
		} else {
			setShowDropdown(true);
		}
	};

	const openModal = (type) => {
		setShowDropdown(false);
		setShowModal(true);
		setModalType(type);
	};

	const onClose = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="top-name-wrap">
				<div className="top-server-name" onClick={toggleDropdown}>
					{server?.name}
				</div>
				{showDropdown ? (
					<i className="fa-solid fa-xmark"></i>
				) : (
					<i className="fa-solid fa-chevron-down" onClick={toggleDropdown}></i>
				)}
				{showDropdown && (
					<>
						<Dropdown
							server={server}
							openModal={openModal}
							setModalType={setModalType}
						/>
						<div
							className="modal-bg-clear"
							onClick={() => setShowDropdown(false)}
						></div>
					</>
				)}
				{showModal && (
					<Modal onClose={onClose}>
						{modalType === "leave" && (
							<LeaveServerModal server={server} onClose={onClose} />
						)}
						{modalType === "create_channel" && <div>Channel</div>}
						{modalType === "setting" && <div>Setting</div>}
					</Modal>
				)}
			</div>
		</>
	);
};

export default TopLeft;
