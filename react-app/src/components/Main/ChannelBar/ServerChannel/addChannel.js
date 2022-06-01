import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Modal } from "../../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import * as channelActions from "../../../../store/channels";

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const { serverId } = useParams();
  const serverIdnum = parseInt(serverId)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validateErrors = [];
    if (name.length < 1 || name.length > 50)
      validateErrors.push("Name length must be between 1 and 50 characters!");
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }

    const newChannel = { name, serverIdnum };
    const res = await dispatch(channelActions.addNewChannel(newChannel));
    setShowModal(false);
    history.push(`/channels/${serverIdnum}/${res.id}`);
  };

  const cancelButton = async (e) => {
    setShowModal(false);
    setErrors([])
    setName("")
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={cancelButton}>
          <ul>
            {errors && errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <div>
            <p>Create A Channel</p>
            <form onSubmit={handleSubmit}>
              <label>CHANNEL NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={cancelButton} type="reset">
                Cancel
              </button>
              <button type="submit">Add</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateChannelModal;
