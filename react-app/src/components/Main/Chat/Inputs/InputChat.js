import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InputChat = () => {
	const channelId = useParams().channelId;
	const channel = useSelector((state) => state.channels.byId)[channelId];

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<form className="chat-input-ctrl" onSubmit={handleSubmit}>
			<input
				className="chat-input"
				type="text"
				placeholder={`Message #${channel?.name}`}
				required
			/>
		</form>
	);
};

export default InputChat;
