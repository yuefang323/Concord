import { useParams } from "react-router-dom";

const ChannelBar = () => {
	const { serverId, channelId } = useParams();
	return <div className="channel-ctrl">ChannelBar</div>;
};

export default ChannelBar;
