import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

const axiosMain = axios.create({
	baseURL: REACT_APP_WEBPACK_MAIN_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosFormData = axios.create({
	baseURL: REACT_APP_WEBPACK_MAIN_HOST,
	timeout: 180000,
	transformRequest: [(response) => (response)],
	//transformRequest: [(response) => JSON.stringify(response)],
	header: {
		"Content-Type": false
	}
});

const axiosAuth = axios.create({
	baseURL: REACT_APP_WEBPACK_AUTH_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosResource = axios.create({
	baseURL: REACT_APP_WEBPACK_RESOURCE_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosWeather = axios.create({
	baseURL: REACT_APP_WEBPACK_WEATHER_HOST,
	timeout: 180000,
	withCredentials: false,
});

// 아래처럼 해도되는데 CplSaga에 있는 것처럼 추가해도 됨.
axiosMain.interceptors.request.use((config) => {
	
	// 요청 인터셉터
	return config;

}, (error) => {
	return Promise.reject(error);
});

axiosMain.interceptors.response.use((res) => {

	// 응답 인터셉터
	return res;

}, (error) => {
	return Promise.reject(error);
});

axiosFormData.interceptors.request.use((config) => {
	
	//setProgress(0);
	//timer();

	// 요청 인터셉터
	return config;

}, (error) => {
	return Promise.reject(error);
});

axiosFormData.interceptors.response.use((res) => {

	//if(timerId) {
	//	clearTimeout(timerId);
	//	timerId = null;
	//}

	//setProgress(100);

	// 응답 인터셉터
	return res;

}, (error) => {
	return Promise.reject(error);
});

export { axiosMain, axiosAuth, axiosResource, axiosFormData, axiosWeather };