import { useEffect } from "react";
import { useDispatch } from "react-redux";

import SideBar from "./SideBar";
import ChannelBar from "./ChannelBar";
import Chat from "./Chat";
import Users from "./Users";

import * as serversActions from "../../store/servers";
import * as channelsActions from "../../store/channels";
import * as chatsActions from "../../store/chats";
import * as prvChannelsActions from "../../store/prvChannels";
import * as prvChatsActions from "../../store/prvChats";
import * as joinServersActions from "../../store/joinServers";
import * as usersActions from "../../store/users";

const MainPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/api/users/all")
			.then((res) => res.json())
			.then((data) => {
				dispatch(serversActions.getServers(data.servers));
				dispatch(channelsActions.getChannels(data.channels));
				dispatch(chatsActions.getChats(data.chats));
				dispatch(prvChannelsActions.getPrvChannels(data.prvChannels));
				dispatch(prvChatsActions.getPrvChats(data.prvChats));
				dispatch(joinServersActions.getJoinServers(data.joinServers));
				dispatch(usersActions.getUsers(data.users));
			});
	}, [dispatch]);
	return (
		<div className="main-ctrl">
			<SideBar />
			<ChannelBar />
			<Chat />
			<Users />
		</div>
	);
};

export default MainPage;
