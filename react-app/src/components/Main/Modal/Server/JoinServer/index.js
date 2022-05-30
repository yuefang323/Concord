import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as joinServersActions from "../../../../../store/joinServers";
import * as channelsActions from "../../../../../store/channels";
import * as chatsActions from "../../../../../store/chats";
import * as usersActions from "../../../../../store/users";

const JoinServer = ({ setChoose, setShowModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [serverId, setServerId] = useState();
	const servers = useSelector((state) => state.servers.byId);
	const joinedServers = useSelector((state) => state.joinServers);
	const joinedSet = new Set(joinedServers.allIds);
	const [errors, setErrors] = useState([]);

	const join = async (e) => {
		e.preventDefault();
		if (serverId) {
			setErrors([]);
			const joinServer = { server_id: serverId };
			// thunks to backend adding join_servers_user
			const data = await dispatch(joinServersActions.joinNewServer(joinServer));
			// Dispatch channels
			await dispatch(channelsActions.getChannels(data.channels));
			// Dispatch chats
			await dispatch(chatsActions.getChats(data.chats));
			// Dispatch users
			await dispatch(usersActions.getUsers(data.users));
			setShowModal(false);
			history.push(`/channels/${serverId}`);
		} else {
			setErrors(["Please select a server"]);
		}
	};

	return (
		<form onSubmit={join}>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Join a Server</div>
				<div className="form-description">
					Search from below to join an exising server
				</div>
				{errors && (
					<div className="error-list">
						{errors.map((error, idx) => (
							<div key={"error" + idx}>{error}</div>
						))}
					</div>
				)}
				<select
					className="select"
					value={serverId}
					onChange={(e) => setServerId(parseInt(e.target.value, 10))}
				>
					<option>Select a server</option>
					{Object.values(servers)
						.filter((server) => !joinedSet.has(server.id))
						.map((server) => (
							<option key={server?.id} value={server?.id}>
								{server?.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={() => setChoose("create-join")}
				>
					Back
				</button>
				<button className="form-create-btm-btn" type="submit">
					Join a Server
				</button>
			</div>
		</form>
	);
};

export default JoinServer;
