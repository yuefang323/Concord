import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

const TopBar = () => {
	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);
	const servers = useSelector((state) => state.servers);
	const server = servers.byId[serverId];
	const user = useSelector((state) => state.session.user);

	const greeting = (function () {
		const now = new Date().getHours();
		if (now < 12) return "Good morning,";
		else if (now < 18) return "Good afternoon,";
		else return "Good evening";
	})();

	if (serverParam) {
		return (
			<div className="top-ctrl">
				<TopLeft server={server} />
				<TopRight server={server} />
			</div>
		);
	} else {
		return (
			<div className="top-me-wrap">
				{greeting} {user?.username}!
			</div>
		);
	}
};

export default TopBar;
