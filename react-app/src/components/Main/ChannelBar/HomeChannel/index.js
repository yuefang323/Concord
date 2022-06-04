import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { Modal } from "../../../../context/Modal";
import AddFriend from "../../Modal/Channel/AddFriend";
import NoAvatar from "./NoAvatar";

import * as prvChannelsActions from "../../../../store/prvChannels";

const HomeChannel = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.byId);
    const prvChannels = useSelector((state) => state.prvChannels);
    const prvChannelParam = useParams().channelId;
	const prvChannelId = parseInt(prvChannelParam, 10);
    console.log("prvChannelParam", prvChannelParam)
    console.log("prvChannelId", prvChannelId)
    const friendsList = Object.values(prvChannels.byId);

    const dispatchPrvChannel = async () => {
		dispatch(prvChannelsActions.getPrvChannel(prvChannelId))
			// .then((res) => {
			// 	dispatch(chatsActions.getChats(res.chats));
			// })
			.catch((err) => console.log(err));
	};

    return (
        <>
            <div>
                <button
                    className="channel-bar-friend-btn"
                    onClick={() => setShowModal(true)}
                    data-tip="Add a Friend"
                >
                    <i className="fa-solid fa-user-group"></i>
                    <p>Friends</p>
                    {showModal && (
                        <Modal
                            onClose={() => {
                                setTimeout(() => {
                                    setShowModal(false);
                                }, 1);
                            }}
                        >
                            <div className="form-ctrl form-sm">
                                <AddFriend setShowModal={setShowModal} />
                            </div>
                        </Modal>
                    )}
                </button>
                <div className="channel-bar-wrapper">
                    <p>Direct Messages</p>
                    <div className="friend-list">
                        {friendsList?.map((friend, indx) => (
                            <div key={"friend" + indx}>
                                <Link
                                    to={`/channels/@me/${friend?.id}`}
                                    className="channel-friend-wrapper"
                                    onClick={dispatchPrvChannel}
                                >
                                    {users[
                                        friend?.user_id === user.id
                                            ? friend.friend_id
                                            : friend?.user_id
                                    ]?.avatar ? (
                                        <img
                                            className="sidebar-btn"
                                            src={
                                                users[
                                                    friend?.user_id === user.id
                                                        ? friend.friend_id
                                                        : friend?.user_id
                                                ]?.avatar
                                            }
                                            alt="user avatar"
                                        ></img>
                                    ) : (
                                        <NoAvatar friend={friend} />
                                    )}
                                    <div className="friend-name">
                                        {
                                            users[
                                                friend?.user_id === user.id
                                                    ? friend.friend_id
                                                    : friend?.user_id
                                            ]?.username
                                        }
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ReactTooltip place="right" type="dark" effect="solid" />
        </>
    );
};

export default HomeChannel;
