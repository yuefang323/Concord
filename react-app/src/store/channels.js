// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_CHANNELS:
			newState = { ...state };
			action.channels.forEach((channel) => {
				newState.byId[channel.id] = channel;
				newState.allIds.push(channel.id);
			});
			return newState;
		default:
			return state;
	}
}
