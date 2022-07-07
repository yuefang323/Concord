import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../../assets/logo-red.svg";
import { updateUser } from "../../../../../store/session";
// import { Modal } from "../../../../../context/Modal";
// import UserProfile from "../../../ChannelBar/UserProfile";
import EditUser from "./EditUserForm";
import "./EditUser.css";

const EditUserSettings = ({ onClose }) => {
	const [show, setShow] = useState("My Account");

	return (
		<div className="setting-modal-bg">
			<div className="setting-modal-left">
				<div className="setting-modal-left-wrap">
					<div className="setting-modal-menu-title">USER SETTINGS</div>
					<div
						className="setting-modal-menu"
						onClick={() => setShow("My Account")}
					>
						My Account
					</div>
				</div>
			</div>
			<div className="setting-modal-center">
				{show === "My Account" && <EditUser />}
			</div>
			<div className="setting-modal-right">
				<div className="setting-modal-right-wrap" onClick={onClose}>
					<i className="fa-regular fa-circle-xmark setting-close-icon"></i>
					<div className="setting-close-desc">Close</div>
				</div>
			</div>
		</div>
	);
};

export default EditUserSettings;
