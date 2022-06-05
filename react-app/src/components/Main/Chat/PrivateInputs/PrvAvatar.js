import { useEffect, useRef } from "react";

import logo from "../../../../assets/logo-white.svg";

const PrvAvatar = ({ friend }) => {
	const divRef = useRef();

	useEffect(() => {
		const lastNum = friend?.id.toString()[friend?.id.toString().length - 1];
		if (lastNum === "0" || lastNum === "5") {
			divRef?.current.classList.add("color-red");
            divRef?.current.classList.remove("color-yellow")
            divRef?.current.classList.remove("color-green")
            divRef?.current.classList.remove("color-blue")
            divRef?.current.classList.remove("color-purple")
		} else if (lastNum === "1" || lastNum === "6") {
			divRef?.current.classList.add("color-yellow");
            divRef?.current.classList.remove("color-red")
            divRef?.current.classList.remove("color-green")
            divRef?.current.classList.remove("color-blue")
            divRef?.current.classList.remove("color-purple")
		} else if (lastNum === "2" || lastNum === "7") {
			divRef?.current.classList.add("color-green");
            divRef?.current.classList.remove("color-yellow")
            divRef?.current.classList.remove("color-red")
            divRef?.current.classList.remove("color-blue")
            divRef?.current.classList.remove("color-purple")
		} else if (lastNum === "3" || lastNum === "8") {
			divRef?.current.classList.add("color-blue");
            divRef?.current.classList.remove("color-yellow")
            divRef?.current.classList.remove("color-red")
            divRef?.current.classList.remove("color-green")
            divRef?.current.classList.remove("color-purple")
		} else if (lastNum === "4" || lastNum === "9") {
			divRef?.current.classList.add("color-purple");
            divRef?.current.classList.remove("color-yellow")
            divRef?.current.classList.remove("color-red")
            divRef?.current.classList.remove("color-green")
            divRef?.current.classList.remove("color-blue")
		}
	}, [friend]);

    if (friend?.avatar) {
		return (
			<img
				src={friend?.avatar}
				alt="avatar"
				className="chat-avatar"
				ref={divRef}
			/>
		);
	} else {
        return (
            <div className="chat-avatar prv" ref={divRef}>
                <img src={logo} alt="Avatar" className="user-logo prv" />
            </div>
        );
    }
};

export default PrvAvatar;
