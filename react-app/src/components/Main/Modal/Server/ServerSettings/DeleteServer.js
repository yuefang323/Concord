import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { socket } from "../../../../../context/Socket";

import * as serversActions from "../../../../../store/servers";
import * as joinServersActions from "../../../../../store/joinServers";
import * as channelsActions from "../../../../../store/channels";
import * as chatsActions from "../../../../../store/chats";

const DeleteServer = ({ server, onClose }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const serverToDelete = { id: server.id, name };

		// Thunks to delete server
		const res = await dispatch(serversActions.deleteThisServer(serverToDelete));

		if (!res.errors) {
			history.push("/channels/@me");
			onClose();
			console.log(res);
			// dispatch action to update join server
			dispatch(joinServersActions.leaveServer(server.id));

			// socket emit leave channels
			socket.emit("leave_channels", res.channels);

			// dispatch action to update channels
			res.channels.forEach((channelId) => {
				dispatch(channelsActions.deleteChannels(channelId));
			});

			// dispatch action to update chats
			res.chats.forEach((chatId) => {
				dispatch(chatsActions.deleteChat(chatId));
			});
		} else {
			setErrors(res.errors);
		}
	};

	return (
		<form className="setting-server-overview-wrap" onSubmit={handleSubmit}>
			<div className="setting-server-overview-title">
				Delete '{server?.name}'
			</div>
			<div className="setting-delete-server-waring">
				Are you sure you want to delete{" "}
				<span className="bold">{server?.name}</span>? This action cannot be
				undone.
			</div>
			<label>
				ENTER SERVER NAME
				<input
					type="text"
					className="input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</label>
			<div className="error-list">
				{errors && errors.map((error, ind) => <div key={ind}>{error}</div>)}
			</div>
			<div className="setting-button-wrap">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={onClose}
				>
					Cancel
				</button>
				<button className="form-create-btm-btn-red" type="submit">
					Delete Server
				</button>
			</div>
		</form>
	);
};

export default DeleteServer;
