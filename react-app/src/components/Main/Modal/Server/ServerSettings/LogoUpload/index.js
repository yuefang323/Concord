import { useState } from "react";
import { useDispatch } from "react-redux";

import AWS from "aws-sdk";

import * as serversActions from "../../../../../../store/servers";

const S3_BUCKET = "go-concord";
const REGION = "us-east-1";
const ACCESS_KEY = "";
const SECRET_ACCESS_KEY = "";

AWS.config.update({
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});

const LogoUpload = ({ server, onClose, onCloseLogo }) => {
	const dispatch = useDispatch();

	const [logoFileName, setLogoFileName] = useState("");
	const [bgFileName, setBgFileName] = useState("");
	const [logo, setLogo] = useState();
	const [bg, setBg] = useState();

	const upload = async (e) => {
		e.preventDefault();

		let serverToUpdate = { ...server };

		let logoName;
		let bgName;

		if (logo) {
			logoName = `server-${server.id}-logo-${logo.name}`;

			const params = {
				ACL: "public-read",
				Body: logo,
				Bucket: S3_BUCKET,
				Key: logoName,
			};

			myBucket.putObject(params).send((err) => {
				if (err) console.log(err);
			});

			serverToUpdate = {
				...serverToUpdate,
				logo: `https://go-concord.s3.amazonaws.com/${logoName}`,
			};
		}

		if (bg) {
			bgName = `server-${server.id}-bg-${bg.name}`;

			const params = {
				ACL: "public-read",
				Body: bg,
				Bucket: S3_BUCKET,
				Key: bgName,
			};

			myBucket.putObject(params).send((err) => {
				if (err) console.log(err);
			});

			serverToUpdate = {
				...serverToUpdate,
				background: `https://go-concord.s3.amazonaws.com/${bgName}`,
			};
		}

		setTimeout(() => {
			// dispatch
			dispatch(serversActions.editServer(serverToUpdate));

			onClose();
		}, 1000);
	};

	return (
		<div className="form-ctrl form-sm">
			<div className="form-ctrl-wrap">
				<div className="form-h2">
					Upload Logo & Background for {server.name}
				</div>
				<div className="upload-wrap">
					<label className="label-upload">
						<div>Logo</div>
						<i className="fa-solid fa-camera"></i>
						<input
							className="input-upload"
							type="file"
							accept="image/*"
							onChange={(e) => {
								setLogo(e.target.files[0]);
								setLogoFileName(e.target.files[0].name);
							}}
						/>
						<div>{logoFileName}</div>
					</label>
					<label className="label-upload">
						<div>Background</div>
						<i className="fa-solid fa-image"></i>
						<input
							className="input-upload"
							type="file"
							accept="image/*"
							onChange={(e) => {
								setBg(e.target.files[0]);
								setBgFileName(e.target.files[0].name);
							}}
						/>
						<div>{bgFileName}</div>
					</label>
				</div>
			</div>
			<div className="form-create-btm-wrap-row">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={onCloseLogo}
				>
					Cancel
				</button>
				<button className="form-create-btm-btn" type="button" onClick={upload}>
					Upload
				</button>
			</div>
		</div>
	);
};

export default LogoUpload;
