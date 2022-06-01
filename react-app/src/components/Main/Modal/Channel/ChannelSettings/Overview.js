import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as channelssActions from "../../../../../store/channels";

const ChannelOverview = ({ channel, onClose }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const channelToUpdate = { id: channel.id, name };
		const res = await dispatch(channelssActions.editChannel(channelToUpdate));
		if (res.channel) {
			onClose();
		} else {
			setErrors(res);
		}
	};

	const cancelEdit = () => {
		setName(channel.name);
		setErrors([]);
	};

	useEffect(() => {
		setName(channel?.name);
	}, [channel]);

	return (
		<form className="setting-server-overview-wrap" onSubmit={handleSubmit}>
			<div className="setting-server-overview-title">Channel Overview</div>
			<label className="input-label">
                CHANNEL NAME
				<textarea
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="textarea"
				/>
			</label>
			<div className="error-list">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="setting-button-wrap">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={cancelEdit}
				>
					Cancel
				</button>
				<button className="form-create-btm-btn" type="submit">
					Update
				</button>
			</div>
		</form>
	);
};

export default ChannelOverview;