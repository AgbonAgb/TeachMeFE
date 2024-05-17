import axios, { AxiosInstance } from 'axios';

export const request: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	env: {
		// The FormData class to be used to automatically serialize the payload into a FormData object
		FormData: globalThis?.FormData,
	},
});

// Set up axios request interceptors
request.interceptors.request.use(
	function (config) {
		let token = "";
		if (typeof (config?.headers as any).authorization === "undefined") {
			const tokenModel = JSON.parse(
				localStorage.getItem("token-name") || "{}"
			);

			if (tokenModel?.Token) {
				token = tokenModel?.Token;
			}
		}
		config.headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			...config.headers,
		} as any;

		return config;
	},
	function (error: any) {
		if (getOnlineStatus() === 'offline') {
			error = { message: 'You are currently offline. Kindly turn on your network or try again' };
			return Promise.reject(error);
		}
	}
);

request.interceptors.response.use(null, function (error) {
	if (error?.response?.status === 401 || error?.response?.status === 403) {
	}

	return Promise.reject(error);
});

function getOnlineStatus() {
	return navigator.onLine ? 'online' : 'offline';
}

window.addEventListener('offline', getOnlineStatus);
window.addEventListener('online', getOnlineStatus);

export default request;
