import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PrvInputChat = ({ prvChat, setPrvChat, handleSubmitPrv }) => {
	const prvChannelId = parseInt(useParams().channelId, 10);
	const prvChannel = useSelector((state) => state.prvChannels?.byId)[prvChannelId];
    const users = useSelector((state) => state.users?.byId)
    const usersArr = Object.values(users)
    const friendName = usersArr.find(user => user.id === prvChannel?.friend_id)
    const friendOfOther = usersArr.find(user => user.id === prvChannel?.user_id)

	return (
		<form className="chat-input-ctrl" onSubmit={handleSubmitPrv}>
			<input
				className="chat-input"
				type="text"
				placeholder={`Message @${!friendName ? friendOfOther?.username : friendName?.username}`}
				required
				value={prvChat}
				onChange={(e) => setPrvChat(e.target.value)}
			/>
		</form>
	);
};

export default PrvInputChat;
