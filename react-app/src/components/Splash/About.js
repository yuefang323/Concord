import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import Footer from "./Footer";

import logo from "../../assets/logo-long.svg";
import frances from "../../assets/Frances_500_500.png";

const About = () => {
	const [errors, setErrors] = useState([]);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const demoLogin = (e) => {
		e.preventDefault();
		return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	if (user) return <Redirect to="/" />;
	return (
		<div className="splash">
			<nav className="splash-nav-bar">
				<NavLink to="/" className="logo">
					<img src={logo} alt="Concord" />
				</NavLink>
				<div className="splash-session-links">
					<NavLink className="btn" exact to="/about">
						About Us
					</NavLink>
					<button className="btn btn-yellow" onClick={demoLogin}>
						Demo Login
					</button>
					<NavLink className="btn btn-yellow" exact to="/login">
						Login
					</NavLink>
					<NavLink className="btn btn-yellow" exact to="/sign-up">
						Sign Up
					</NavLink>
				</div>
			</nav>
			<main className="about-ctrl">
				<div className="about-cards">
					<div className="about-photo">Photo Here</div>
					<div>Fang Yue</div>
					<div>Slogan</div>
					<div>Git & LinkedIn</div>
				</div>
				<div className="about-cards">
					<div className="about-photo">
						<img src={frances} alt="Frances" className="about-photo" />
					</div>
					<div className="about-name">Frances (Huang) Lau</div>
					<div className="about-slogan">Love crafting from scratch</div>
					<div>Git & LinkedIn</div>
				</div>
				<div className="about-cards">
					<div className="about-photo">Photo Here</div>
					<div>Lincoln Her</div>
					<div>Slogan</div>
					<div>Git & LinkedIn</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default About;
