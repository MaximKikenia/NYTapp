
const redux = require("redux");
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { ReducerOne } from "./reducers/reducerOne";
import { ReducerTwo } from "./reducers/reducerTwo";
//Redux devTool in Chrome: press f12, redux in Chrome
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    ReducerOne
});

const Store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export {Store};
