import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import ToolsProvider from "./context/Tools";

import { authenticate } from "./store/session";
import SplashPage from "./components/Splash";
import About from "./components/Splash/About";
import MainPage from "./components/Main";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{user ? (
						<ToolsProvider>
							<MainPage />
						</ToolsProvider>
					) : (
						<SplashPage />
					)}
				</Route>
				<Route path="/about" exact={true}>
					<About />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute
					path={[
						"/",
						"/channels/:serverId",
						"/channels/:serverId/:channelId",
						"/guild-discovery",
					]}
					exact={true}
				>
					<ToolsProvider>
						<MainPage />
					</ToolsProvider>
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
