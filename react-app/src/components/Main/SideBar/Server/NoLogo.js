import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const NoLogo = ({ server }) => {
	const divRef = useRef();
	const serverParam = useParams().serverId;
	const serverId =
		serverParam === "@me" ? serverParam : parseInt(serverParam, 10);

	useEffect(() => {
		const lastNum = server.id.toString()[server.id.toString().length - 1];
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

		if (serverId === server.id) {
			divRef.current.classList.add("sidebar-btn-active");
		}
	}, [server.id]);

	return (
		<div className="sidebar-btn" ref={divRef}>
			{server.name[0].toUpperCase()}
			{server.name[2].toUpperCase()}
		</div>
	);
};

export default NoLogo;
