
import { useState, useEffect } from "react";
import { Modal } from "../../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import * as channelActions from "../../../../../store/channels";


const CreateChannel = ({ setChoose }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
      };


    return (
        <>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div>
                    <p>Create A Channel</p>
                    <form onSubmit={handleSubmit}>
                        <input
                        onChange={
                            
                        }
                        ></input>

                    </form>
                </div>
            </Modal>
        )}
        
        </>
    )
}

export default CreateChannel;