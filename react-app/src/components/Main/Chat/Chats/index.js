import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ChatDivs from "../Inputs/ChatDivs";

const Chats = () => {
	const channelId = useParams().channelId;
	const channel = useSelector((state) => state.channels.byId)[channelId];

	return (
		<div>
			{channel?.chats.map((chat) => (
				<ChatDivs chat={chat} key={chat?.id} />
			))}
		</div>
	);
};

export default Chats;
