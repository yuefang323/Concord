import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";

import bg from "../../assets/login-bg.svg";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const demoLogin = (e) => {
		e.preventDefault();
		return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-wrapper" style={{ backgroundImage: `url("${bg}")` }}>
			<div className="login-form-container">
				<form onSubmit={onLogin}>
					<div className="form-header">
						<h2>Welcome back!</h2>
						<p>We're so excited to see you again!</p>
					</div>
					<div className="error-list">
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div className="login-input">
						<label htmlFor="email">EMAIL</label>
						<input
							name="email"
							type="text"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
						/>
					</div>
					<div className="login-input">
						<label htmlFor="password">PASSWORD</label>
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
						/>
					</div>
					<div className="form-buttons">
						<button type="submit">Login</button>
						<button onClick={demoLogin}>Demo Login</button>
					</div>
				</form>
				<div className="register-link">
					Need an account?
					<Link to="/sign-up">Register</Link>
				</div>
				<div className="home-link">
					Return to Concord
					<Link to="/">Home</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
