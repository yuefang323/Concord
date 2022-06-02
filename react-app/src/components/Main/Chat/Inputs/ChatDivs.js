import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";

import EditDelete from "./EditDelete";

const ChatDivs = ({ chatId }) => {
	const userId = useSelector((state) => state.session.user).id;
	const users = useSelector((state) => state.users.byId);
	const chats = useSelector((state) => state.chats.byId);
	const [user, setUser] = useState();

	const owner = userId === chats[chatId]?.user_id;

	useEffect(() => {
		setUser(users[chats[chatId]?.user_id]);
	}, [chats, chatId, users]);

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
				<div>{chats[chatId]?.message}</div>
			</div>
			{owner && <EditDelete chatId={chatId} />}
		</div>
	);
};

export default ChatDivs;
