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
export const editChat = (chat) => async (dispatch) => {
	const response = await fetch(`/api/chats/${chat.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(chat),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addEditChat(data.chat));
		return data.chat;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteThisChat = (chatId) => async (dispatch) => {
	const response = await fetch(`/api/chats/${chatId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteChat(chatId));
		return data.channel;
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
		case GET_CHATS:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);
			// Do the thing
			action.chats.forEach((chat) => {
				newState.byId[chat.id] = chat;
				set.add(chat.id);
			});

			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_CHAT:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);
			// Do the thing
			newState.byId[action.chat.id] = action.chat;
			set.add(action.chat.id);

			newState.allIds = Array.from(set);
			return newState;
		case DELETE_CHAT:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
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
