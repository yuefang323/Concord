const AddServer = ({ setChoose }) => {
	return (
		<>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Customize your server</div>
				<div className="form-description">
					Give your new server a personality with a name and an icon. You can
					always change it later.
				</div>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={() => setChoose("create-join")}
				>
					Back
				</button>
				<button className="form-create-btm-btn" type="button">
					Create
				</button>
			</div>
		</>
	);
};

export default AddServer;
