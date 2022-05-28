// Actions
const GET_PRV_CHATS = "prv_chats/GET_PRV_CHATS";

// Action Creator
export const getPrvChats = (prv_chats) => {
	return {
		type: GET_PRV_CHATS,
		prv_chats,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_PRV_CHATS:
			newState = { ...state };
			action.prv_chats.forEach((prv_chat) => {
				newState.byId[prv_chat.id] = prv_chat;
				newState.allIds.push(prv_chat.id);
			});
			return newState;
		default:
			return state;
	}
}
