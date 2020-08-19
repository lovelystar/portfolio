import { combineReducers } from "redux";

import JoinReducer from "./JoinReducer";
import BoardReducer from "./BoardReducer";

export const rootReducer = combineReducers({
    
	JoinReducer,
	BoardReducer,

});

export default rootReducer;