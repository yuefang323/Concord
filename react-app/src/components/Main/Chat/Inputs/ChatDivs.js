import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";

import EditDelete from "./EditDelete";

const ChatDivs = ({ chatId, socket }) => {
	const userId = useSelector((state) => state.session.user).id;
	const channelId = parseInt(useParams().channelId);
	const users = useSelector((state) => state.users.byId);
	const chats = useSelector((state) => state.chats.byId);
	const [user, setUser] = useState();
	const [showInput, setShowInput] = useState(false);
	const [message, setMessage] = useState("");

	const owner = userId === chats[chatId]?.user_id;

	const editChat = async (e) => {
		e.preventDefault();
		const chatData = { chat_id: chatId, message, channel_id: channelId };
		socket.emit("edit_chat", chatData);
		setShowInput(false);
	};

	useEffect(() => {
		setUser(users[chats[chatId]?.user_id]);
	}, [chats, chatId, users]);

	useEffect(() => {
		setMessage(chats[chatId]?.message);
	}, [chats]);

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

				{showInput ? (
					<form onSubmit={editChat}>
						<input
							className="input"
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</form>
				) : (
					<div>{message}</div>
				)}
			</div>
			{owner && (
				<EditDelete
					chatId={chatId}
					showInput={showInput}
					setShowInput={setShowInput}
					socket={socket}
				/>
			)}
		</div>
	);
};

export default ChatDivs;
