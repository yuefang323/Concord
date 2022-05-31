const CreateChannel = ({ server, openModal }) => {
	return (
		<div className="top-dd-wrap" onClick={() => openModal("create_channel")}>
			<div>Create Channel</div>
			<i className="fa-solid fa-circle-plus"></i>
		</div>
	);
};

export default CreateChannel;
