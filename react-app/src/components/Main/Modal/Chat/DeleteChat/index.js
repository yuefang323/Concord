import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Avatar from "../../../Chat/Inputs/Avatar";
import CreatedAt from "../../../Chat/Inputs/CreatedAt";

import * as chatsActions from "../../../../../store/chats";
import * as channelsActions from "../../../../../store/channels";

const DeleteChat = ({ chatId, onClose, socket }) => {
	const dispatch = useDispatch();

	const channelId = parseInt(useParams().channelId);
	const chat = useSelector((state) => state.chats.byId)[chatId];
	const user = useSelector((state) => state.users.byId)[chat?.user_id];

	const deleteMessage = async () => {
		// const payload = { chat_id: chatId, channel_id: channelId };
		// socket.emit("delete_chat", payload);
		const res = await dispatch(chatsActions.deleteThisChat(chatId));
		if (res.id) {
			await dispatch(channelsActions.addEditChannel(res));
			// socket.emit
		}
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
							<CreatedAt created_at={chat?.created_at} />
						</div>
						<div>{chat?.message}</div>
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
					onClick={deleteMessage}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteChat;
