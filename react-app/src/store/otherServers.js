// Actions
const GET_OTHER_SERVERS = "other_servers/GET_OTHER_SERVERS";

// Action Creator
export const getOtherServers = (servers) => {
	return {
		type: GET_OTHER_SERVERS,
		servers,
	};
};

// Thunks

// Reducer
const initialState = { byId: null, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_OTHER_SERVERS:
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
