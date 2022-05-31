import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ServerChannel = () => {
	const { serverId, channelId } = useParams()
	console.log("////", serverId, "......", channelId)
	const user = useSelector((state) => state.session.user)
	const allServers = useSelector((state) => state.servers)
	// const currServer = allServers?.find(res => res.id === serverId)
		
	return (
		<>
			<div>hello, channel</div>
		</>
	);
};

export default ServerChannel;
