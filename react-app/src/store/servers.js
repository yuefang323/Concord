// Actions
const GET_SERVERS = "servers/GET_SERVERS";
const ADD_EDIT_SERVER = "servers/ADD_EDIT_SERVER";
const DELETE_SERVER = "servers/DELETE_SERVER";
const CLEAR_SERVERS = "servers/CLEAR_SERVERS";

// Action Creator
export const getServers = (servers) => {
	return {
		type: GET_SERVERS,
		servers,
	};
};

export const addEditServer = (server) => {
	return {
		type: ADD_EDIT_SERVER,
		server,
	};
};

const deleteServer = (serverId) => {
	return {
		type: DELETE_SERVER,
		serverId,
	};
};

export const clearServers = () => ({
	type: CLEAR_SERVERS,
});

// Thunks
export const getServer = (serverId) => async (dispatch) => {
	const response = await fetch(`/api/servers/${serverId}`);
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

export const editServer = (server) => async (dispatch) => {
	const response = await fetch(`/api/servers/${server.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(server),
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

export const removeServerLogo = (serverId) => async (dispatch) => {
	const response = await fetch(`/api/servers/${serverId}/logo`, {
		method: "DELETE",
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

export const deleteThisServer = (serverToDelete) => async (dispatch) => {
	const response = await fetch(`/api/servers/${serverToDelete.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(serverToDelete),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteServer(data.serverId));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_SERVERS:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);
			// Add
			action.servers.forEach((server) => {
				newState.byId[server.id] = server;
				set.add(server.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_SERVER:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);
			// Update
			newState.byId[action.server.id] = action.server;
			set.add(action.server.id);

			newState.allIds = Array.from(set);
			return newState;
		case DELETE_SERVER:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);
			// Delete
			delete newState.byId[action.serverId];
			set.delete(action.serverId);

			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_SERVERS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
