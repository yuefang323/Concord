import SideBar from "./SideBar";
import ChannelBar from "./ChannelBar";
import Chat from "./Chat";
import Users from "./Users";

const MainPage = () => {
	return (
		<div className="main-ctrl">
			<SideBar />
			<ChannelBar />
			<Chat />
			<Users />
		</div>
	);
};

export default MainPage;
