import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import AddChannelModal from "./ServerChannel";
import EditChannel from "./EditChannel";

const ChannelBar = () => {
    const { serverId } = useParams();
    const servers = useSelector((state) => state.servers);
    const currServerChannels = servers?.byId[serverId]?.channels;
    const channels = useSelector((state) => state.channels);
    
    return (
        <>
            <div className="channel-ctrl">
                <div>
                    {<AddChannelModal />}
                    <div className="channel-list">
                        {currServerChannels?.map((id) => (
                            <li key={id}>
                                {
                                    <Link to={`/channels/${serverId}/${id}`}>
                                        <i className="fa-solid fa-hashtag"></i>
                                        {channels?.byId[id]?.name}
                                        <EditChannel channel={channels?.byId[id]} />
                                    </Link>
                                }
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelBar;
