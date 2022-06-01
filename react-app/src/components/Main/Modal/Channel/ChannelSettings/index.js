import { useState } from "react";

import ChannelOverview from "./Overview";
import DeleteChannel from "./DeleteChannel";

const ChannelSettings = ({ channel, onClose, setShowModal }) => {
	const [show, setShow] = useState("overview");

	return (
		<div className="setting-modal-bg">
			<div className="setting-modal-left">
				<div className="setting-modal-left-wrap">
					<div className="setting-modal-menu-title">{channel?.name}</div>
					<div
						className="setting-modal-menu"
						onClick={() => setShow("overview")}
					>
						Overview
					</div>

					<div className="setting-modal-menu" onClick={() => setShow("delete")}>
						Delete Channel
						<i className="fa-regular fa-trash-can"></i>
					</div>
				</div>
			</div>
			<div className="setting-modal-center">
				{show === "overview" && <ChannelOverview channel={channel} onClose={onClose} />}
				{show === "delete" && (
					<DeleteChannel channel={channel} onClose={onClose} />
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
export default ChannelSettings;