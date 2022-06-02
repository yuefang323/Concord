import ReactTooltip from "react-tooltip";

const EditDelete = () => {
	return (
		<div className="chat-edit-delete">
			<div className="chat-edit-delete-btn" data-tip="Edit">
				<i className="fa-solid fa-pen"></i>
			</div>
			<div className="chat-edit-delete-btn" data-tip="Delete">
				<i className="fa-solid fa-trash-can"></i>
			</div>
			<ReactTooltip place="bottom" type="dark" effect="solid" />
		</div>
	);
};

export default EditDelete;
