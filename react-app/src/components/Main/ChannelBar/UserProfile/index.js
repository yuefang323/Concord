import { useState } from 'react';
import { useSelector } from 'react-redux'
import logo from "../../../../assets/logo-white.svg"
import { Modal } from "../../../../context/Modal";
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
                className='user-avatar'
                src={user.avatar}
                alt='user avatar'></img>
            ) : (
                <div className='user-avatar'>
                    <img src={logo} alt="user avatar" />
                </div>
            )}
            {/* info: username */}
            <div className='user_profileInfo'>
                <p className='text'>{user?.username}</p>
            </div>
            {/* icons: on click modal */}
            <div
                className='user_icons'
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
                    <div className='form-edit-user'>

                    </div>
                </Modal>
            )}
        </div>
    </>
    )
}

export default UserProfile
