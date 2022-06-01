import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as serversActions from "../../../../../store/servers";
import * as joinServersActions from "../../../../../store/joinServers";

import { socket } from "../../../../../context/Socket";

const AddServer = ({ setChoose, setShowModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const username = useSelector((state) => state.session.user).username;
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newServer = { name };
		const data = await dispatch(serversActions.addNewServer(newServer));
		if (data.joinServer) {
			await dispatch(joinServersActions.joinServer(data.joinServer));
			setShowModal(false);
			setChoose("create-join");

			// Web socket join channel
			const channelArr = data.server.channels;
			socket.emit("join_channels", channelArr);

			history.push(`/channels/${data.server.id}`);
		} else {
			setErrors(data);
		}
	};

	useEffect(() => {
		setName(`${username}'s server`);
	}, [username]);

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Customize your server</div>
				<div className="form-description">
					Give your new server a personality with a name and an icon. You can
					always change it later.
				</div>

				<label className="input-label">
					SERVER NAME
					<input
						className="input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<div className="input-desc">
						By creating a server, you agree to Concord's Community Guidelines
					</div>
				</label>
				<div className="error-list">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={() => setChoose("create-join")}
				>
					Back
				</button>
				<button className="form-create-btm-btn" type="submit">
					Create
				</button>
			</div>
		</form>
	);
};

export default AddServer;
