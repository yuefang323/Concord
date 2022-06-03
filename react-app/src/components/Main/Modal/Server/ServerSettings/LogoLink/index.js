import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as serversActions from "../../../../../../store/servers";

const LogoLink = ({ server, onClose }) => {
	const dispatch = useDispatch();

	const [logoUrl, setLogoUrl] = useState("");
	const [bgUrl, setBgUrl] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (logoUrl || bgUrl) {
			const serverToUpdate = { ...server, logo: logoUrl, background: bgUrl };
			// dispatch
			const res = await dispatch(serversActions.editServer(serverToUpdate));
			if (!res.errors) {
				onClose();
			} else {
				setErrors(res.errors);
			}
		}
	};

	useEffect(() => {
		setLogoUrl(server.logo);
		setBgUrl(server.background);
	}, [server]);

	return (
		<div className="form-ctrl form-sm">
			<div className="form-ctrl-wrap">
				<div className="form-h2">Upload Logo for {server.name}</div>
				<label className="input-label">
					URL for Logo
					<input
						className="input"
						type="text"
						value={logoUrl}
						onChange={(e) => setLogoUrl(e.target.value)}
					/>
					<div className="input-desc">
						File type can only be png, gif, jpg, or svg
					</div>
				</label>
				<label className="input-label">
					URL for Background
					<input
						className="input"
						type="text"
						value={bgUrl}
						onChange={(e) => setBgUrl(e.target.value)}
					/>
					<div className="input-desc">
						File type can only be png, gif, jpg, or svg
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
					onClick={onClose}
				>
					Cancel
				</button>
				<button
					className="form-create-btm-btn"
					type="submit"
					onClick={handleSubmit}
				>
					Update
				</button>
			</div>
		</div>
	);
};

export default LogoLink;
