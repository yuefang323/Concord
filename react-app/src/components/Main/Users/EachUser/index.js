import { useRef, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import logo from "../../../../assets/logo-white.svg";
import crown from "../../../../assets/crown.svg";

const EachUser = ({ user, server }) => {
	const divRef = useRef();

	const owner = user?.id === server?.user_id;

	useEffect(() => {
		const lastNum = user?.id.toString()[user?.id.toString().length - 1];
		if (lastNum === "0" || lastNum === "5") {
			divRef.current.classList.add("color-red");
		} else if (lastNum === "1" || lastNum === "6") {
			divRef.current.classList.add("color-yellow");
		} else if (lastNum === "2" || lastNum === "7") {
			divRef.current.classList.add("color-green");
		} else if (lastNum === "3" || lastNum === "8") {
			divRef.current.classList.add("color-blue");
		} else if (lastNum === "4" || lastNum === "9") {
			divRef.current.classList.add("color-purple");
		}
	}, [user]);

	return (
		<div className="user-wrap">
			{user?.avatar ? (
				<img
					src={user.avatar}
					alt="Avatar"
					className="user-avatar"
					ref={divRef}
				/>
			) : (
				<div className="user-avatar" ref={divRef}>
					<img src={logo} alt="Avatar" className="user-logo" />
				</div>
			)}
			<div className="user-username">
				{user?.username}
				{owner && (
					<>
						<i className="fa-solid fa-crown" data-tip="Server Owner"></i>
					</>
				)}
				<ReactTooltip type="dark" effect="solid" />
			</div>
		</div>
	);
};

export default EachUser;
