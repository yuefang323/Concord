import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PrvInputChat = ({ prvChat, setPrvChat, handleSubmitPrv }) => {
	const prvChannelId = parseInt(useParams().channelId, 10);

	const prvChannel = useSelector((state) => state.prvChannels?.byId)[prvChannelId];

    const users = useSelector((state) => state.users?.byId)

	const user = useSelector((state) => state.session?.user)

    const usersArr = Object.values(users)

    const friendName = usersArr.find(user => user.id === prvChannel?.friend_id)

    const owner = usersArr.find(user => user.id === prvChannel?.user_id)

	const [friend, setFriend] = useState()

	useEffect(() => {
		if (owner?.id === user?.id) {
			setFriend(friendName)
		} else {
			setFriend(owner)
		}

	}, [prvChannelId])

	return (
		<form className="chat-input-ctrl" onSubmit={handleSubmitPrv}>
			<input
				className="chat-input"
				type="text"
				placeholder={`Message @${ friend?.username }`}
				required
				value={prvChat}
				onChange={(e) => setPrvChat(e.target.value)}
			/>
		</form>
	);
};

export default PrvInputChat;
