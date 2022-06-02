// ------------Constants------------
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_USER = 'session/EDIT_USER'

// -------------Actions-------------
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const editUser = (user) => ({
	type: EDIT_USER,
	payload: user
})

// -------------Thunks-------------
export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
	headers: {
	  'Content-Type': 'application/json'
	}
  });
  if (response.ok) {
	const data = await response.json();
	if (data.errors) {
	  return;
	}

	dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify({
	  email,
	  password
	})
  });


  if (response.ok) {
	const data = await response.json();
	dispatch(setUser(data))
	return null;
  } else if (response.status < 500) {
	const data = await response.json();
	if (data.errors) {
	  return data.errors;
	}
  } else {
	return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
	headers: {
	  'Content-Type': 'application/json',
	}
  });

  if (response.ok) {
	dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
	body: JSON.stringify({
	  username,
	  email,
	  password,
	}),
  });

  if (response.ok) {
	const data = await response.json();
	dispatch(setUser(data))
	return null;
  } else if (response.status < 500) {
	const data = await response.json();
	if (data.errors) {
	  return data.errors;
	}
  } else {
	return ['An error occurred. Please try again.']
  }
}

export const updateUser = (user, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: "PUT",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	})

	if (response.ok) {
		const data = await response.json();
		dispatch(editUser(data))
		return data
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data
		}
	} else {
		return { errors: ['An error occured. Please Try again.'] }
	}
}

// -------------Reducer-------------
const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState
  switch (action.type) {
	case SET_USER:
	  return { user: action.payload }
	case REMOVE_USER:
	  return { user: null }
	case EDIT_USER:
		newState = { ...state }
		newState = action.payload

		return newState
	default:
	  return state;
  }
}
