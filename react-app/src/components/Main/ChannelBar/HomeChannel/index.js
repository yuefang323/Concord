

const HomeChannel = () => {
  return (
    <>
      <div>
          <button className="channel-bar-friend-btn">
            <i className="fa-solid fa-user-group"></i>
            <p>Friends</p>
          </button>
          <div className="channel-bar-dm-title">
            <h4>Direct Messages</h4>
            <i className="fa-solid fa-plus"></i>
          </div>
      </div>
    </>
  );
};

export default HomeChannel;
