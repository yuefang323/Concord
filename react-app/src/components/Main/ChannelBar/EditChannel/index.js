import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Modal } from "../../../../context/Modal";

import ChannelSettings from "../../Modal/Channel/ChannelSettings";

const EditChannel = ({ channel }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("leave");
    const user = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.servers);
    const { serverId } = useParams();
    const serverIdNum = parseInt(serverId)
    const currServer = servers.byId[serverId]

    console.log(",,,,,,", user.id)
    console.log("sssssss", currServer)
    console.log("xxxxxxxxx", parseInt(serverId))
    console.log("////////////", channel?.user_id)

    console.log(channel?.user_id === user.id)
    console.log(serverIdNum === user.id)


    const onClose = () => {
        setShowModal(false);
    };

    if (channel?.user_id === user.id || serverIdNum === user.id) {
    return (
        <>
        
        <div className="edit-channel-icon" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-gear"></i>
            {showModal && (
                <Modal onClose={onClose}>
                    <ChannelSettings
                        channle={channel}
                        setShowModal={setShowModal}
                        onclose={onclose}
                    />
                </Modal>
            )}
        </div>
        </>
    );} else {
        return "hello"
    }
};

export default EditChannel;
