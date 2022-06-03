import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as joinServersActions from "../../../../../store/joinServers";
import * as serversActions from "../../../../../store/servers";
import * as channelsActions from "../../../../../store/channels";
import * as chatsActions from "../../../../../store/chats";

const LeaveServerModal = ({ server, onClose }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const channels = useSelector((state) => state.channels.byId);

	const leaveServer = async () => {
		const channelArr = server.channels;

		// thunks to delete join server user
		const res = await dispatch(
			joinServersActions.leaveThisServer({ serverId: server.id })
		);
		// dispatch to updated server with user not in users arry
		dispatch(serversActions.addEditServer(res));

		// dispatch to delete channels from redux store
		channelArr.forEach((channelId) => {
			channels[channelId].chats.forEach((chatId) => {
				// dispatch to delete chats from redux store
				dispatch(chatsActions.deleteChat(chatId));
			});
			dispatch(channelsActions.deleteChannels(channelId));
		});

		onClose();
		history.push("/channels/@me");
	};

	return (
		<div className="form-ctrl form-sm">
			<div className="form-ctrl-wrap">
				<div className="form-h2">Leave '{server.name}'</div>
				<div className="form-description">
					Are you sure you want to leave {server.name}?
				</div>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={onClose}
				>
					Cancel
				</button>
				<button
					className="form-create-btm-btn"
					type="submit"
					onClick={leaveServer}
				>
					Leave Server
				</button>
			</div>
		</div>
	);
};

export default LeaveServerModal;
