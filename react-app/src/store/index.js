import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import servers from "./servers";
import channels from "./channels";
import chats from "./chats";
import prvChannels from "./prvChannels";
import prvChats from "./prvChats";
import joinServers from "./joinServers";
import users from "./users";

const rootReducer = combineReducers({
	session,
	servers,
	channels,
	chats,
	prvChannels,
	prvChats,
	joinServers,
	users,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
