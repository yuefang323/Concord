const ServerSettings = ({ server, openModal }) => {
	return (
		<div className="top-dd-wrap" onClick={() => openModal("setting")}>
			<div>Server Settings</div>
			<i className="fa-solid fa-gear"></i>
		</div>
	);
};

export default ServerSettings;
