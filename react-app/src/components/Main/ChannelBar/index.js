import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import AddChannelModal from "./ServerChannel";

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
              <li>
                {
                  <Link to={`/channels/${serverId}/${id}`}>
                    <i className="fa-solid fa-hashtag"></i>
                    {channels?.byId[id]?.name}
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
