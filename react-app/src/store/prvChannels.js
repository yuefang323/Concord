// Actions
const GET_PRV_CHANNELS = "prv_channels/GET_PRV_CHANNELS";
const ADD_EDIT_PRV_CHANNEL = "prv_channels/ADD_EDIT_PRV_CHANNEL";
const CLEAR_PRV_CHANNELS = "prv_channels/CLEAR_PRV_CHANNELS";
// Action Creator
export const getPrvChannels = (prv_channels) => {
	return {
		type: GET_PRV_CHANNELS,
		prv_channels,
	};
};

export const addEditPrvChannel = (prv_channel) => {
	return {
		type: ADD_EDIT_PRV_CHANNEL,
		prv_channel,
	};
};

export const clearPrvChannels = () => ({
	type: CLEAR_PRV_CHANNELS,
});

// Thunks

export const addNewPrvChannel = (newPrvChannel) => async (dispatch) => {
	const response = await fetch(`/api/channels/@me/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newPrvChannel),
	});
	if (response.ok) {
		const data = await response.json();
		// dispatch(addEditChannel(data.channel));
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

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	let set;

	switch (action.type) {
		case GET_PRV_CHANNELS:
			newState = Object.assign({}, state);
			newState.byId = JSON.parse(JSON.stringify(newState.byId));
      set = new Set(newState.allIds);

			action.prv_channels.forEach((prv_channel) => {
				newState.byId[prv_channel.id] = prv_channel;
				set.add(prv_channel.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		case CLEAR_PRV_CHANNELS:
			return { byId: {}, allIds: [] };
		default:
			return state;
	}
}
