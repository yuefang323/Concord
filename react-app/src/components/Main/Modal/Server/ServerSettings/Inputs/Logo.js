import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import upload_photo from "../../../../../../assets/upload_photo.svg";
import * as serversActions from "../../../../../../store/servers";

const Logo = ({ server, errors, setErrors }) => {
	const dispatch = useDispatch();

	const [logo, setLogo] = useState("");
	const uploadLogoRef = useRef();

	const uploadLogoClick = (e) => {
		uploadLogoRef.current.click();
	};

	const removeLogo = async (e) => {
		e.preventDefault();
		const res = await dispatch(serversActions.removeServerLogo(server.id));
		if (!res.server) {
			setErrors(res);
		}
	};

	if (server?.logo) {
		return (
			<div className="setting-server-overview-logo-wrap">
				<div
					style={{ backgroundImage: `url(${server?.logo})` }}
					className="setting-server-logo"
					onClick={uploadLogoClick}
				>
					<div>CHANGE</div>
					<div>ICON</div>
				</div>
				<button
					type="button"
					className="setting-remove-button"
					onClick={removeLogo}
				>
					Remove
				</button>
				<div className="setting-server-logo-upload">
					<img src={upload_photo} alt="Upload" />
				</div>
				<input
					type="file"
					id="file"
					ref={uploadLogoRef}
					style={{ display: "none" }}
				/>
			</div>
		);
	} else {
		return (
			<div className="setting-server-overview-logo-wrap">
				<div className="setting-server-no-logo" onClick={uploadLogoClick}>
					<div>UPLOAD</div>
					<div>LOGO</div>
				</div>
				<button
					type="button"
					className="setting-remove-button"
					onClick={removeLogo}
				>
					Remove
				</button>
				<div className="setting-server-logo-upload">
					<img src={upload_photo} alt="Upload" />
				</div>
				<input
					type="file"
					id="file"
					ref={uploadLogoRef}
					style={{ display: "none" }}
				/>
			</div>
		);
	}
};

export default Logo;
