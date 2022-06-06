import { NavLink } from "react-router-dom";

import logo from "../../assets/logo-long.svg";

const Footer = () => {
	return (
		<footer className="splash-footer-wrap">
			<div className="splash-footer-top">
				<div className="splash-footer-title">
					IMAGINE A<br /> PLACE
				</div>
				<div>
					<div className="footer-list-title">Team Members</div>
					<li>
						<NavLink to="/about">Fang Yue</NavLink>
					</li>
					<li>
						<NavLink to="/about">Frances (Huang) Lau</NavLink>
					</li>
					<li>
						<NavLink to="/about">Lincoln Her</NavLink>
					</li>
				</div>
				<div>
					<div className="footer-list-title">Technologies Used</div>
					<li>
						<a href="https://www.docker.com/" target="_blank" rel="noreferrer">
							Docker
						</a>
					</li>
					<li>
						<a href="https://www.python.org/" target="_blank" rel="noreferrer">
							Python
						</a>
					</li>
					<li>
						<a
							href="https://flask.palletsprojects.com/en/2.1.x/"
							target="_blank"
							rel="noreferrer"
						>
							Flask
						</a>
					</li>
					<li>
						<a
							href="https://www.postgresql.org/"
							target="_blank"
							rel="noreferrer"
						>
							Postgres SQL
						</a>
					</li>
					<li>
						<a
							href="https://www.sqlalchemy.org/"
							target="_blank"
							rel="noreferrer"
						>
							SQL ALchemy
						</a>
					</li>
					<li>
						<a
							href="https://alembic.sqlalchemy.org/en/latest/"
							target="_blank"
							rel="noreferrer"
						>
							Alembic
						</a>
					</li>
					<li>
						<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
							React JS
						</a>
					</li>
					<li>
						<a href="https://redux.js.org/" target="_blank" rel="noreferrer">
							Redux
						</a>
					</li>
					<li>
						<a href="https://socket.io/" target="_blank" rel="noreferrer">
							Socket io
						</a>
					</li>
					{/* <li>
						<a
							href="https://aws.amazon.com/s3/"
							target="_blank"
							rel="noreferrer"
						>
							AWS S3
						</a>
					</li> */}
				</div>
			</div>
			<div className="splash-footer-bottom">
				<div className="logo">
					<img src={logo} alt="Concord" />
				</div>
				<div>
					<NavLink className="btn btn-yellow" exact to="/sign-up">
						Sign Up
					</NavLink>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
