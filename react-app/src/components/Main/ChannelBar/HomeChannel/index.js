import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as channelsActions from "../../../../store/channels";
import * as serversActions from "../../../../store/servers";
import * as prvChannelsActions from "../../../../store/prvChannels";

import { socket } from "../../../../context/Socket";

const HomeChannel = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.session.users)
    const prvChannels = useSelector((state) => state.prvChannels)
    console.log(prvChannels.byId)
    console.log("users", users)

    // const currUserPrvChannels = (prvChannels.byId).map((id) => {
    //     prvChannels.byId[id]
    // })

    // console.log("currUserPrvChannels", currUserPrvChannels)

    console.log("prvChannels", prvChannels)
    console.log("user", user)

    return (
        <>
            <div>
                <button className="channel-bar-friend-btn">
                    <i className="fa-solid fa-user-group"></i>
                    <p>Friends</p>
                </button>
                <div className="channel-bar-dm-title">
                    <h4>Direct Messages</h4>
                    {/* <i className="fa-solid fa-plus"></i> */}
                </div>
            </div>
        </>
    );
};

export default HomeChannel;
