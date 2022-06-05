import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import Footer from "./Footer";

import logo from "../../assets/logo-long.svg";
import frances from "../../assets/Frances_500_500.png";
import lincoln from "../../assets/Lincoln.png"

import git from "../../assets/git-logo.png";
import linkedin from "../../assets/linkedin-logo.png";

const About = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
            const data = await res.json();
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
            <div className="team-members">Team Members</div>
            <main className="about-ctrl">
                <div className="about-cards">
                    <div className="about-photo"><img
                            src="https://t4.ftcdn.net/jpg/02/78/70/99/360_F_278709964_PhS3MsOE9udVYb5VCin1xCQJlm3HFb9V.jpg"
                            alt="Fang"
                            className="about-photo"
                        /></div>
                    <div>Fang Yue</div>
                    <div className="about-slogan">
                        Success is the sum of small efforts
                    </div>
                    <div className="about-icon-wrap">
                        <a
                            href="https://github.com/yuefang323"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={git}
                                alt="GitHub"
                                className="about-icon"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/fang-yue-7b3091241/" target="_blank" rel="noreferrer">
                            <img
                                src={linkedin}
                                alt="Linked In"
                                className="about-icon"
                            />
                        </a>
                        {/* <a href="#" target="_blank" rel="noreferrer">
							<img src={linkedin} alt="Linked In" className="about-icon" />
						</a> */}
                    </div>
                </div>
                <div className="about-cards">
                    <div className="about-photo">
                        <img
                            src={frances}
                            alt="Frances"
                            className="about-photo"
                        />
                    </div>
                    <div className="about-name">Frances (Huang) Lau</div>
                    <div className="about-slogan">
                        Love crafting from scratch
                    </div>
                    <div className="about-icon-wrap">
                        <a
                            href="https://github.com/frances-y-h"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={git}
                                alt="GitHub"
                                className="about-icon"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/frances-huang-660607156/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={linkedin}
                                alt="Linked In"
                                className="about-icon"
                            />
                        </a>
                    </div>
                </div>
                <div className="about-cards">
                    <div className="about-photo">
                        <img
                            src={lincoln}
                            alt='Lincoln'
                            className="about-icon lincoln"
                            />
                    </div>
                    <div className="about-name">Lincoln Her</div>
                    <div className="about-slogan">Develop success from failures.</div>
                    <div className="about-icon-wrap">
                        <a href="https://github.com/LincolnHer" target="_blank" rel="noreferrer">
                            <img
                                src={git}
                                alt="GitHub"
                                className="about-icon"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/lincoln-her/" target="_blank" rel="noreferrer">
                            <img
                                src={linkedin}
                                alt="Linked In"
                                className="about-icon"
                            />
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
