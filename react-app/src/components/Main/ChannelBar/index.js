import { useParams } from "react-router-dom";
import HomeChannel from "./HomeChannel";
import ServerChannel from "./ServerChannel";

const ChannelBar = () => {


  return (
    <>
      <div className="channel-ctrl">
        <div className="text-channels-title">
          <h4>TEXT CHANNELS</h4>
          <div>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        {<ServerChannel />}
      </div>
    </>
  );
};

export default ChannelBar;
