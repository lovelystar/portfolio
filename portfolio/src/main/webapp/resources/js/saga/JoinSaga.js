import "regenerator-runtime/runtime";
import { delay, call, put, all, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as JoinReducer from "../reducer/JoinReducer";
import { axiosMain } from "../server/Axios";

export function* joinWatch() {
	yield takeLatest(JoinReducer.idCheck, idCheckAction);
	yield takeLatest(JoinReducer.join, joinAction);
}

function* idCheckAction(id) {

	try {

		const data = id.payload;
		const param = new Object();
		param.id = data;
		
		const result = yield call([axiosMain, axiosMain.post], "/idcheck", param);
		
		yield put(JoinReducer.idCheckResult(result));

	} catch(error) {

	}

}

function* joinAction(obj) {
	
	try {

		const result = yield call([axiosMain, axiosMain.post], "/signup", obj.payload);
		yield put(JoinReducer.joinResult(result));

	} catch(error) {

	}

}