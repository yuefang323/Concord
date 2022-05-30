// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";
const GET_CHANNEL = "channels/GET_CHANNEL";

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

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
			newState[action.channel.id] = action.channel;
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
