import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import CreatedAtShort from "./CreatedAtShort";

// import EditDelete from "./EditDelete";

const ChatDivsSame = ({ prvChatId }) => {
	const userId = useSelector((state) => state.session.user).id;
	const users = useSelector((state) => state.users.byId);
	const prvChats = useSelector((state) => state.prvChats.byId);
	// const [user, setUser] = useState();

	const owner = userId === prvChats[prvChatId].user_id;

	useEffect(() => {
		setUser(users[prvChats[prvChatId].user_id]);
	}, [prvChats, prvChatId]);

	return (
		<div className="chat-div-ctrl" id={prvChatId}>
			<div>
				{/* <CreatedAtShort created_at={prvChats[prvChatId]?.created_at} /> */}
			</div>
			<div className="chat-message-ctrl">
				<div>{prvChats[prvChatId]?.message}</div>
			</div>
			{/* {owner && <EditDelete />} */}
		</div>
	);
};

export default ChatDivsSame;
