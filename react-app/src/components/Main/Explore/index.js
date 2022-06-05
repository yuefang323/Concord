import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import background from "../../../assets/explore.jpeg";
import ServerCards from "./ServerCards";
import * as serversActions from "../../../store/servers";

const ExplorePage = () => {
	const dispatch = useDispatch();
	const servers = useSelector((state) => state.servers.byId);

	useEffect(() => {
		dispatch(serversActions.getAllServers());
	}, [dispatch]);

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
