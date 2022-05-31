import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import ChannelBar from "./ChannelBar";
import Chat from "./Chat";
import Users from "./Users";

import ExplorePage from "./Explore";

import * as serversActions from "../../store/servers";
import * as channelsActions from "../../store/channels";
import * as chatsActions from "../../store/chats";
import * as prvChannelsActions from "../../store/prvChannels";
import * as prvChatsActions from "../../store/prvChats";
import * as joinServersActions from "../../store/joinServers";
import * as usersActions from "../../store/users";

import { socket } from "../../context/Socket";

const MainPage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const channels = useSelector((state) => state.channels);
	const channelArr = channels.allIds;

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

		socket.on("receive_message", (data) => {
			// dispatch chat with id to our redux store
			// dispatch(chatActions.addChat(data));
			// clear chat field
			// setChat("");
		});

		// Disconnect socket when leave page
		return () => {
			socket.disconnect();
		};
	}, [dispatch]);

	useEffect(() => {
		if (user && channelArr.length) {
			socket.emit("join_channels", channelArr);
		}
	}, [user, channels, channelArr]);

	return (
		<div className="main-ctrl">
			<SideBar socket={socket} />
			<Switch>
				<Route path={["/channels/@me", "/channels/@me/:channelId"]} exact>
					<ChannelBar />
					<Chat />
				</Route>
				<Route
					path={["/", "/channels/:serverId", "/channels/:serverId/:channelId"]}
					exact
				>
					<ChannelBar />
					<Chat />
					<Users />
				</Route>
				<Route path="/guild-discovery" exact>
					<ExplorePage />
				</Route>
			</Switch>
		</div>
	);
};

export default MainPage;
