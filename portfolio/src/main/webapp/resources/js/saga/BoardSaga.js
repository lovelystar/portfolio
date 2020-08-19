import "regenerator-runtime/runtime";
import { delay, call, put, all, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as BoardReducer from "../reducer/BoardReducer";
import { axiosMain } from "../server/Axios";
import Footer from "../component/Footer";

export function* boardWatch() {
	yield takeLatest(BoardReducer.getBoard, getBoardAction);
}

function* getBoardAction(obj) {

	try {

		const data = obj.payload;
		const result = yield call([axiosMain, axiosMain.post], "/getboard", data);
		
		yield put(BoardReducer.getBoardSuccess(result));

	} catch(error) {
		yield put(BoardReducer.appError(error));
	}

}