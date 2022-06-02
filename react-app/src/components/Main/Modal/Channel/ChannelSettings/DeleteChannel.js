import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as channelsActions from "../../../../../store/channels";

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
        console.log("channelToDelete....", channelToDelete);
        // Thunks to delete server
        const res = await dispatch(
            channelsActions.deleteThisChannel(channelToDelete)
        );
        console.log("res....", res);
        if (!res.errors) {
            console.log("validators///////");
            history.push("/channels/@me");
            onClose();
            console.log(res);
            // dispatch action to update join server
            // dispatch(joinServersActions.leaveServer(server.id));

            // socket emit leave channels
            // socket.emit("leave_channels", res.channels);

            // dispatch action to update channels
            // res.channels.forEach((channelId) => {
            // 	dispatch(channelsActions.deleteChannels(channelId));
            // });

            // dispatch action to update chats
            // res.chats.forEach((chatId) => {
            // 	dispatch(chatsActions.deleteChat(chatId));
            // });
        } else {
            setErrors(res.errors);
        }
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
