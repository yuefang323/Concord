import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import WithLogo from "./WithLogo";
import NoLogo from "./NoLogo";

const Server = ({ server }) => {
	const serverParam = useParams().serverId;
	const serverId =
		serverParam === "@me" ? serverParam : parseInt(serverParam, 10);
	const servers = useSelector((state) => state.servers);
	const prvChannels = useSelector((state) => state.prvChannels);

	let firstChannelId;

	if (serverId === "@me") {
		firstChannelId = prvChannels.allIds[0];
	} else {
		firstChannelId = servers.byId[serverId].channels[0];
	}

	return (
		<Link
			to={`/channels/${server.id}/${firstChannelId}`}
			className="sidebar-btn-ctrl tooltip"
		>
			{serverId === server?.id ? (
				<div className="sidebar-highlight sb-hl-active"></div>
			) : (
				<div className="sidebar-highlight"></div>
			)}
			{server.logo ? <WithLogo server={server} /> : <NoLogo server={server} />}
			<div className="tooltiptext">{server?.name}</div>
		</Link>
	);
};

export default Server;
