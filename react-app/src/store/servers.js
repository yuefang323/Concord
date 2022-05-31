// Actions
const GET_SERVERS = "servers/GET_SERVERS";
const ADD_EDIT_SERVER = "servers/ADD_EDIT_SERVER";

// Action Creator
export const getServers = (servers) => {
	return {
		type: GET_SERVERS,
		servers,
	};
};

const addEditServer = (server) => {
	return {
		type: ADD_EDIT_SERVER,
		server,
	};
};

// Thunks

export const addNewServer = (newServer) => async (dispatch) => {
	const response = await fetch("/api/servers/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newServer),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addEditServer(data.server));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_SERVERS:
			newState = { ...state };
			set = new Set(state.allIds);
			action.servers.forEach((server) => {
				newState.byId[server.id] = server;
				set.add(server.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_SERVER:
			newState = { ...state };
			set = new Set(state.allIds);
			newState.byId[action.server.id] = action.server;
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
