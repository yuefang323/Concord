import { useParams } from "react-router-dom";
import HomeChannel from "./HomeChannel";
import ServerChannel from "./ServerChannel";

const ChannelBar = () => {


  return (
    <>
      <div className="channel-ctrl">
          <h4>TEXT CHANNELS</h4>
        {<ServerChannel />}
      </div>
    </>
  );
};

export default ChannelBar;
