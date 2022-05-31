import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ServerChannel = () => {
	const { serverId, channelId } = useParams()
	const user = useSelector((state) => state.session.user)
    const servers = useSelector((state) => state.servers);
    const currServer = servers.byId[serverId]
    const currServerName = currServer.name
    console.log("currServer", currServer)

	return (
		<>
			<div>{currServer.name}</div>
            {/* <div>hello</div> */}
		</>
	);
};

export default ServerChannel;
