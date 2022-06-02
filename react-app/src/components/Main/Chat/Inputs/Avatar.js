import { useEffect, useRef } from "react";

import logo from "../../../../assets/logo-white.svg";

const Avatar = ({ user }) => {
	const divRef = useRef();

	useEffect(() => {
		const lastNum = user?.id.toString()[user?.id.toString().length - 1];
		if (lastNum === "0" || lastNum === "5") {
			divRef?.current.classList.add("color-red");
		} else if (lastNum === "1" || lastNum === "6") {
			divRef?.current.classList.add("color-yellow");
		} else if (lastNum === "2" || lastNum === "7") {
			divRef?.current.classList.add("color-green");
		} else if (lastNum === "3" || lastNum === "8") {
			divRef?.current.classList.add("color-blue");
		} else if (lastNum === "4" || lastNum === "9") {
			divRef?.current.classList.add("color-purple");
		}
	}, [user]);

	if (user?.avatar) {
		return (
			<img
				src={user?.avatar}
				alt="avatar"
				className="chat-avatar"
				ref={divRef}
			/>
		);
	} else {
		return (
			<div className="chat-avatar" ref={divRef}>
				<img src={logo} alt="Avatar" className="user-logo" />
			</div>
		);
	}
};

export default Avatar;
