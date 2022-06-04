import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as prvChannelsActions from "../../../../../store/prvChannels";

const AddFriend = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [friendId, setFriendId] = useState("");
    const curUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.byId);
    const prvChannels = useSelector((state) => state.prvChannels);
    const [errors, setErrors] = useState([]);

    const friendsList = Object.values(prvChannels.byId);

    let friendIdList = [];
    friendsList.forEach((friend) => {
        const id =
            friend?.user_id === curUser.id ? friend.friend_id : friend?.user_id;
        friendIdList.push(id);
    });

    const join = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (friendId) {
            setErrors([]);
            const newPrvChannel = { user_id: curUser.id, friend_id: friendId };
            const res = await dispatch(prvChannelsActions.addNewPrvChannel(newPrvChannel));
            // Dispatch private channel
            const data = await dispatch(prvChannelsActions.getPrvChannel(res.prv_channel.id));
            setFriendId("")
            history.push(`/channels/@me/${data.prv_channel.id}`);
            setShowModal(false);
        } else {
            setErrors(["Please select a friend"]);
        }
    };

    return (
        <form onSubmit={join}>
            <div className="form-ctrl-wrap">
                <div className="form-h2">Add a Friend</div>
                <div className="form-description">
                    Search from below to add a friend
                </div>
                {errors && (
                    <div className="error-list">
                        {errors.map((error, idx) => (
                            <div key={"error" + idx}>{error}</div>
                        ))}
                    </div>
                )}
                <select
                    className="select"
                    value={friendId}
                    onChange={(e) =>
                        setFriendId(parseInt(e.target.value, 10))
                    }
                >
                    <option>Select a Friend</option>
                    {Object.values(users)
                        .filter(
                            (user) =>
                                friendIdList.indexOf(user?.id) === -1 &&
                                user?.id !== curUser.id
                        )
                        .map((user) => (
                            <option key={user?.id} value={user?.id}>
                                {user?.username}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-create-btm-wrap-row">
                <button
                    className="form-create-btm-clear-btn"
                    type="reset"
                    onClick={() =>
                        setTimeout(() => {
                            setShowModal(false);
                        }, 1)
                    }
                >
                    Back
                </button>
                <button className="form-create-btm-btn" type="submit">
                    Add a Friend
                </button>
            </div>
        </form>
    );
};

export default AddFriend;
