import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import SplashPage from "./Splash";

const NavBar = () => {
	return (
		<nav className="nav-container">
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to="/sign-up" exact={true} activeClassName="active">
						Sign Up
					</NavLink>
				</li>
				<li></li>
			</ul>
		</nav>
	);
};

export default NavBar;
