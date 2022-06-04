import { useDispatch } from "react-redux";

import * as serversActions from "../../../../../../store/servers";
import * as joinServersActions from "../../../../../../store/joinServers";

const Actions = ({ user, owner, server, onClose }) => {
	const dispatch = useDispatch();

	const kickOut = async () => {
		// dispatch to join server
		const kick = { server_id: server.id, user_id: user.id };
		console.log(kick);
	};

	const transferOwnership = async () => {
		const serverToUpdate = { ...server, user_id: user.id };
		await dispatch(serversActions.editServer(serverToUpdate));
		onClose();
	};

	if (owner) {
		return <div className="member-actions">Owner</div>;
	} else {
		return (
			<div className="member-actions">
				<div className="member-action">
					<i className="fa-solid fa-ban"></i>
					Kick Out
				</div>
				<div className="member-action" onClick={transferOwnership}>
					<i className="fa-solid fa-arrow-right-arrow-left"></i>
					Transfer Ownership
				</div>
			</div>
		);
	}
};

export default Actions;
