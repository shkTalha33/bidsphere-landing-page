"use client"

/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import { setLogout } from '../redux/loginForm'
import { useRouter } from "next/navigation";
import axiosInstance from "./axiosInstance";
import { imageUpload } from "./ApiRoutesFile";
import { decryptData } from "../redux/localStorageSecure";

const ApiFunction = () => {
    const encryptedUser = useSelector(state => state.auth?.userData);
    const userData = decryptData(encryptedUser)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleUserLogout = () => {
        dispatch(setLogout());
        router.push("/auth/login", { replace: true });
        message.info('Your session is expire, please login')
    }

    // Define headers
    const header1 = {
        "Content-Type": "application/json",
        // "x-auth-token": token,
    };

    const header2 = {
        "Content-Type": "multipart/form-data",
        // "x-auth-token": token,
    };

    // API Functions
    const get = async (endpoint, headers = header1) => {
        try {
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in GET request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const post = async (endpoint, apiData, headers = header1) => {
        try {
            const response = await axiosInstance.post(endpoint, apiData, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in POST request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const deleteData = async (endpoint, headers = header1) => {
        try {
            const response = await axiosInstance.delete(endpoint, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in DELETE request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const put = async (endpoint, apiData, headers = header1) => {
        try {
            const response = await axiosInstance.put(endpoint, apiData, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in PUT request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const uploadFile2 = async ({ data }) => {
        try {
            const res = await axiosInstance.post(imageUpload, data, {
                headers: {
                    ...header2,
                },
            });
            // // console.log(res.data, "res");
            return res?.data
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
        header1,
        header2,
        userData,
    };
};

export default ApiFunction;
