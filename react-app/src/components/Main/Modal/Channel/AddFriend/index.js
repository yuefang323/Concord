import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as joinServersActions from "../../../../../store/joinServers";
import * as channelsActions from "../../../../../store/channels";
import * as chatsActions from "../../../../../store/chats";
import * as usersActions from "../../../../../store/users";
import * as prvChannelsActions from "../../../../../store/prvChannels";

const AddFriend = ({ setChoose, setShowModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();

    const [prvChannelId, setPrvChannelId] = useState()
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.byId);
    const prvChannels = useSelector((state) => state.prvChannels);
	const [errors, setErrors] = useState([]);

    const friendsList = Object.values(prvChannels.byId);
	// const [friedId, setFriendId] = useState();
	// const servers = useSelector((state) => state.servers.byId);
	// const friends = useSelector((state) => state.users);


	const join = async (e) => {
		e.preventDefault();
		if (prvChannelId) {
			setErrors([]);
			// Dispatch users
			// await dispatch(prvChannelsActions.getPrvChannels(prv_channels));
			setShowModal(false);
			history.push(`/channels/@me/`);
		} else {
			setErrors(["Please select a friend"]);
		}
	};

	return (
		<form onSubmit={join}>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Add a Friend</div>
				<div className="form-description">
					Search from below to add a friend
				</div>
				{errors && (
					<div className="error-list">
						{errors.map((error, idx) => (
							<div key={"error" + idx}>{error}</div>
						))}
					</div>
				)}
				<select
					className="select"
					value={prvChannelId}
					onChange={(e) => setPrvChannelId(parseInt(e.target.value, 10))}
				>
					<option>Select a Friend</option>
					{Object.values(users)
						.filter((user) => user.id !== friendsList.friend_id)
						.map((server) => (
							<option key={server?.id} value={server?.id}>
								{server?.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={() => setShowModal(false)}
				>
					Back
				</button>
				<button className="form-create-btm-btn" type="submit">
					Add a Friend
				</button>
			</div>
		</form>
	);
};

export default AddFriend;