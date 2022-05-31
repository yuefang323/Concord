const TopLeft = ({ server }) => {
	return (
		<div className="top-name-wrap">
			<div className="top-server-name">{server?.name}</div>
			<i className="fa-solid fa-chevron-down"></i>
		</div>
	);
};

export default TopLeft;
