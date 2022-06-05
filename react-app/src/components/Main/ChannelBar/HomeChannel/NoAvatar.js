import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../../../../assets/logo-red.svg";

const NoAvatar = ({ friend }) => {
    const divRef = useRef();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const id =
            friend?.friend_id === user.id ? friend?.user_id : friend?.friend_id;
        if (id % 5 === 0) {
            divRef.current.classList.add("color-blue");
        } else if (id % 5 === 1) {
            divRef.current.classList.add("color-yellow");
        } else if (id % 5 === 2) {
            divRef.current.classList.add("color-green");
        } else if (id % 5 === 3) {
            divRef.current.classList.add("color-blue");
        } else if (id % 5 === 4) {
            divRef.current.classList.add("color-purple");
        }
    }, [friend?.friend_id, user.id, friend?.user_id]);

    return (
        <div className="sidebar-btn" ref={divRef}>
            <img className="user-avatar channel" src={logo} alt="user avatar" />
        </div>
    );
};

export default NoAvatar;
