// Actions
const GET_PRV_CHANNELS = "prv_channels/GET_PRV_CHANNELS";

// Action Creator
export const getPrvChannels = (prv_channels) => {
	return {
		type: GET_PRV_CHANNELS,
		prv_channels,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_PRV_CHANNELS:
			newState = { ...state };
			action.prv_channels.forEach((prv_channel) => {
				newState.byId[prv_channel.id] = prv_channel;
				newState.allIds.push(prv_channel.id);
			});
			return newState;
		default:
			return state;
	}
}
