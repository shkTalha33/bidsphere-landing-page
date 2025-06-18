/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { axiosInstance } from "./axiosInstance";
import { setLogout } from "../redux/loginForm";
import { imageUpload } from "./ApiFile";
import toast from "react-hot-toast";
import { useRef, useCallback } from "react";
import { getLanguage } from "../redux/language/languageSlice";

const GoogleApiKey = "AIzaSyB9hunGMedxDrhrCt6GAr08ZODatbS2xZU";

const ApiFunction = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const userData = useSelector((state) => state.auth?.userData);
  const token = useSelector((state) => state.auth?.accessToken);
  const userLanguage = useSelector(getLanguage);

  const activeRequestsRef = useRef(new Map());

  const handleUserLogout = () => {
    dispatch(setLogout());
    navigate.replace("/auth/login");
    toast.info("Your session is expire, please login");
  };

  const getRequestKey = (method, endpoint, params) => {
    return `${method}:${endpoint}:${JSON.stringify(params || {})}`;
  };

  const get = useCallback(
    async (endpoint, params, options = {}) => {
      await new Promise((res) => setTimeout(res, 1000));

      const headers = {
        "Content-Type": "application/json",
        lang: userLanguage,
      };

      const { deduplicate = true, signal } = options;
      const requestKey = getRequestKey("GET", endpoint, params);

      if (deduplicate && activeRequestsRef.current.has(requestKey)) {
        return activeRequestsRef.current.get(requestKey);
      }

      const controller = signal ? undefined : new AbortController();
      const requestSignal = signal || controller?.signal;

      const requestPromise = axiosInstance
        .get(endpoint, {
          headers,
          params,
          signal: requestSignal,
        })
        .then((response) => response?.data)
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleUserLogout();
          }
          activeRequestsRef.current.delete(requestKey);
          throw error;
        })
        .finally(() => {
          activeRequestsRef.current.delete(requestKey);
        });

      if (deduplicate) {
        activeRequestsRef.current.set(requestKey, requestPromise);
      }

      return requestPromise;
    },
    [dispatch, navigate, userLanguage]
  );

  const post = useCallback(
    async (endpoint, apiData, options = {}) => {
      await new Promise((res) => setTimeout(res, 1000));

      const headers = options.headers || {
        "Content-Type": "application/json",
        lang: userLanguage,
      };

      const { deduplicate = true, signal } = options;
      const requestKey = getRequestKey("POST", endpoint, apiData);

      if (deduplicate && activeRequestsRef.current.has(requestKey)) {
        return activeRequestsRef.current.get(requestKey);
      }

      const controller = signal ? undefined : new AbortController();
      const requestSignal = signal || controller?.signal;

      const requestPromise = axiosInstance
        .post(endpoint, apiData, {
          headers,
          signal: requestSignal,
        })
        .then((response) => response?.data)
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleUserLogout();
          }
          activeRequestsRef.current.delete(requestKey);
          throw error;
        })
        .finally(() => {
          activeRequestsRef.current.delete(requestKey);
        });

      if (deduplicate) {
        activeRequestsRef.current.set(requestKey, requestPromise);
      }

      return requestPromise;
    },
    [dispatch, navigate, userLanguage]
  );

  const deleteData = useCallback(
    async (endpoint, options = {}) => {
      await new Promise((res) => setTimeout(res, 1000));

      const headers = options.headers || {
        "Content-Type": "application/json",
        lang: userLanguage,
      };

      const { deduplicate = true, signal } = options;
      const requestKey = getRequestKey("DELETE", endpoint);

      if (deduplicate && activeRequestsRef.current.has(requestKey)) {
        return activeRequestsRef.current.get(requestKey);
      }

      const controller = signal ? undefined : new AbortController();
      const requestSignal = signal || controller?.signal;

      const requestPromise = axiosInstance
        .delete(endpoint, {
          headers,
          signal: requestSignal,
        })
        .then((response) => response?.data)
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleUserLogout();
          }
          activeRequestsRef.current.delete(requestKey);
          throw error;
        })
        .finally(() => {
          activeRequestsRef.current.delete(requestKey);
        });

      if (deduplicate) {
        activeRequestsRef.current.set(requestKey, requestPromise);
      }

      return requestPromise;
    },
    [dispatch, navigate, userLanguage]
  );

  const put = useCallback(
    async (endpoint, apiData, options = {}) => {
      await new Promise((res) => setTimeout(res, 1000));

      const headers = options.headers || {
        "Content-Type": "application/json",
        lang: userLanguage,
      };

      const { deduplicate = true, signal } = options;
      const requestKey = getRequestKey("PUT", endpoint, apiData);

      if (deduplicate && activeRequestsRef.current.has(requestKey)) {
        return activeRequestsRef.current.get(requestKey);
      }

      const controller = signal ? undefined : new AbortController();
      const requestSignal = signal || controller?.signal;

      const requestPromise = axiosInstance
        .put(endpoint, apiData, {
          headers,
          signal: requestSignal,
        })
        .then((response) => response?.data)
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleUserLogout();
          }
          activeRequestsRef.current.delete(requestKey);
          throw error;
        })
        .finally(() => {
          activeRequestsRef.current.delete(requestKey);
        });

      if (deduplicate) {
        activeRequestsRef.current.set(requestKey, requestPromise);
      }

      return requestPromise;
    },
    [dispatch, navigate, userLanguage]
  );

  const cancelAllRequests = useCallback(() => {
    activeRequestsRef.current.clear();
  }, []);

  const uploadFile2 = async ({ data }) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));

      const headers = {
        "Content-Type": "multipart/form-data",
        lang: userLanguage,
      };

      const res = await axiosInstance.post(imageUpload, data, { headers });
      return res?.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get,
    post,
    deleteData,
    uploadFile2,
    put,
    userData,
    GoogleApiKey,
    cancelAllRequests,
    token,
  };
};

export default ApiFunction;