// Actions
const GET_USERS = "users/GET_USERS";
const CLEAR_USERS = "users/CLEAR_USERS";

// Action Creator
export const getUsers = (users) => {
	return {
		type: GET_USERS,
		users,
	};
};

export const clearUsers = () => ({
	type: CLEAR_USERS,
});

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_USERS:
			newState = { ...state };
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			action.users.forEach((user) => {
				newState.byId[user.id] = user;
				set.add(user.id);
			});

			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_USERS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
