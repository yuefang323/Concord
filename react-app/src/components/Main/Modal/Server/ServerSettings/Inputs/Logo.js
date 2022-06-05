import { useDispatch } from "react-redux";

import upload_photo from "../../../../../../assets/upload_photo.svg";
import * as serversActions from "../../../../../../store/servers";

const Logo = ({ server, errors, setErrors, onOpenLogo }) => {
	const dispatch = useDispatch();

	const removeLogo = async (e) => {
		e.preventDefault();
		const res = await dispatch(serversActions.removeServerLogo(server.id));
		if (!res.server) {
			setErrors(res);
		}
	};

	if (server?.logo) {
		return (
			<div className="setting-server-overview-logo-wrap" onClick={onOpenLogo}>
				<div
					style={{ backgroundImage: `url(${server?.logo})` }}
					className="setting-server-logo"
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
			</div>
		);
	} else {
		return (
			<div className="setting-server-overview-logo-wrap">
				<div className="setting-server-no-logo" onClick={onOpenLogo}>
					<div>LINK</div>
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
			</div>
		);
	}
};

export default Logo;
