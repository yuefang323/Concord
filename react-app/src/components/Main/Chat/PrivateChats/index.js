import { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import PrvAvatar from "../PrivateInputs/PrvAvatar";

import PrvChatDivs from "../PrivateInputs/PrvChatDivs"


const PrivateChats = ({ socket }) => {
	const prvChannelId = parseInt(useParams().channelId)

	const prvChannels = useSelector((state) => state.prvChannels?.byId)

	const prvChannel = useSelector((state) => state.prvChannels?.byId)[prvChannelId];

	const users = useSelector((state) => state.users?.byId)

    const usersArr = Object.values(users)

    const friendName = usersArr.find(user => user.id === prvChannel?.friend_id)

    const friendOfOther = usersArr.find(user => user.id === prvChannel?.user_id)

	const [friend, setFriend] = useState()

	const focusRef = useRef();

	// console.log(prvChannelId)

	// useEffect(() => {
	// 	if (focusRef) {
	// 		focusRef.current.addEventListener("DOMNodeInserted", (e) => {
	// 			const { currentTarget: target } = e;
	// 			target.scroll({ top: target.scrollHeight, behavior: "smooth" });
	// 		});
	// 	}
	// }, []);

	useEffect(() => {
		if (friendName) {
			setFriend(friendName)
		} else {
			setFriend(friendOfOther)
		}
	}, [prvChannelId])


	// My Change
	if (prvChannels[prvChannelId] && prvChannels[prvChannelId].prvChats.length) {
		return (
			<div className="chat-div-wrap" ref={focusRef}>
					{prvChannels[prvChannelId]?.prvChats.map((prvChatId) => {
					return <PrvChatDivs prvChatId={prvChatId} key={prvChatId} socket={socket} />;
				})}
			</div>
		)
	} else {
		return (
			<div className="chat-div-wrap-empty" >
				<div className="chat-big-hash-div prv">
					{friendName?.avatar ? (<img src={friendName?.avatar} alt='friend avatar' className="chat-big-hash-div prv" />) : (
						<PrvAvatar friend={friend} />
					)}
				</div>
				<div className="chat-empty-title">
					<h2 style={{ margin: "0px"}}>{!friendName ? friendOfOther?.username : friendName?.username}</h2>
				</div>
				<div className="chat-empty-desc">
					This is the start of your direct message history with @{!friendName ? friendOfOther?.username : friendName?.username}.
				</div>
			</div>
		);
	}
};

export default PrivateChats;
