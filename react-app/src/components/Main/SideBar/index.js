import { useSelector } from "react-redux";

import Home from "./Home";
import Server from "./Server";
import JoinServer from "./JoinServer";
// import Explore from "./Explore";

import LogoutButton from "../../auth/LogoutButton";

const SideBar = () => {
	const servers = useSelector((state) => state.servers);

	return (
		<div className="sidebar-ctrl">
			<div className="sidebar-top-ctrl">
				<Home />
				<div className="sidebar-div-wrap">
					<div className="sidebar-div"></div>
				</div>
				{servers?.allIds?.map((id) => (
					<Server key={id} server={servers.byId[id]} />
				))}
				<JoinServer />
				{/* <Explore /> */}
			</div>
			<div className="sidebar-btm-ctrl">
				<LogoutButton />
			</div>
		</div>
	);
};

export default SideBar;
