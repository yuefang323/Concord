import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { useTools } from "../../../../context/Tools";

const TopRight = ({ server }) => {
	const channelId = useParams().channelId;
	const channel = useSelector((state) => state.channels.byId)[channelId];

	const { toggleUsers, setToggleUsers } = useTools();

	const toggleUser = () => {
		if (toggleUsers === "hidden") {
			setToggleUsers("");
		} else {
			setToggleUsers("hidden");
		}
	};

	return (
		<div className="top-other-wrap">
			<div className="top-other-left">
				<i className="fa-solid fa-hashtag"></i>
				<div>{channel?.name}</div>
			</div>
			<div className="top-other-right">
				{/* <i className="fa-solid fa-thumbtack"></i> */}
				<i
					className="fa-solid fa-user-group"
					data-tip="Hide Member List"
					onClick={toggleUser}
				></i>
				<ReactTooltip place="bottom" type="dark" effect="solid" />
			</div>
		</div>
	);
};

export default TopRight;
