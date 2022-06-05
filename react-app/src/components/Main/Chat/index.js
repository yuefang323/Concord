import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import Chats from "./Chats";
import PrivateChats from "./PrivateChats";
import InputChat from "./Inputs/InputChat";
import PrvInputChat from "./PrivateInputs/PrvInputChat";

import * as channelsActions from "../../../store/channels";
import * as chatsActions from "../../../store/chats";
import * as prvChannelsActions from "../../../store/prvChannels";
import * as prvChatsActions from "../../../store/prvChats";

let socket;

const Chat = () => {
	const dispatch = useDispatch();

	const channelId = parseInt(useParams().channelId);
	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);

	const [chat, setChat] = useState("");
	const [prvChat, setPrvChat] = useState("");

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

	const handleSubmitPrv = async (e) => {
		e.preventDefault();

		if (prvChat) {
			const prvChatData = {
				pc_id: channelId,
				prvChat,
			};

			socket.emit("send_prv_chat", prvChatData);

			setPrvChat("");
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

		socket.on("edit_chat", (data) => {
			// dispatch edit chat
			dispatch(chatsActions.addEditChat(data.chat));
		});

		socket.on("delete_chat", (data) => {
			// dispatch delete chat
			dispatch(chatsActions.deleteChat(data.chat_id));
			// dispatch update channel
			dispatch(channelsActions.addEditChannel(data.channel));
		});

		socket.on("receive_prv_message", (data) => {
			// dispatch for channel
			dispatch(prvChatsActions.addEditPrvChat(data.prv_chat));
		});

		return () => {
			socket.emit("leave_channel", channelId);
			socket.disconnect();
		};
	}, [channelId, dispatch]);

	if (serverId) {
		return (
			<div className="chat-ctrl">
				<Chats socket={socket} />
				<InputChat chat={chat} setChat={setChat} handleSubmit={handleSubmit} />
			</div>
		);
	} else {
		return (
			<div className="chat-ctrl">
				<PrivateChats socket={socket} />
				<PrvInputChat
					prvChat={prvChat}
					setPrvChat={setPrvChat}
					handleSubmitPrv={handleSubmitPrv}
				/>
			</div>
		);
	}
};

export default Chat;
