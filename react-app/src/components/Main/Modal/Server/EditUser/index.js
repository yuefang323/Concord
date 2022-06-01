import { useState } from "react";
import { useSelector } from "react-redux"
import logo from "../../../../../assets/logo-red.svg"
import { Modal } from "../../../../../context/Modal";
import './EditUser.css'

const EditUser = () => {
    const user = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);

  return (
      <>
        <div className="edit-modal-body">
            {user?.avatar ? (
            <img className="user-avatar form" src={user?.avatar} alt='user avatar' />
            ) : (
                <div className="avatar-bkg form">
                    <img className='user-avatar no-logo' src={logo} alt="user avatar" />
                </div>
            )}
            <span className="username-body">{user?.username}</span>
        </div>
        <div>
            <div className="edit-modal-user-info-container">
                <div className="edit-modal-user-info">
                    <div className="edit-info">
                        <h5>USERNAME</h5>
                        {user?.username}
                    </div>
                    <div className="edit-info">
                        <h5>EMAIL</h5>
                        {user?.email}
                    </div>
                </div>
            </div>
        </div>
        <div className="edit-user-btns-container">
            <button className="edit-user-btns">delete</button>
            <button className="edit-user-btns">edit</button>
        </div>
      </>
  )
}

export default EditUser
