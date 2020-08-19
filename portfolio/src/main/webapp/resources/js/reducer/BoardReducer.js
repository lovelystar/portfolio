import { createAction, handleActions } from "redux-actions";

const initState = {
	isLoading: false,
	result: null,
};

export const getBoard = createAction("BOARD_LIST", (obj) => (obj)); // 글 목록
export const getBoardSuccess = createAction("BOARD_LIST_SUCCESS", (payload) => (payload));
export const appError = createAction("APP_ERROR"); // 에러

export const BoardReducer = handleActions({
	
	[getBoard]: (state, action) => {
		return {...state, isLoading: true, result: null};
	},
	[getBoardSuccess]: (state, action) => {
		return {...state, isLoading: false, result: action.payload.data};
	},
	
}, initState);

export default BoardReducer;