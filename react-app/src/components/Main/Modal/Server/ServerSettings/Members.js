import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Search from "./Inputs/Search";
import Member from "./Member";

const Members = ({ server, onClose }) => {
	const users = useSelector((state) => state.users.byId);
	const member_ids = useSelector((state) => state.servers.byId)[server.id]
		.users;
	const [search, setSearch] = useState("");
	const [members, setMembers] = useState([]);

	useEffect(() => {
		setMembers(
			member_ids.filter((id) => {
				return users[id].username.toUpperCase().includes(search.toUpperCase());
			})
		);
	}, [search]);

	return (
		<form className="setting-server-overview-wrap">
			<div className="setting-server-overview-title">Server Members</div>
			<div className="members-header-wrap">
				<div>
					{server?.users?.length} Member
					{server?.users?.length > 1 && <span>s</span>}
				</div>
				<div>
					<Search search={search} setSearch={setSearch} />
				</div>
			</div>
			<div className="members-list">
				{members?.map((id) => (
					<Member user={users[id]} server={server} onClose={onClose} />
				))}
			</div>
		</form>
	);
};

export default Members;
