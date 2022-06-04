import { useState } from "react";

import Overview from "./Overview";
import Members from "./Members";
import DeleteServer from "./DeleteServer";

const ServerSettings = ({ server, onClose }) => {
	const [show, setShow] = useState("overview");

	return (
		<div className="setting-modal-bg">
			<div className="setting-modal-left">
				<div className="setting-modal-left-wrap">
					<div className="setting-modal-menu-title">{server?.name}</div>
					<div
						className="setting-modal-menu"
						onClick={() => setShow("overview")}
					>
						Overview
					</div>
					<div
						className="setting-modal-menu"
						onClick={() => setShow("members")}
					>
						Members
					</div>
					<div className="setting-modal-menu" onClick={() => setShow("delete")}>
						Delete Server
						<i className="fa-regular fa-trash-can"></i>
					</div>
				</div>
			</div>
			<div className="setting-modal-center">
				{show === "overview" && <Overview server={server} onClose={onClose} />}
				{show === "members" && <Members server={server} onClose={onClose} />}
				{show === "delete" && (
					<DeleteServer server={server} onClose={onClose} />
				)}
			</div>
			<div className="setting-modal-right">
				<div className="setting-modal-right-wrap" onClick={onClose}>
					<i className="fa-regular fa-circle-xmark setting-close-icon"></i>
					<div className="setting-close-desc">Close</div>
				</div>
			</div>
		</div>
	);
};
export default ServerSettings;
