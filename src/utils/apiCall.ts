import axios, { AxiosInstance } from "axios";

export const apiCall = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    env: {
      // The FormData class to be used to automatically serialize the payload into a FormData object
      FormData: globalThis?.FormData,
    },
  });

  // Set up axios request interceptors
  instance.interceptors.request.use(
    function (config: any) {
      config.baseURL = process.env.REACT_APP_BASE_URL;
      let token = "";

      if (typeof (config?.headers as any).authorization === "undefined") {
        const tokenModel = JSON.parse(
          localStorage.getItem("member-admin-user") || "{}"
        );

        if (tokenModel?.Token) {
          token = tokenModel?.Token;
        }
      }

      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-XSS-Protection": "1; mode=block",
        "Content-Type": "application/json",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Content-Security-Policy":
          "script-src 'self' 'unsafe-inline' kit.fontawesome.com code.jquery.com cdn.jsdelivr.net embed.tawk.to static-v.tawk.to stackpath.bootstrapcdn.com cdn.datatables.net pharmmall.azurewebsites.net https://standard.paystack.co https://merchant-api.staging.cyberpay.ng",
        "X-Frame-Options": "SAMEORIGIN",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=31536000",
        "Feature-Policy":
          "accelerometer 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; usb 'none'",
        "Cache-Control": "no-cache",
        "Cross-Origin-Opener-Policy": "same-origin",
        Pragma: "no-cache",
      };

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Axios Response Interceptor
  instance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      if (updateOnlineStatus() === "offline") {
        error = {
          message:
            "You are currently offline. Kindly turn on your network or try again",
        };
        return Promise.reject(error);
      }

      if (error?.response?.status === 401 || error?.response?.status === 401) {
        localStorage.removeItem("member-admin-user");
        window.location.replace("/");
      }

      return Promise.reject(error);
    }
  );

  function updateOnlineStatus() {
    return navigator.onLine ? "online" : "offline";
  }

  window.addEventListener("offline", updateOnlineStatus);
  window.addEventListener("online", updateOnlineStatus);

  return instance;
};

export default apiCall;
