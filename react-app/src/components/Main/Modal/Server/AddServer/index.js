import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AddServer = ({ setChoose, setShowModal }) => {
	const username = useSelector((state) => state.session.user).username;
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name);
	};

	useEffect(() => {
		setName(`${username}'s server`);
	}, []);

	return (
		<form onSubmit={handleSubmit} handleSubmit>
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
					/>
					<div className="input-desc">
						By creating a server, you agree to Concord's Community Guidelines
					</div>
				</label>
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
