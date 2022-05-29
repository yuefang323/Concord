import { useState } from "react";
import ReactTooltip from "react-tooltip";

import { Modal } from "../../../../context/Modal";

import CreateJoin from "./CreateJoin";
import AddServer from "../../Modal/Server/AddServer";
import JoinServer from "../../Modal/Server/JoinServer";

const Add = () => {
	const [showModal, setShowModal] = useState(false);
	const [choose, setChoose] = useState("create-join");

	return (
		<div
			className="sidebar-btn-ctrl"
			onClick={() => setShowModal(true)}
			data-tip="Create / Join Server"
		>
			<div className="sidebar-highlight"></div>
			<div className="sidebar-btn sidebar-btn-dark">
				<i className="fa-solid fa-plus sidebar-icon"></i>
			</div>
			{showModal && (
				<Modal
					onClose={() => {
						setTimeout(() => {
							setShowModal(false);
							setChoose("create-join");
						}, 1);
					}}
				>
					<div className="form-ctrl form-sm">
						{choose === "create-join" && <CreateJoin setChoose={setChoose} />}
						{choose === "add-server" && <AddServer setChoose={setChoose} />}
						{choose === "join-server" && <JoinServer setChoose={setChoose} />}
					</div>
				</Modal>
			)}
			<ReactTooltip place="right" type="dark" effect="solid" />
		</div>
	);
};

export default Add;
