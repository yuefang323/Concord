import { useParams } from "react-router-dom";

import Chats from "./Chats";
import PrivateChats from "./PrivateChats";
import InputChat from "./Inputs/InputChat";

const Chat = () => {
	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);

	if (serverId) {
		return (
			<div className="chat-ctrl">
				<Chats />
				<InputChat />
			</div>
		);
	} else {
		return (
			<div className="chat-ctrl">
				<PrivateChats />
				{/* <InputChat /> */}
			</div>
		);
	}
};

export default Chat;
