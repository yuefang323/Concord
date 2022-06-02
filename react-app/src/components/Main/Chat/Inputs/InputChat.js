import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InputChat = ({ chat, setChat, handleSubmit }) => {
	const channelId = parseInt(useParams().channelId, 10);
	const channel = useSelector((state) => state.channels.byId)[channelId];

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
