// Actions
const GET_USERS = "users/GET_USERS";

// Action Creator
export const getUsers = (users) => {
	return {
		type: GET_USERS,
		users,
	};
};

// Thunks

// Reducer
const initialState = { byId: null, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_USERS:
			newState = { ...state };
			action.users.forEach((user) => {
				newState.byId[user.id] = user;
				newState.allIds.push(user.id);
			});
			return newState;
		default:
			return state;
	}
}
