import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, Redirect } from "react-router-dom";

import AddChannelModal from "./AddChannel";
import EditChannel from "./EditChannel";
import UserProfile from "./UserProfile";
import HomeChannel from "./HomeChannel";

import * as channelsActions from "../../../store/channels";
import * as chatsActions from "../../../store/chats";

const ChannelBar = () => {
	const dispatch = useDispatch();

	const serverParam = useParams().serverId;
	const serverId = parseInt(serverParam, 10);
	const channelParam = useParams().channelId;
	const channelId = parseInt(channelParam, 10);
	const servers = useSelector((state) => state.servers);
	const currServerChannels = servers?.byId[serverId]?.channels;
	const channels = useSelector((state) => state.channels);

	const dispatchChannel = async () => {
		dispatch(channelsActions.getChannel(channelId))
			.then((res) => dispatch(chatsActions.getChats(res.chats)))
			.catch((err) => console.log(err));
	};

	if (!channelParam && currServerChannels)
		return <Redirect to={`/channels/${serverId}/${currServerChannels[0]}`} />;

	return (
		<>
			<div className="channel-ctrl">
				<div>
					{<AddChannelModal />}
					<div className="channel-list">
						{currServerChannels?.map((id) => (
							<li key={id}>
								{
									<Link
										to={`/channels/${serverId}/${id}`}
										className="channel-info-wrapper"
										onClick={dispatchChannel}
									>
										<div className="channel-name">
											<i className="fa-solid fa-hashtag"></i>
											{channels?.byId[id]?.name}
										</div>
										<EditChannel channel={channels?.byId[id]} />
									</Link>
								}
							</li>
						))}
					</div>
				</div>
				<UserProfile />
			</div>
		</>
	);
};

export default ChannelBar;
