import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import ReactTooltip from "react-tooltip";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const onLogout = async (e) => {
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
