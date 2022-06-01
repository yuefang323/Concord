import { useState } from "react";
import { useHistory } from "react-router";
import { useParams, Link } from "react-router-dom";
import { Modal } from "../../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import * as channelActions from "../../../../store/channels";
import * as severActions from "../../../../store/servers";

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const { serverId } = useParams();
  const serverIdnum = parseInt(serverId);
  const servers = useSelector((state) => state.servers);
  const currServerChannels = servers?.byId[serverId]?.channels;
  const channels = useSelector((state) => state.channels);
  const channelNames = currServerChannels?.map(
    (id) => channels?.byId[id]?.name
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validateErrors = [];
    if (name.length < 1 || name.length > 50)
      validateErrors.push("Name length must be between 1 and 50 characters.");
    if (channelNames.includes(name))
      validateErrors.push("Channel with same name already exists.");
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }
    const newChannel = { name, serverIdnum };
    const res = await dispatch(channelActions.addNewChannel(newChannel));
    dispatch(severActions.addEditServer(res));
    setShowModal(false);
    history.push(`/channels/${serverIdnum}`);
  };

  const cancelButton = async (e) => {
    setShowModal(false);
    setErrors([]);
    setName("");
  };

  return (
    <>
      <div className="add-new-channel">
        <button onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {showModal && (
        <Modal onClose={cancelButton}>
          <div className="add-channel-modal">
            <div className="add-channel-form">
              <h2 className="form-h2">Create A Channel</h2>
              <div className="error-list">
                {errors &&
                  errors.map((error) => <div key={error}>{error}</div>)}
              </div>
              <form className="new-channel-form" onSubmit={handleSubmit}>
                <div className="add-channel-input">
                  <label>CHANNEL NAME</label>
                  <div className="input-field">
                    <div className="input-hash-sign">#</div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-buttons">
                  <button onClick={cancelButton} type="reset">
                    Cancel
                  </button>
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
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

export default CreateChannelModal;
