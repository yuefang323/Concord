const EditChannel = ({ setShowModal }) => {
	return (
		<div className="edit-channel-icon" onClick={() => setShowModal(true)}>
			<div>Edit Channel</div>
			<i className="fa-solid fa-gear"></i>
		</div>
	);
};

export default EditChannel;