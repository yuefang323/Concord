import { Link, useParams } from "react-router-dom";

const Home = () => {
	const serverId = useParams().serverId;

	return (
		<Link to="/channels/@me" className="sidebar-btn-ctrl tooltip">
			{serverId === "@me" ? (
				<>
					<div className="sidebar-highlight sb-hl-active"></div>
					<div className="sidebar-btn sidebar-btn-active">
						<img
							src="/logo-red.svg"
							className="sidebar-btn-logo"
							alt="Concord"
						/>
					</div>
				</>
			) : (
				<>
					<div className="sidebar-highlight"></div>
					<div className="sidebar-btn sidebar-btn-home">
						<img
							src="/logo-red.svg"
							className="sidebar-btn-logo"
							alt="Concord"
						/>
					</div>
				</>
			)}

			<div className="tooltiptext">Home</div>
		</Link>
	);
};

export default Home;
