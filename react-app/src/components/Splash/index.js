import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from '../../store/session';

import "./SplashPage.css";
import logo from "../../assets/favicon.ico"

const SplashPage = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault()
        return dispatch(login("demo@aa.io", "password")).catch(
          async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
          }
        )
      }
    
    if (user) return <Redirect to="/main" />

    return (
        <> 
            <nav className="splash-nav-bar">
                <div className="logo">
                    <img src={logo} alt="Concord"></img>
                </div>
                <div className="splash-session-links">
                    <button onClick={demoLogin}>Demo User</button>
                    <NavLink exact to="/login">Login</NavLink>
                    <NavLink exact to="/sign-up">Sign Up</NavLink>
                </div>
            </nav>
        </>
    )
}

export default SplashPage;