import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ChatDivs from "../Inputs/ChatDivs";

const Chats = () => {
	const channelId = parseInt(useParams().channelId);
	const channel = useSelector((state) => state.channels.byId)[channelId];
	// const chats = useSelector((state) => state.chats.byId);

	return (
		<div className="chat-div-wrap">
			{channel?.chats?.map((chatId) => (
				<ChatDivs chatId={chatId} key={chatId} />
			))}
		</div>
	);
};

export default Chats;
