// Actions
const GET_SERVERS = "servers/GET_SERVERS";

// Action Creator
export const getServers = (servers) => {
	return {
		type: GET_SERVERS,
		servers,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_SERVERS:
			newState = { ...state };
			action.servers.forEach((server) => {
				newState.byId[server.id] = server;
				newState.allIds.push(server.id);
			});
			return newState;
		default:
			return state;
	}
}
