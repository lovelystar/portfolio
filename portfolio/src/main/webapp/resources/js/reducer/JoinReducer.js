import { createAction, handleActions } from "redux-actions";

const initState = {
	chk: false,
	idCheck: null,
	joinCheck: null,
};

export const idCheck = createAction("ID_CHECK_PROCESS", (id) => (id));
export const idCheckResult = createAction("ID_CHECK_PROCESS_RESULT");
export const join = createAction("JOIN_PROCESS", (obj) => (obj));
export const joinResult = createAction("JOIN_PROCESS_RESULT");

export const JoinReducer = handleActions({

	[idCheck]: (state) => {
		return {...state}
	},
	[idCheckResult]: (state, action) => {
		return {...state, idCheck: action.payload.data.resultCode};
	},

	[join]: (state) => {
		return {...state}
	},
	[joinResult]: (state, action) => {
		return {...state, joinCheck: action.payload.data};
	}

}, initState);

export default JoinReducer;