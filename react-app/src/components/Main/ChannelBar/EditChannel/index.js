import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { Modal } from "../../../../context/Modal";

import ChannelSettings from "../../Modal/Channel/ChannelSettings";

const EditChannel = ({ channel }) => {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.session.user);
    const { serverId } = useParams();
    const serverIdNum = parseInt(serverId);

    const onClose = () => {
        setTimeout(() => {
            setShowModal(false);
        }, 1);
    };

    if (channel?.user_id === user.id || serverIdNum === user.id) {
        return (
            <>
                <div
                    className="edit-channel-icon"
                    onClick={() => setShowModal(true)}
                >
                    <i className="fa-solid fa-gear edit-channel-icon"></i>
                    {showModal && (
                        <Modal onClose={onClose}>
                            <ChannelSettings
                                channel={channel}
                                setShowModal={setShowModal}
                                onClose={onClose}
                            />
                        </Modal>
                    )}
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default EditChannel;
