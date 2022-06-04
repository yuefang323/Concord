import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as joinServersActions from "../../../../store/joinServers";
import * as channelsActions from "../../../../store/channels";
import * as chatsActions from "../../../../store/chats";

const ServerCards = ({ server }) => {
	const dispatch = useDispatch();
	const joinedServers = useSelector((state) => state.joinServers.allIds);

	const divRef = useRef();
	const logoRef = useRef();

	const joinServer = async () => {
		const joinServer = { server_id: server.id };
		// thunks to backend adding join_servers_user
		const data = await dispatch(joinServersActions.joinNewServer(joinServer));
		// Dispatch channels
		await dispatch(channelsActions.getChannels(data.channels));
		// Dispatch chats
		await dispatch(chatsActions.getChats(data.chats));
	};

	useEffect(() => {
		const lastNum = server?.id.toString()[server?.id.toString().length - 1];
		if (lastNum === "0" || lastNum === "5") {
			divRef.current.classList.add("color-red");
			logoRef.current.classList.add("color-green");
		} else if (lastNum === "1" || lastNum === "6") {
			divRef.current.classList.add("color-yellow");
			logoRef.current.classList.add("color-purple");
		} else if (lastNum === "2" || lastNum === "7") {
			divRef.current.classList.add("color-green");
			logoRef.current.classList.add("color-orange");
		} else if (lastNum === "3" || lastNum === "8") {
			divRef.current.classList.add("color-blue");
			logoRef.current.classList.add("color-red");
		} else if (lastNum === "4" || lastNum === "9") {
			divRef.current.classList.add("color-purple");
			logoRef.current.classList.add("color-green");
		}
	}, [server]);

	return (
		<div className="server-card-outer">
			<div className="server-card-wrap">
				<div
					className="server-card-bg"
					style={{ backgroundImage: `url("${server.background}")` }}
					ref={divRef}
				>
					<div
						className="server-card-logo"
						style={{ backgroundImage: `url("${server.logo}")` }}
						ref={logoRef}
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
