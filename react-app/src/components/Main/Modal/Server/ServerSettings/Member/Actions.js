import { useState } from "react";
import { useDispatch } from "react-redux";

import * as serversActions from "../../../../../../store/servers";
import * as joinServersActions from "../../../../../../store/joinServers";

const Actions = ({ user, owner, server, onClose }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);

	const kickOut = async () => {
		// Member to kick out
		const kick = { serverId: server.id, userId: user.id };
		// dispatch to join server to force member leave this server
		const res = await dispatch(joinServersActions.kickOut(kick));
		// Update server.users in redux store
		if (!res.errors) {
			await dispatch(serversActions.addEditServer(res.server));
		} else {
			setErrors(res.errors);
		}
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
				{errors && errors.map((err) => <div key={err}>{err}</div>)}
				<div className="member-action" onClick={kickOut}>
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
