const Search = ({ search, setSearch }) => {
	return (
		<label className="label-search">
			<input
				type="text"
				className="input-search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
			/>
			<i className="fa-solid fa-magnifying-glass"></i>
		</label>
	);
};

export default Search;
