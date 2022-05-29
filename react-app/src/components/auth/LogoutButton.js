import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

<<<<<<< HEAD
	return (
		<div className="sidebar-btn-ctrl tooltip">
			<div
				id="logout"
				onClick={onLogout}
				className="sidebar-btn sidebar-btn-dark"
			>
				<i className="fa-solid fa-right-from-bracket sidebar-icon"></i>
			</div>
			<div className="tooltiptext">Logout</div>
		</div>
	);
=======
  return (
    <div className="sidebar-btn-ctrl">
      <div
        id="logout"
        onClick={onLogout}
        className="sidebar-btn sidebar-btn-dark"
      >
        <i className="fa-solid fa-right-from-bracket sidebar-icon"></i>
      </div>
    </div>
  );
>>>>>>> main
};

export default LogoutButton;
