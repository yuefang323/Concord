import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PrvAvatar from "./PrvAvatar";
import CreatedAt from "../Inputs/CreatedAt"

import EditDelete from "../Inputs/EditDelete";

const PrvChatDivs = ({ prvChatId, socket }) => {
	const userId = useSelector((state) => state.session.user).id;
    const prvChannelId = parseInt(useParams().channelId)
    console.log(prvChannelId)
	const users = useSelector((state) => state.users.byId);
    const prvChats = useSelector((state) => state.prvChats.byId)
	const [user, setUser] = useState();
	const [disabled, setDisabled] = useState(true);
	const [prvMessage, setPrvMessage] = useState("");

	const owner = userId === prvChats[prvChatId]?.user_id;

    // const name = users[prvChats[prvChatId]?.user_id]?.username
    // console.log(name)

	// const editChat = async (e) => {
	// 	e.preventDefault();
	// 	const chatData = { chat_id: chatId, message, channel_id: channelId };
	// 	socket.emit("edit_chat", chatData);
	// 	setDisabled(true);
	// };

	useEffect(() => {
		setUser(users[prvChats[prvChatId]?.user_id]);
	}, [prvChats, prvChatId, users]);

	useEffect(() => {
		setPrvMessage(prvChats[prvChatId]?.prvMessage);
	}, [prvChats, prvChatId]);

	return (
        <h2>PrivateDivChats</h2>
		// <div className="chat-div-ctrl" id={prvChatId}>
		// 	<PrvAvatar user={user} />
		// 	<div className="chat-message-ctrl">
		// 		<div className="chat-user-wrap">
		// 			<div className="chat-username">
		// 				{users[prvChats[prvChatId]?.user_id]?.username}
		// 			</div>
		// 			<CreatedAt created_at={prvChats[prvChatId]?.created_at} />
		// 		</div>

		// 		<form onSubmit={editChat}>
		// 			<input
		// 				className="chat-div-input"
		// 				type="text"
		// 				value={message}
		// 				onChange={(e) => setMessage(e.target.value)}
		// 				disabled={disabled}
		// 			/>
		// 		</form>
		// 	</div>
		// 	{owner && (
		// 		<EditDelete
		// 			chatId={chatId}
		// 			disabled={disabled}
		// 			setDisabled={setDisabled}
		// 			socket={socket}
		// 		/>
		// 	)}
		// </div>
	);
};

export default PrvChatDivs;
