// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";
const GET_CHANNEL = "channels/GET_CHANNEL";

const ADD_EDIT_CHANNEL = "channels/ADD_EDIT_CHANNEL";

const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
const CLEAR_CHANNELS = "channels/CLEAR_CHANNELS";

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

export const addEditChannel = (channel) => {
	return {
		type: ADD_EDIT_CHANNEL,
		channel,
	};
};

export const deleteChannels = (channelId) => {
	return {
		type: DELETE_CHANNEL,
		channelId,
	};
};
export const clearChannels = () => ({
	type: CLEAR_CHANNELS,
});

// Thunks
export const getChannel = (channelId) => async (dispatch) => {
	const response = await fetch(`/api/channels/${channelId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(addEditChannel(data.channel));
		return data;
	}
};

export const addNewChannel = (newChannel) => async (dispatch) => {
	const response = await fetch(`/api/channels/${newChannel.serverIdnum}/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newChannel),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addEditChannel(data.channel));
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

export const editChannel = (channel) => async (dispatch) => {
	const response = await fetch(
		`/api/channels/${channel.server_id}/${channel.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(channel),
		}
	);

	if (response.ok) {
		const data = await response.json();
		dispatch(addEditChannel(data.channel));
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

export const deleteThisChannel = (channelToDelete) => async (dispatch) => {
	const response = await fetch(
		`/api/channels/${channelToDelete.server_id}/${channelToDelete.id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(channelToDelete),
		}
	);

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteChannels(data.channelId));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_CHANNELS:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			action.channels.forEach((channel) => {
				newState.byId[channel.id] = channel;
				set.add(channel.id);
			});

			newState.allIds = Array.from(set);
			return newState;
		case GET_CHANNEL:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			newState.byId[action.channel.id] = action.channel;
			set.add(action.channel.id);

			newState.allIds = Array.from(set);
			return newState;
		case DELETE_CHANNEL:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			delete newState.byId[action.channelId];
			set.delete(action.channelId);

			newState.allIds = Array.from(set);
			return newState;
		case ADD_EDIT_CHANNEL:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
			set = new Set(newState.allIds);

			newState.byId[action.channel.id] = action.channel;
			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_CHANNELS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
