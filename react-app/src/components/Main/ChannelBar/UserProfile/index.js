import { useState } from 'react';
import { useSelector } from 'react-redux'
import ReactTooltip from "react-tooltip";
import logo from "../../../../assets/logo-red.svg"
import { Modal } from "../../../../context/Modal";
import EditUser from '../../Modal/Server/EditUser';
import './UserProfile.css'

const UserProfile = () => {
    const user = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    console.log(user)

    return (
    <>
        <div className='user_profile'>
            {/* avatar */}
            {user?.avatar ? (
            <img
                className='user-avatar logo'
                src={user.avatar}
                alt='user avatar'></img>
            ) : (
                <div className='avatar-bkg'>
                    <img className='user-avatar channel' src={logo} alt="user avatar" />
                </div>
            )}
            {/* info: username */}
            <div className='user_profileInfo'>
                <p className='text'>{user?.username}</p>
            </div>
            {/* icons: on click modal */}
            <div
                className='user_icons'
                data-tip data-for='editUser'
                onClick={() => setShowModal(true)}
            >
                <i className='fa-solid fa-gear'></i>
            </div>
            {showModal && (
                <Modal
                    onClose={() => {
                        setTimeout(() => {
                         setShowModal(false);
                        }, 1);
                    }}
                >
                    <div className="edit-modal-title">
                        <h1>My Account</h1>
                    </div>
                    <div className='form-edit-user'>
                        <EditUser />
                    </div>
                </Modal>
            )}
            <ReactTooltip
                id="editUser"
                place="top"
                effect="solid"
            >
                User Settings
            </ReactTooltip>
        </div>
    </>
    )
}

export default UserProfile
