import { useDispatch } from "react-redux";

import * as serversActions from "../../../../../../store/servers";

const Actions = ({ user, owner, server }) => {
	const dispatch = useDispatch();

	const transferOwnership = async () => {
		const serverToUpdate = { ...server, user_id: user.id };
		console.log(serverToUpdate);
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
