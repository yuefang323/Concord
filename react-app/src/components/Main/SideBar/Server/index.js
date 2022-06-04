import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import WithLogo from "./WithLogo";
import NoLogo from "./NoLogo";

import * as channelsActions from "../../../../store/channels";
import * as serversActions from "../../../../store/servers";

const Server = ({ server }) => {
    const dispatch = useDispatch();

    const serverParam = useParams().serverId;
    const serverId =
        serverParam === "@me" ? serverParam : parseInt(serverParam, 10);

    const dispatchServer = () => {
        dispatch(serversActions.getServer(server.id))
            .then((res) => dispatch(channelsActions.getChannels(res.channels)))
            .catch((err) => console.log(err));
    };

    return (
        <Link
            to={`/channels/${server?.id}/`}
            className="sidebar-btn-ctrl"
            data-tip={server?.name}
            onClick={dispatchServer}
        >
            {serverId === server?.id ? (
                <div className="sidebar-highlight sb-hl-active"></div>
            ) : (
                <div className="sidebar-highlight"></div>
            )}
            {server?.logo ? (
                <WithLogo server={server} />
            ) : (
                <NoLogo server={server} />
            )}
            <ReactTooltip place="right" type="dark" effect="solid" />
        </Link>
    );
};

export default Server;
