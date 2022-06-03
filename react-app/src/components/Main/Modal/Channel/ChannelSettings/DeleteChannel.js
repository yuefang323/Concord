import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { socket } from "../../../../../context/Socket";

import * as channelsActions from "../../../../../store/channels";
import * as serversActions from "../../../../../store/servers";
import * as chatsActions from "../../../../../store/chats";

const DeleteChannel = ({ channel, onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const channelToDelete = {
            id: channel.id,
            name,
            server_id: channel.server_id,
        };

        dispatch(channelsActions.deleteThisChannel(channelToDelete))
        .then((res) => {
                // dispatch action to update server
                dispatch(serversActions.addEditServer(res.server))
                // dispatch action to update chats
                res.chat.forEach((id) => dispatch(chatsActions.deleteChat(id)))
                onClose();
                history.push(`/channels/${channel.server_id}`);
                // socket emit leave channels
                socket.emit("leave_channels", res.channels);

            })
            .catch((err) => console.log(err));
    };

    return (
        <form className="setting-server-overview-wrap" onSubmit={handleSubmit}>
            <div className="setting-server-overview-title">
                Delete '{channel?.name}'
            </div>
            <div className="setting-delete-server-waring">
                Are you sure you want to delete{" "}
                <span className="bold">{channel?.name}</span>? This action
                cannot be undone.
            </div>
            <label>
                ENTER CHANNEL NAME
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <div className="error-list">
                {errors &&
                    errors.map((error, ind) => <div key={ind}>{error}</div>)}
            </div>
            <div className="setting-button-wrap">
                <button
                    className="form-create-btm-clear-btn"
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="form-create-btm-btn-red"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Delete Channel
                </button>
            </div>
        </form>
    );
};

export default DeleteChannel;
