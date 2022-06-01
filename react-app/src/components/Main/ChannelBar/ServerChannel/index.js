import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CreateChannelModal from "./addChannel"

const ServerChannel = () => {
  const { serverId } = useParams();
  const servers = useSelector((state) => state.servers);
  const currServerChannels = servers?.byId[serverId]?.channels;
  const channels = useSelector((state) => state.channels);


  return (
    <>
      <div>
        <CreateChannelModal />
        {currServerChannels?.map((id) => (
          <li>
            {
              <Link to={`/channels/${serverId}/${id}`}>
                {channels?.byId[id]?.name}
              </Link>
            }
          </li>
        ))}
      </div>
    </>
  );
};

export default ServerChannel;
