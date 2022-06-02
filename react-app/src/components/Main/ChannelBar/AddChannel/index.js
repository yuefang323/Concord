import { useState } from "react";

import { Modal } from "../../../../context/Modal";
import AddChannel from "../../Modal/Channel/AddChannel";

const AddChannelModal = () => {
  const [showModal, setShowModal] = useState(false);

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
    </>
  );
};

export default AddChannelModal;
