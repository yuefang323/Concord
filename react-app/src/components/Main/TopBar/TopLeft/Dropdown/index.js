import { useSelector } from "react-redux";

import ServerSettings from "./ServerSettings";
import CreateChannel from "./CreateChannel";
import LeaveServer from "./LeaveServer";

const Dropdown = ({ server, openModal, setModalType }) => {
	const user = useSelector((state) => state.session.user);
	const owner = user?.id === server?.user_id;

	return (
		<div className="top-dropdown">
			{owner && (
				<>
					<ServerSettings server={server} openModal={openModal} />
					<CreateChannel server={server} openModal={openModal} />
				</>
			)}
			{!owner && <LeaveServer server={server} openModal={openModal} />}
		</div>
	);
};

export default Dropdown;
