import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as serversActions from "../../store/servers";
import * as channelsActions from "../../store/channels";
import * as chatsActions from "../../store/chats";
import * as prvChannelsActions from "../../store/prvChannels";
import * as prvChatsActions from "../../store/prvChats";
import * as otherServersActions from "../../store/otherServers";
import * as usersActions from "../../store/users";

const SideBar = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// const response = fetch("/api/users/all");
		// const data = response.json();
		// const {
		// servers,
		// channels,
		// chats,
		// prvChannels,
		// prvChats,
		// otherServers,
		// users,
		// } = data;
		// dispatch(serversActions.getServers(servers));
		// dispatch(channelsActions.getChannels(channels));
		// dispatch(chatsActions.getChats(chats));
		// dispatch(prvChannelsActions.getPrvChannels(prvChannels));
		// dispatch(prvChatsActions.getPrvChats(prvChats));
		// dispatch(otherServersActions.getOtherServers(otherServers));
		// dispatch(usersActions.getUsers(users));
	}, []);
	return <div>sidebar</div>;
};
export default SideBar;
