import { Link, useParams } from "react-router-dom";

const Home = () => {
	const serverId = useParams().serverId;

	return (
		<Link to="/channels/@me" className="sidebar-btn-ctrl">
			{serverId === "@me" ? (
				<div className="sidebar-highlight sb-hl-active"></div>
			) : (
				<div className="sidebar-highlight"></div>
			)}
			<div className="sidebar-btn">
				<img src="/logo-red.svg" className="sidebar-btn-logo" alt="Concord" />
			</div>
		</Link>
	);
};

export default Home;
