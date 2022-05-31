// Actions
const GET_JOIN_SERVERS = "joinServers/GET_JOIN_SERVERS";
const JOIN_SERVER = "joinServers/JOIN_SERVER";
const LEAVE_SERVER = "joinServers/LEAVE_SERVER";

// Action Creator
export const getJoinServers = (joinServers) => {
	return {
		type: GET_JOIN_SERVERS,
		joinServers,
	};
};

export const joinServer = (joinServer) => {
	return {
		type: JOIN_SERVER,
		joinServer,
	};
};

const leaveServer = (serverId) => {
	return {
		type: LEAVE_SERVER,
		serverId,
	};
};

// Thunks
export const joinNewServer = (payload) => async (dispatch) => {
	const response = await fetch("/api/join_servers/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(joinServer(data.joinServer));
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

export const leaveThisServer =
	({ serverId }) =>
	async (dispatch) => {
		const response = await fetch(`/api/join_servers/${serverId}`, {
			method: "DELETE",
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(leaveServer(serverId));
			return data.server;
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
		case GET_JOIN_SERVERS:
			newState = { ...state };
			// Change all ids to set to prevent duplicate
			set = new Set(state.allIds);
			// Add to new state
			action.joinServers.forEach((join) => {
				newState.byId[join.server_id] = join;
				set.add(join.server_id);
			});
			// Change all ids back to array
			newState.allIds = Array.from(set);
			return newState;
		case JOIN_SERVER:
			newState = { ...state };
			// Change all ids to set to prevent duplicate
			set = new Set(state.allIds);
			// Add to new state
			newState.byId[action.joinServer.server_id] = action.joinServer;
			set.add(action.joinServer.server_id);
			// Change all ids back to array
			newState.allIds = Array.from(set);
			return newState;
		case LEAVE_SERVER:
			newState = { ...state };
			// Change all ids to set to prevent duplicate
			set = new Set(state.allIds);
			// Remove from new state
			delete newState.byId[action.serverId];
			set.delete(action.serverId);
			// Change all ids back to array
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
