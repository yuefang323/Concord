import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import logo from "../../assets/logo-long.svg";
import mountain from "../../assets/splash-mountain.svg";
import monster1 from "../../assets/splash-monster1.svg";
import monster2 from "../../assets/splash-monster2.svg";
import sample from "../../assets/splash-sample.svg";

import Footer from "./Footer";

const SplashPage = () => {
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

	if (user) return <Redirect to="/main" />;

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
			{errors && errors.map((error) => <div>{error}</div>)}
			<main>
				<div
					className="splash-bg-wrap"
					style={{ backgroundImage: `url(${mountain})` }}
				>
					<img src={monster1} alt="Monsters" className="splash-monsters1" />
					<img src={monster2} alt="Monsters" className="splash-monsters2" />
					<div className="splas-title-wrap">
						<div className="splash-title">IMAGINE A PLACE...</div>
						<div className="splash-desc">
							...where you can belong to a school club, a gaming group, or a
							worldwide art community. Where just you and a handful of friends
							can spend time together. A place that makes it easy to talk every
							day and hang out more often.
						</div>
						<button className="btn btn-yellow" onClick={demoLogin}>
							Demo Login
						</button>
					</div>
				</div>
				<div className="splash-sample-wrap">
					<img src={sample} alt="sample" />
					<div className="splash-sample-title-wrap">
						<div className="splash-sample-title">
							Create an invite-only place where you belong
						</div>
						<p className="splash-sample-desc">
							Discord servers are organized into topic-based channels where you
							can collaborate, share, and just talk about your day without
							clogging up a group chat.
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default SplashPage;
