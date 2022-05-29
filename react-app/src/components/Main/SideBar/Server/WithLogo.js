import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const WithLogo = ({ server }) => {
	const divRef = useRef();
	const serverParam = useParams().serverId;
	const serverId =
		serverParam === "@me" ? serverParam : parseInt(serverParam, 10);

	useEffect(() => {
		if (serverId === server.id) {
			divRef.current.classList.add("sidebar-btn-active");
		} else {
			divRef.current.classList.remove("sidebar-btn-active");
		}
	}, [server.id, serverId]);

	return (
		<div
			className="sidebar-btn"
			style={{ backgroundImage: `url(${server.logo})` }}
			ref={divRef}
		></div>
	);
};

export default WithLogo;
