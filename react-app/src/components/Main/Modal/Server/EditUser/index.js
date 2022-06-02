import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../../assets/logo-red.svg";
import { updateUser } from "../../../../../store/session";
// import { Modal } from "../../../../../context/Modal";
// import UserProfile from "../../../ChannelBar/UserProfile";
import "./EditUser.css";

const EditUser = ({ modal }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [avatar, setAvatar] = useState(user?.avatar);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedUser = {
            username: username,
            email: email,
            avatar: avatar,
        };

        const data = await dispatch(updateUser(updatedUser, user?.id))
        if (data.errors) {
            setErrors(data.errors)
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="edit-modal-body">
                {user?.avatar ? (
                    <img
                        className="user-avatar form"
                        src={user?.avatar}
                        alt="user avatar"
                    />
                ) : (
                    <div className="avatar-bkg form">
                        <img
                            className="user-avatar no-logo"
                            src={logo}
                            alt="user avatar"
                        />
                    </div>
                )}
                <span className="username-body">{user?.username}</span>
            </div>
            <div>
                <div className="edit-modal-user-info-container">
                    <div className="edit-modal-user-info">
                        <div className="edit-info">
                            <h5>USERNAME</h5>
                            <input
                                className="edit-input"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={user?.username}
                            />
                        </div>
                        <div className="edit-info">
                            <h5>EMAIL</h5>
                            <input
                                className="edit-input"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={user?.email}
                            />
                        </div>
                        <div className="edit-info">
                            <h5>USER AVATAR</h5>
                            <input
                                className="edit-input"
                                type="text"
                                name="avatar"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                placeholder={user?.avatar}
                            />
                        </div>
                    </div>
                </div>
            <ul className="errors">
                {errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            </div>
            <div className="edit-user-btns-container">
                <button
                    className="edit-user-btns"
                    type="button"
                    onClick={() => modal(false)}
                >
                    Cancel
                </button>
                <button
                    className="edit-user-btns"
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditUser;
