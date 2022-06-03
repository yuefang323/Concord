import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";

import EditDelete from "./EditDelete";

import * as chatsActions from "../../../../store/chats";

const ChatDivs = ({ chatId, socket }) => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.session.user).id;
	const channelId = parseInt(useParams().channelId);
	const users = useSelector((state) => state.users.byId);
	const chats = useSelector((state) => state.chats.byId);
	const [user, setUser] = useState();
	const [disabled, setDisabled] = useState(true);
	const [message, setMessage] = useState("");

	const owner = userId === chats[chatId]?.user_id;

	const editChat = async (e) => {
		e.preventDefault();
		// const chatData = { chat_id: chatId, message, channel_id: channelId };
		// socket.emit("edit_chat", chatData);
		if (message) {
			const chatData = { id: chatId, message, channel_id: channelId };
			const res = await dispatch(chatsActions.editChat(chatData));
			if (res.id) {
				// socket.emit("edit_chat", chatData);
			}
		}

		setDisabled(true);
	};

	useEffect(() => {
		setUser(users[chats[chatId]?.user_id]);
	}, [chats, chatId, users]);

	useEffect(() => {
		setMessage(chats[chatId]?.message);
	}, [chats, chatId]);

	return (
		<div className="chat-div-ctrl" id={chatId}>
			<Avatar user={user} />
			<div className="chat-message-ctrl">
				<div className="chat-user-wrap">
					<div className="chat-username">
						{users[chats[chatId]?.user_id]?.username}
					</div>
					<CreatedAt created_at={chats[chatId]?.created_at} />
				</div>

				<form onSubmit={editChat}>
					<input
						className="chat-div-input"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={disabled}
					/>
				</form>
			</div>
			{owner && (
				<EditDelete
					chatId={chatId}
					disabled={disabled}
					setDisabled={setDisabled}
					socket={socket}
				/>
			)}
		</div>
	);
};

export default ChatDivs;
