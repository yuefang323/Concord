import { useState } from "react";

import { Modal } from "../../../../context/Modal";

import CreateJoin from "./CreateJoin";

import AddServer from "../../Modal/Server/AddServer";
import JoinServer from "../../Modal/Server/JoinServer";

const Add = () => {
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
					<CreateJoin />
				</Modal>
			)}
		</div>
	);
};

export default Add;
