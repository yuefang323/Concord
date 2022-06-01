
import CreateChannelModal from "./ServerChannel";

const ChannelBar = () => {


  return (
    <>
      <div className="channel-ctrl">
          <h4 className="add-new-channel">TEXT CHANNELS</h4>
        {<CreateChannelModal />}
      </div>
    </>
  );
};

export default ChannelBar;
