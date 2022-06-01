// Actions
const GET_PRV_CHATS = "prv_chats/GET_PRV_CHATS";
const CLEAR_PRV_CHATS = "prv_chats/CLEAR_PRV_CHATS"
// Action Creator
export const getPrvChats = (prv_chats) => {
	return {
		type: GET_PRV_CHATS,
		prv_chats,
	};
};

export const clearPrvChats = () => ({
	type: CLEAR_PRV_CHATS, 
}); 

// Thunks



// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_PRV_CHATS:
			newState = { ...state };
			let set = new Set(state.allIds);
			action.prv_chats.forEach((prv_chat) => {
				newState.byId[prv_chat.id] = prv_chat;
				set.add(prv_chat.id);
			});
			newState.allIds = Array.from(set);
			return newState;
        case CLEAR_PRV_CHATS:
            return { byId: {}, allIds: [] }; 
		default:
			return state;
	}
}
