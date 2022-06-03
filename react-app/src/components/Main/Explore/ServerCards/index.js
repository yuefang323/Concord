import { useSelector, useDispatch } from "react-redux";

import * as joinServersActions from "../../../../store/joinServers";
import * as channelsActions from "../../../../store/channels";
import * as chatsActions from "../../../../store/chats";

const ServerCards = ({ server }) => {
	const dispatch = useDispatch();
	const joinedServers = useSelector((state) => state.joinServers.allIds);

	const joinServer = async () => {
		const joinServer = { server_id: server.id };
		// thunks to backend adding join_servers_user
		const data = await dispatch(joinServersActions.joinNewServer(joinServer));
		// Dispatch channels
		await dispatch(channelsActions.getChannels(data.channels));
		// Dispatch chats
		await dispatch(chatsActions.getChats(data.chats));
	};

	return (
		<div className="server-card-outer">
			<div className="server-card-wrap">
				<div
					className="server-card-bg"
					style={{ backgroundImage: `url("${server.background}")` }}
				>
					<div
						className="server-card-logo"
						style={{ backgroundImage: `url("${server.logo}")` }}
					></div>
				</div>
				<div className="server-card-btm">
					<div className="server-name">{server?.name}</div>
					<div className="server-desc">{server?.description}</div>
					<div className="server-card-members-join">
						<div className="server-members">
							<i className="fa-solid fa-circle"></i>
							{server?.users?.length} Member(s)
						</div>
						{joinedServers?.includes(server?.id) ? (
							<div className="btn btn-gray">Joined</div>
						) : (
							<button
								type="button"
								className="btn btn-yellow"
								onClick={joinServer}
							>
								Join
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServerCards;
