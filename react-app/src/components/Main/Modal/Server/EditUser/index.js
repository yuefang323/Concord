import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/logo-red.svg";
import { Modal } from "../../../../../context/Modal";
import UserProfile from "../../../ChannelBar/UserProfile";
import "./EditUser.css";

const EditUser = ({ modal }) => {
    const user = useSelector((state) => state.session.user);

    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [avatar, setAvatar] = useState(user?.avatar);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const validationErrs = [];
        if (!username.length) validationErrs.push("Name must have length");
    }, [username, email, avatar]);

    return (
        <form>
            <ul className="errors">
                {errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
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
                    disabled={errors.length > 0}
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditUser;
