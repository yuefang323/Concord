import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearChannels } from "../../store/channels";
import { clearChats } from "../../store/chats";
import { clearJoinServers} from "../../store/joinServers";
import { clearPrvChannels } from "../../store/prvChannels";
import { clearPrvChats } from "../../store/prvChats";
import { clearServers} from "../../store/servers";
import { logout } from "../../store/session";
import { clearUsers} from "../../store/users"
import ReactTooltip from "react-tooltip";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const onLogout = async (e) => {
        dispatch(clearChannels());
        dispatch(clearChats());
        dispatch(clearJoinServers());
        dispatch(clearPrvChannels());
        dispatch(clearPrvChats());
        dispatch(clearServers());
        dispatch(clearUsers());
		await dispatch(logout());
		history.push("/");
	};

	return (
		<div className="sidebar-btn-ctrl" data-tip="Logout">
			<div
				id="logout"
				onClick={onLogout}
				className="sidebar-btn sidebar-btn-dark"
			>
				<i className="fa-solid fa-right-from-bracket sidebar-icon"></i>
			</div>
			<ReactTooltip place="right" type="dark" effect="solid" />
		</div>
	);
};

export default LogoutButton;
