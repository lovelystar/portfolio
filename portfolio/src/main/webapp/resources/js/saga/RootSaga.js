import { all } from "redux-saga/effects";

import { joinWatch } from "./JoinSaga";
import { boardWatch } from "./BoardSaga";


export function* rootSaga() {
	
	yield all([
		joinWatch(),
		boardWatch(),
	]);
	
};

export default rootSaga;