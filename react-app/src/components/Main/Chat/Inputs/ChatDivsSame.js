import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import CreatedAtShort from "./CreatedAtShort";

import EditDelete from "./EditDelete";

const ChatDivsSame = ({ chatId }) => {
	const userId = useSelector((state) => state.session.user).id;
	const users = useSelector((state) => state.users.byId);
	const chats = useSelector((state) => state.chats.byId);
	const [user, setUser] = useState();

	const owner = userId === chats[chatId].user_id;

	useEffect(() => {
		setUser(users[chats[chatId].user_id]);
	}, [chats]);

	return (
		<div className="chat-div-ctrl" id={chatId}>
			<div>
				<CreatedAtShort created_at={chats[chatId]?.created_at} />
			</div>
			<div className="chat-message-ctrl">
				<div>{chats[chatId]?.message}</div>
			</div>
			{owner && <EditDelete />}
		</div>
	);
};

export default ChatDivsSame;
