// Actions
const GET_JOIN_SERVERS = "joinServers/GET_JOIN_SERVERS";

// Action Creator
export const getJoinServers = (joinServers) => {
	return {
		type: GET_JOIN_SERVERS,
		joinServers,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_JOIN_SERVERS:
			newState = { ...state };
			let set = new Set(state.allIds);
			action.joinServers.forEach((join) => {
				newState.byId[join.server_id] = join;
				set.add(join.server_id);
			});
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
