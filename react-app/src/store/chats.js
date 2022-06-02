// Actions
const GET_CHATS = "chats/GET_CHATS";
const ADD_EDIT_CHAT = "chats/ADD_EDIT_CHAT";
const DELETE_CHAT = "chats/DELETE_CHAT";
const CLEAR_CHATS = "chats/CLEAR_CHATS";

// Action Creator
export const getChats = (chats) => {
	return {
		type: GET_CHATS,
		chats,
	};
};

export const addEditChat = (chat) => {
	return {
		type: ADD_EDIT_CHAT,
		chat,
	};
};

export const deleteChat = (chatId) => {
	return {
		type: DELETE_CHAT,
		chatId,
	};
};

export const clearChats = () => ({
	type: CLEAR_CHATS,
});
// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_CHATS:
			newState = { ...state };
			set = new Set(newState.allIds);
			// Do the thing
			action.chats.forEach((chat) => {
				newState.byId[chat.id] = chat;
				set.add(chat.id);
			});

			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_CHAT:
			newState = { ...state };
			set = new Set(newState.allIds);
			// Do the thing
			newState.byId[action.chat.id] = action.chat;
			set.add(action.chat.id);

			newState.allIds = Array.from(set);
			return newState;
		case DELETE_CHAT:
			newState = { ...state };
			set = new Set(newState.allIds);

			delete newState.byId[action.chatId];
			set.delete(action.chatId);

			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_CHATS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
