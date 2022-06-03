import { useSelector } from "react-redux";

import background from "../../../assets/explore.jpeg";

import ServerCards from "./ServerCards";

const ExplorePage = () => {
	const servers = useSelector((state) => state.servers.byId);

	return (
		<div className="explore-ctrl">
			<div
				className="explore-banner"
				style={{ backgroundImage: `url('${background}')` }}
			>
				Explore the infinite possiblities...
			</div>
			<div className="explore-discover">Discover</div>
			<div className="explore-servers">
				{Object.values(servers).map((server) => (
					<ServerCards key={server.id} server={server} />
				))}
			</div>
		</div>
	);
};

export default ExplorePage;
