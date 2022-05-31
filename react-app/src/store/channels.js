// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";
const GET_CHANNEL = "channels/GET_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
const CLEAR_CHANNELS = "channels/CLEAR_CHANNELS"

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
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



// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;
	switch (action.type) {
		case GET_CHANNELS:
			newState = { ...state };
			set = new Set(state.allIds);

			action.channels.forEach((channel) => {
				newState.byId[channel.id] = channel;
				set.add(channel.id);
			});

			newState.allIds = Array.from(set);
			return newState;
		case GET_CHANNEL:
			newState = { ...state };
			set = new Set(state.allIds);

			newState.byId[action.channel.id] = action.channel;
			set.add(action.channel.id);

			newState.allIds = Array.from(set);
			return newState;
		case DELETE_CHANNEL:
			newState = { ...state };
			set = new Set(state.allIds);

			delete newState.byId[action.channelId];
			set.delete(action.channelId);

			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_CHANNELS:
			return { byId: {}, allIds: [] }; 
		default:
			return state;
	}
}
