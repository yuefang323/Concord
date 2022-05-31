import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ServerChannel = () => {
  const { serverId } = useParams();
  const servers = useSelector((state) => state.servers);
  const currServerChannels = servers?.byId[serverId]?.channels;
  const channels = useSelector((state) => state.channels);


  return (
    <>
      <div>hello</div>
      <div>
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
