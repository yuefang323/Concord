import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Modal } from "../../../../context/Modal";

import AddChannel from "../../Modal/Channel/AddChannel"


const AddChannelModal = () => {

  const [showModal, setShowModal] = useState(false);
  const { serverId } = useParams();
  const servers = useSelector((state) => state.servers);
  const currServerChannels = servers?.byId[serverId]?.channels;
  const channels = useSelector((state) => state.channels);
 

  return (
    <>
      <div className="add-new-channel-wrapper">
        <p className="add-new-channel">TEXT CHANNELS</p>
        <button onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-channel-modal">
            <AddChannel setShowModal={setShowModal} />
          </div>
        </Modal>
      )}
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
    </>
  );
};

export default AddChannelModal;
