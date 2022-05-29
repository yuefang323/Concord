import { Link, useParams } from "react-router-dom";

import WithLogo from "./WithLogo";
import NoLogo from "./NoLogo";

const Server = ({ server }) => {
	const serverId = parseInt(useParams().serverId, 10);

	return (
		<Link to={`/channels/${server.id}`} className="sidebar-btn-ctrl tooltip">
			{serverId === server?.id ? (
				<div className="sidebar-highlight sb-hl-active"></div>
			) : (
				<div className="sidebar-highlight"></div>
			)}
			{server.logo ? <WithLogo server={server} /> : <NoLogo server={server} />}
			{/* <div className="tooltiptext">{server?.name}</div> */}
		</Link>
	);
};

export default Server;
