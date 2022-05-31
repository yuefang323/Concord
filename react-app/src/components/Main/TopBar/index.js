import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

const TopBar = () => {
	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);
	const servers = useSelector((state) => state.servers);
	const server = servers.byId[serverId];

	if (serverParam) {
		return (
			<div className="top-ctrl">
				<TopLeft server={server} />
				<TopRight server={server} />
			</div>
		);
	} else {
		return <div className="top-ctrl">Me</div>;
	}
};

export default TopBar;
