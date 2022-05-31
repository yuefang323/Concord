import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTools } from "../../../context/Tools";

import EachUser from "./EachUser";

const Users = () => {
	const serverId = parseInt(useParams().serverId);
	const server = useSelector((state) => state.servers.byId)[serverId];
	const users = useSelector((state) => state.users.byId);

	const { toggleUsers } = useTools();

	return (
		<div className={`users-ctrl ${toggleUsers}`}>
			<div className="users-title">MEMBERS-{server?.users?.length}</div>
			{server?.users.map((userId) => (
				<EachUser key={userId} user={users[userId]} server={server} />
			))}
		</div>
	);
};

export default Users;
