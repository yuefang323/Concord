import create from "../../../../assets/create-my-own-server.svg";

const CreateJoin = ({ setChoose }) => {
	return (
		<>
			<div className="form-ctrl-wrap">
				<div className="form-h2">Create a a server</div>
				<div className="form-description">
					Your server is where you and your friends hang out. Make yours and
					start talking to your server.
				</div>
				<div
					className="form-create-server-btn-wrap"
					onClick={() => setChoose("add-server")}
				>
					<div className="form-create-server-btn-flx">
						<img src={create} alt="Create" />
						<div className="form-create-server-btn-title">Create My Own</div>
					</div>
					<i className="fa-solid fa-angle-right"></i>
				</div>
			</div>
			<div className="form-create-btm-wrap">
				<div className="form-create-btn-title">Have an invite already?</div>
				<button type="button" onClick={() => setChoose("join-server")}>
					Join a Server
				</button>
			</div>
		</>
	);
};

export default CreateJoin;
