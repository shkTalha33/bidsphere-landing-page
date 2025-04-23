/* eslint-disable no-throw-literal */

import imageCompression from "browser-image-compression";
import { isValidFileType } from "./isValidType";
import { axiosInstance } from "./axiosInstance";
import ApiFunction from "./apiFuntions";
import { imageUpload, filUploadAPi } from "./ApiFile";
// import { imageUpload } from "./ApiRoutesFile";

const header = {
  "Content-Type": "multipart/form-data",
  // "x-auth-token": token,
};

export const uploadFile = async (file) => {
  try {
    const validExtensions = ["jpg", "gif", "svg", "png", "jpeg", "pdf"];
    const check = isValidFileType(file, validExtensions);
    if (!check) {
      throw {
        message:
          "!Invalid file type. Please upload a valid image or PDF file. You can only select jpg, jpeg, png, svg, gif, pdf",
      };
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isPdf = fileExtension === "pdf";

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = isPdf ? file : await imageCompression(file, options);
    const formData = new FormData();
    formData.append(isPdf ? "video" : "image", compressedFile);

    const apiUrl = isPdf ? filUploadAPi : imageUpload;

    const response = await axiosInstance.post(apiUrl, formData, {
      headers: header,
    });

    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
