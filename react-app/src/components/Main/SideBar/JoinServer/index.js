import { useState } from "react";

import { Modal } from "../../../../context/Modal";

const JoinServer = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div
			className="sidebar-btn-ctrl tooltip"
			onClick={() => setShowModal(true)}
		>
			<div className="sidebar-highlight"></div>
			<div className="sidebar-btn sidebar-btn-dark">
				<i className="fa-solid fa-plus sidebar-icon"></i>
			</div>
			<div className="tooltiptext">Create / Join Server</div>
			{showModal && (
				<Modal
					onClose={() => {
						setTimeout(() => {
							setShowModal(false);
						}, 1);
					}}
				>
					<div>Form</div>
				</Modal>
			)}
		</div>
	);
};

export default JoinServer;
