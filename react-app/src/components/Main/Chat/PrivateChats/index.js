import { useRef, useEffect } from "react"
import { useSelector } from "react-redux";
import { userParams } from "react-router-dom"



const PrivateChats = () => {
	// const prvChannelId = parseInt(useParams().channelId)

	const prvChannels = useSelector((state) => state.prvChannels.byId);

	console.log(prvChannels)

	const focusRef = useRef();

	// useEffect(() => {
	// 	if (focusRef) {
	// 		focusRef.current.addEventListener("DOMNodeInserted")
	// 	}

	// }, []);

	return <div>Private</div>;
};

export default PrivateChats;
