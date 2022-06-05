import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTools } from "../../../context/Tools";

import EachUser from "./EachUser";
import { useEffect } from "react";

import * as userActions from "../../../store/users"

const Users = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.session.user)
	const serverId = parseInt(useParams().serverId);
	const server = useSelector((state) => state.servers.byId)[serverId];
	const users = useSelector((state) => state.users.byId);

	const { toggleUsers } = useTools();

	useEffect(() => {
		fetch("/api/users/all")
		.then((res) => res.json()).then((data) => {
			dispatch(userActions.getUsers(data.users))
		})
		.catch((err) => console.log(err));

		return () => {};
	}, [dispatch])

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
