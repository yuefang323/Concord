import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import CreatedAt from "./CreatedAt";

const ChatDivs = ({ chat }) => {
	const users = useSelector((state) => state.users.byId);

	return (
		<div className="chat-div-ctrl" id={chat?.id}>
			<Avatar user={users[chat?.user_id]} />
			<div className="chat-message-ctrl">
				<div className="chat-user-wrap">
					<div className="chat-username">{users[chat?.user_id]?.username}</div>
					<CreatedAt created_at={chat?.created_at} />
				</div>
				<div>{chat?.message}</div>
			</div>
		</div>
	);
};

export default ChatDivs;
