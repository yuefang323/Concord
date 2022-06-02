import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { socket } from "../../../../context/Socket";

const InputChat = ({ chat, setChat, handleSubmit }) => {
	const channelId = parseInt(useParams().channelId, 10);
	const channels = useSelector((state) => state.channels);
	const channelsArr = channels.byId;
	const channel = useSelector((state) => state.channels.byId)[channelId];

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	// only send when there is chat input
	// 	if (chat) {
	// 		const chatData = {
	// 			channel_id: channelId,
	// 			chat,
	// 		};

	// 		socket.emit("send_chat", chatData);

	// 		// clear chat field
	// 		setChat("");
	// 	}
	// };

	return (
		<form className="chat-input-ctrl" onSubmit={handleSubmit}>
			<input
				className="chat-input"
				type="text"
				placeholder={`Message #${channel?.name}`}
				required
				value={chat}
				onChange={(e) => setChat(e.target.value)}
			/>
		</form>
	);
};

export default InputChat;
