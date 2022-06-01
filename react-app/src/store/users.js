// Actions
const GET_USERS = "users/GET_USERS";
const CLEAR_USERS = "users/CLEAR_USERS"

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
	switch (action.type) {
		case GET_USERS:
			newState = { ...state };
			action.users.forEach((user) => {
				newState.byId[user.id] = user;
				newState.allIds.push(user.id);
			});
			return newState;
		case CLEAR_USERS:
			return { byId: {}, allIds: [] }; 
		default:
			return state;
	}
}
