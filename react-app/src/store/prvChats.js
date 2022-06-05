// Actions
const GET_PRV_CHATS = "prv_chats/GET_PRV_CHATS";
const ADD_EDIT_PRV_CHAT = "prv_chats/ADD_EDIT_PRV_CHAT"
const DELETE_PRV_CHAT = "prv_chats/DELETE_PRV_CHAT"
const CLEAR_PRV_CHATS = "prv_chats/CLEAR_PRV_CHATS";
// Action Creator
export const getPrvChats = (prv_chats) => {
	return {
		type: GET_PRV_CHATS,
		prv_chats,
	};
};

export const addEditPrvChat = (prv_chat) => {
	return {
		type: ADD_EDIT_PRV_CHAT,
		prv_chat,
	}
}

export const deletePrvChat = (prvChatId) => {
	return {
		type: DELETE_PRV_CHAT,
		prvChatId,
	}
}

export const clearPrvChats = () => ({
	type: CLEAR_PRV_CHATS,
});

// Thunks
export const editPrvChat = (prvChat) => async (dispatch) => {
	const res = await fetch(`/api/prv_chats/${prvChat.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(prvChat)
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(addEditPrvChat(data.prv_chat));
		return data.prv_chat
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occured. Please try again."]
	}
}

export const removePrvChat = (prvChatId) => async (dispatch) => {
	const res = await fetch(`/api/prv_chats/${prvChatId}`, {
		method: "DELETE"
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(deletePrvChat(prvChatId));
		return data.prv_channel
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occured. Please try again."]
	}
}


// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;

	switch (action.type) {
		case GET_PRV_CHATS:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			action.prv_chats.forEach((prv_chat) => {
				newState.byId[prv_chat.id] = prv_chat;
				set.add(prv_chat.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_PRV_CHAT:
			newState = { ...state };
			newState.byId = JSON.parse(JSON.stringify(newState.byId))
			set = new Set(newState.allIds);

			newState.byId[action.prv_chat.id] = action.prv_chat;
			set.add(action.prv_chat.id);

			newState.allIds = Array.from(set);
			return newState
		case DELETE_PRV_CHAT:
			newState = { ...state };
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			delete newState.byId[action.prvChatId];
			set.delete(action.prvChatId);

			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_PRV_CHATS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
