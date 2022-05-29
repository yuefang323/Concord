import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const JoinServer = ({ setChoose }) => {
	const dispatch = useDispatch();

	const [serverId, setServerId] = useState();
	const otherServers = useSelector((state) => state.otherServers.byId);

	const join = () => {
		const serverToJoin = otherServers[serverId];
		console.log(serverToJoin);
		// thunks to backend adding join_servers_user
		// Dispatch server adding server to join
		// Dispatch other server removing server to join
	};

	return (
		<>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Join a Server</div>
				<div className="form-description">
					Search from below to join an exising server
				</div>
				<select
					className="select"
					value={serverId}
					onChange={(e) => setServerId(e.target.value)}
				>
					{Object.values(otherServers).map((server) => (
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
				<button className="form-create-btm-btn" type="button" onClick={join}>
					Join a Server
				</button>
			</div>
		</>
	);
};

export default JoinServer;
