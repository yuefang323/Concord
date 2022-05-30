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
			let set = new Set(state.allIds);
			action.channels.forEach((channel) => {
				newState.byId[channel.id] = channel;
				set.add(channel.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
