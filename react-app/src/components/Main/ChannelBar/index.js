import { useParams } from "react-router-dom";
import HomeChannel from "./HomeChannel";
import ServerChannel from "./ServerChannel";

const ChannelBar = () => {
	const { serverId, channelId } = useParams();

	return (
		<>
			<div className="channel-ctrl">
				{serverId === "@me" ? <HomeChannel /> : <ServerChannel />}
			</div>
		</>
	);
};

export default ChannelBar;

