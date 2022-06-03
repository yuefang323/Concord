import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../../../context/Modal";
import ChannelSettings from "../../Modal/Channel/ChannelSettings";

import ChatDivs from "../Inputs/ChatDivs";

const Chats = ({ socket }) => {
	const channelId = parseInt(useParams().channelId);

	const channels = useSelector((state) => state.channels.byId);

	const focusRef = useRef();

	const [showModal, setShowModal] = useState(false);

	const onClose = () => setShowModal(false);

	useEffect(() => {
		if (focusRef) {
			focusRef.current.addEventListener("DOMNodeInserted", (e) => {
				const { currentTarget: target } = e;
				target.scroll({ top: target.scrollHeight, behavior: "smooth" });
			});
		}
	}, []);

	if (channels[channelId] && channels[channelId].chats.length) {
		return (
			<div className="chat-div-wrap" ref={focusRef}>
				{channels[channelId]?.chats.map((chatId) => {
					return <ChatDivs chatId={chatId} key={chatId} socket={socket} />;
				})}
			</div>
		);
	} else {
		return (
			<div className="chat-div-wrap-empty" ref={focusRef}>
				<div className="chat-big-hash-div">
					<i className="fa-solid fa-hashtag"></i>
				</div>
				<div className="chat-empty-title">
					Welcome to #{channels[channelId]?.name}!
				</div>
				<div className="chat-empty-desc">
					This is the start of the #{channels[channelId]?.name} channel.
				</div>
				<div className="chat-empty-edit" onClick={() => setShowModal(true)}>
					<i className="fa-solid fa-pen"></i>
					Edit Channel
				</div>
				{showModal && (
					<Modal onClose={onClose}>
						<ChannelSettings onClose={onClose} channel={channels[channelId]} />
					</Modal>
				)}
			</div>
		);
	}
};

export default Chats;
