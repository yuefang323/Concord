import AddChannelModal from "./ServerChannel";

const ChannelBar = () => {
  return (
    <>
      <div className="channel-ctrl">
        <div>
          {<AddChannelModal />}
        </div>
      </div>
    </>
  );
};

export default ChannelBar;
