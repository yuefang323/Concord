import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import * as channelsActions from "../../../../../store/channels";

const ChannelOverview = ({ channel, onClose }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const { serverId } = useParams();
    // const serverIdnum = parseInt(serverId);
    const servers = useSelector((state) => state.servers);
    const currServerChannels = servers?.byId[serverId]?.channels;
    const channels = useSelector((state) => state.channels);
    const channelNames = currServerChannels?.map((id) =>
        channels?.byId[id]?.name.toLowerCase()
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = [];
        if (name.length < 1 || name.length > 50)
            validateErrors.push(
                "Updated name length must be between 1 and 50 characters."
            );
        if (channelNames.includes(name.toLowerCase().trim()))
            validateErrors.push("Channel with same name already exists.");
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }
        const channelToUpdate = {
            id: channel.id,
            name,
            server_id: channel.server_id,
        };

        const res = await dispatch(
            channelsActions.editChannel(channelToUpdate)
        );
        if (res.channel) {
            onClose();
        } else {
            setErrors(res);
        }
    };

    const cancelEdit = () => {
        setName(channel.name);
        setErrors([]);
    };

    useEffect(() => {
        setName(channel?.name);
        console.log("wrong name")
    }, [channel]);

    return (
        <>
            <form
                className="setting-server-overview-wrap"
                onSubmit={handleSubmit}
            >
                <div className="setting-server-overview-title">
                    Channel Overview
                </div>
                <label className="input-label">
                    CHANNEL NAME
                    <textarea
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="textarea"
                        required
                    />
                </label>
                <div className="error-list">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="setting-button-wrap">
                    <button
                        className="form-create-btm-clear-btn"
                        type="button"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                    <button
                        className="form-create-btm-btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChannelOverview;
