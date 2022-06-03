import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Avatar from "../Inputs/Avatar";
import CreatedAt from "../Inputs/CreatedAt"

import PrvEditDelete from "./PrvEditDelete";

const PrvChatDivs = ({ prvChatId, socket }) => {
	const userId = useSelector((state) => state.session.user).id;
    const prvChannelId = parseInt(useParams().channelId)
	const users = useSelector((state) => state.users.byId);
    const prvChats = useSelector((state) => state.prvChats.byId)
	const [user, setUser] = useState();
	const [disabled, setDisabled] = useState(true);
	const [prvMessage, setPrvMessage] = useState("");

	const owner = userId === prvChats[prvChatId]?.user_id;

    // console.log(prvChannelId)

	const editPrvChat = async (e) => {
		e.preventDefault();
		const prvChatData = { prv_chat_id: prvChatId, prvMessage, pc_id: prvChannelId };
		socket.emit("edit_prv_chat", prvChatData);
		setDisabled(true);
	};

	useEffect(() => {
		setUser(users[prvChats[prvChatId]?.user_id]);
	}, [prvChats, prvChatId, users]);

	useEffect(() => {
		setPrvMessage(prvChats[prvChatId]?.message);
	}, [prvChats, prvChatId]);

	return (
		<div className="chat-div-ctrl" id={prvChatId}>
			<Avatar user={user} />
			<div className="chat-message-ctrl">
				<div className="chat-user-wrap">
					<div className="chat-username">
						{users[prvChats[prvChatId]?.user_id]?.username}
					</div>
					<CreatedAt created_at={prvChats[prvChatId]?.created_at} />
				</div>

				<form onSubmit={editPrvChat}>
					<input
						className="chat-div-input"
						type="text"
						value={prvMessage}
						onChange={(e) => setPrvMessage(e.target.value)}
						disabled={disabled}
					/>
				</form>
			</div>
			{owner && (
				<PrvEditDelete
					prvChatId={prvChatId}
					disabled={disabled}
					setDisabled={setDisabled}
					socket={socket}
				/>
			)}
		</div>
	);
};

export default PrvChatDivs;
