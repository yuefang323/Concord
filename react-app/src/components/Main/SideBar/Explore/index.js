import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Explore = () => {
	return (
		<Link className="sidebar-btn-ctrl" data-tip="Explore" to="/guild-discovery">
			<div className="sidebar-highlight"></div>
			<div className="sidebar-btn sidebar-btn-dark">
				<i className="fa-solid fa-compass sidebar-icon"></i>
			</div>
			<ReactTooltip place="right" type="dark" effect="solid" />
		</Link>
	);
};

export default Explore;
