// Actions
const GET_SERVERS = "servers/GET_SERVERS";
const JOIN_SERVER = "servers/JOIN_SERVER";

// Action Creator
export const getServers = (servers) => {
	return {
		type: GET_SERVERS,
		servers,
	};
};

const joinServer = (server) => {
	return {
		type: JOIN_SERVER,
		server,
	};
};

// Thunks
export const joinServerUser = (serverToJoin) => async (dispatch) => {
	const response = await fetch("/api/servers/join", {
		method: "POST",
		body: JSON.stringify(serverToJoin),
	});
	const data = await response.json();
	dispatch(joinServer(data.server));
	return data;
};

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_SERVERS:
			newState = { ...state };
			let set = new Set(state.allIds);
			action.servers.forEach((server) => {
				newState.byId[server.id] = server;
				set.add(server.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
