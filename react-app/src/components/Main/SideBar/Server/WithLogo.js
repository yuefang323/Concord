const WithLogo = ({ server }) => {
	return (
		<div
			className="sidebar-btn"
			style={{ backgroundImage: `url(${server.logo})` }}
		></div>
	);
};

export default WithLogo;
