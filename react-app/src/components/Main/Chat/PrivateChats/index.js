import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PrvAvatar from "../PrivateInputs/PrvAvatar";

import PrvChatDivs from "../PrivateInputs/PrvChatDivs";

const PrivateChats = ({ socket }) => {
	const prvChannelId = parseInt(useParams().channelId);

	const prvChannels = useSelector((state) => state.prvChannels?.byId);

	const prvChannel = useSelector((state) => state.prvChannels?.byId)[
		prvChannelId
	];

	const users = useSelector((state) => state.users?.byId);

	const user = useSelector((state) => state.session.user);

	const usersArr = Object.values(users);

	const friendName = usersArr.find((user) => user.id === prvChannel?.friend_id);

	const owner = usersArr.find((user) => user.id === prvChannel?.user_id);

	const [friend, setFriend] = useState();

	const focusRef = useRef();

	useEffect(() => {
		if (focusRef) {
			focusRef.current.addEventListener("DOMNodeInserted", (e) => {
				const { currentTarget: target } = e;
				target.scroll({ top: target.scrollHeight, behavior: "smooth" });
			});
		}
	}, []);

	useEffect(() => {
		if (owner?.id === user?.id) {
			setFriend(friendName);
		} else {
			setFriend(owner);
		}
	}, [prvChannelId]);

	if (prvChannels[prvChannelId] && prvChannels[prvChannelId].prvChats.length) {
		return (
			<div className="chat-div-wrap" ref={focusRef}>
				{prvChannels[prvChannelId]?.prvChats.map((prvChatId) => {
					return (
						<PrvChatDivs
							prvChatId={prvChatId}
							key={prvChatId}
							socket={socket}
						/>
					);
				})}
			</div>
		);
	} else if (!friend) {
		return (
			<div className="chat-start" ref={focusRef}>
				Start by joining a server or create one yourself!
			</div>
		);
	} else {
		return (
			<div className="chat-div-wrap-empty" ref={focusRef}>
				<div className="chat-big-hash-div prv">
					{friend?.avatar ? (
						<img
							src={friend?.avatar}
							alt="friend avatar"
							className="chat-big-hash-div prv"
						/>
					) : (
						<PrvAvatar friend={friend} />
					)}
				</div>
				<div className="chat-empty-title">
					<h2 style={{ margin: "0px" }}>{friend?.username}</h2>
				</div>
				<div className="chat-empty-desc">
					This is the start of your direct message history with @
					{friend?.username}.
				</div>
			</div>
		);
	}
};

export default PrivateChats;
