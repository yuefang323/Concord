import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import logo from "../../../../assets/logo-red.svg";

const Home = () => {
	const serverId = useParams().serverId;
	const firstPrivateChannelId = useSelector(
		(state) => state.prvChannels.allIds[0]
	);

	return (
		<Link
			to={`/channels/@me/${firstPrivateChannelId}`}
			className="sidebar-btn-ctrl"
		>
			{serverId === "@me" ? (
				<>
					<div className="sidebar-highlight sb-hl-active"></div>
					<div className="sidebar-btn sidebar-btn-active">
						<img src={logo} className="sidebar-btn-logo" alt="Concord" />
					</div>
				</>
			) : (
				<>
					<div className="sidebar-highlight"></div>
					<div className="sidebar-btn sidebar-btn-home">
						<img src={logo} className="sidebar-btn-logo" alt="Concord" />
					</div>
				</>
			)}
		</Link>
	);
};

export default Home;
