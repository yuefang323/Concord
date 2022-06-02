import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import Chats from "./Chats";
import PrivateChats from "./PrivateChats";
import InputChat from "./Inputs/InputChat";

import * as channelsActions from "../../../store/channels";
import * as chatsActions from "../../../store/chats";

let socket;

const Chat = () => {
	const dispatch = useDispatch();

	const channelId = parseInt(useParams().channelId);
	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);

	const [chat, setChat] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// only send when there is chat input
		if (chat) {
			const chatData = {
				channel_id: channelId,
				chat,
			};

			socket.emit("send_chat", chatData);

			// clear chat field
			setChat("");
		}
	};

	useEffect(() => {
		socket = io();

		socket.emit("join_channel", channelId);

		socket.on("receive_message", (data) => {
			// dispatch chat with id to our redux store
			dispatch(channelsActions.addEditChannel(data.channel));
			dispatch(chatsActions.addEditChat(data.chat));
		});

		socket.on("delete_chat", (data) => {
			// dispatch delete chat
			dispatch(chatsActions.deleteChat(data.chat_id));
			// dispatch update channel
			dispatch(channelsActions.addEditChannel(data.channel));
		});

		return () => {
			socket.emit("leave_channel", channelId);
			socket.disconnect();
		};
	}, [channelId, dispatch]);

	if (serverId) {
		return (
			<div className="chat-ctrl">
				<Chats />
				<InputChat chat={chat} setChat={setChat} handleSubmit={handleSubmit} />
			</div>
		);
	} else {
		return (
			<div className="chat-ctrl">
				<PrivateChats />
				{/* <InputChat /> */}
			</div>
		);
	}
};

export default Chat;
