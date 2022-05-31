const LeaveServer = ({ openModal }) => {
	return (
		<>
			<div className="top-dd-wrap" onClick={() => openModal("leave")}>
				<div>Leave Server</div>
				<i className="fa-solid fa-right-from-bracket"></i>
			</div>
		</>
	);
};

export default LeaveServer;
