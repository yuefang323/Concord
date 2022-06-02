import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ChatDivs from "../Inputs/ChatDivs";

const Chats = () => {
	const channelId = parseInt(useParams().channelId);
	const channel = useSelector((state) => state.channels.byId)[channelId];

	const focusRef = useRef();

	const sendChat = async () => {};

	useEffect(() => {
		if (focusRef) {
			focusRef.current.addEventListener("DOMNodeInserted", (e) => {
				const { currentTarget: target } = e;
				target.scroll({ top: target.scrollHeight, behavior: "smooth" });
			});
		}
	}, []);

	return (
		<div className="chat-div-wrap" ref={focusRef}>
			{channel?.chats?.map((chatId) => {
				return <ChatDivs chatId={chatId} key={chatId} />;
			})}
		</div>
	);
};

export default Chats;
