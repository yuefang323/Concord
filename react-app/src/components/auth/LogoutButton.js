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
};

export default LogoutButton;
