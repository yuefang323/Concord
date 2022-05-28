import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import './auth.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <div id="logout" onClick={onLogout}>
      <i className="fa-solid fa-right-from-bracket"></i>
      <div>Logout</div>
    </div>
  );
};

export default LogoutButton;
