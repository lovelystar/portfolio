import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducer/RootReducer";

export default function storeConfig() {
	
	const sagaMiddleware = createSagaMiddleware();
	const logger = createLogger();
	
	return{
		
		...createStore(rootReducer, applyMiddleware(logger, sagaMiddleware)),
		runSaga: sagaMiddleware.run
		
	}
	
}