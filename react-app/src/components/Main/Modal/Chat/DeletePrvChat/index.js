import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Avatar from "../../../Chat/Inputs/Avatar";
import CreatedAt from "../../../Chat/Inputs/CreatedAt";

const DeletePrvChat = ({ prvChatId, onClose, socket }) => {
	const prvChannelId = parseInt(useParams().channelId);
	const prvChat = useSelector((state) => state.prvChats.byId)[prvChatId];
	const user = useSelector((state) => state.users.byId)[prvChat?.user_id];

	const deletePrvMessage = async () => {
		const payload = { prv_chat_id: prvChatId, pc_id: prvChannelId };
		socket.emit("delete_prv_chat", payload);
		onClose();
	};

	return (
		<div className="form-ctrl form-sm">
			<div className="form-ctrl-wrap">
				<div className="form-h2">Delete Message</div>
				<div className="form-description">
					Are you sure you want to delete this message?
				</div>
				<div className="chat-div-ctrl">
					<Avatar user={user} />
					<div className="chat-message-ctrl">
						<div className="chat-user-wrap">
							<div className="chat-username">{user?.username}</div>
							<CreatedAt created_at={prvChat?.created_at} />
						</div>
						<div>{prvChat?.message}</div>
					</div>
				</div>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={onClose}
				>
					Cancel
				</button>
				<button
					className="form-create-btm-btn-red"
					type="submit"
					onClick={deletePrvMessage}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeletePrvChat;
