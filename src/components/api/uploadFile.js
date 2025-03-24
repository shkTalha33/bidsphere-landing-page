/* eslint-disable no-throw-literal */

import imageCompression from "browser-image-compression";
import { isValidFileType } from "./isValidType";
import axiosInstance from "./axiosInstance";
import ApiFunction from "./apiFuntions";
import { imageUpload } from "./ApiFile";
// import { imageUpload } from "./ApiRoutesFile";
const header = {
  "Content-Type": "multipart/form-data",
  // "x-auth-token": token,
};
export const uploadFile = async (file, acceptPdf = null) => {
  try {
    const validExtensions = acceptPdf
      ? ["jpg", "gif", "svg", "png", "jpeg", "pdf"]
      : ["jpg", "gif", "svg", "png", "jpeg"];
    const check = isValidFileType(file, validExtensions);
    if (!check) {
      const message = acceptPdf
        ? "!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg, pdf"
        : "!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg";
      throw {
        message: message,
      };
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = acceptPdf ? file : await imageCompression(file, options);
    const formData = new FormData();
    formData.append("image", compressedFile);
    const response = await axiosInstance.post(imageUpload, formData, {
      headers: header,
    });

    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
