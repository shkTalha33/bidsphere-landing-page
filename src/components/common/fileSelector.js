/* eslint-disable @next/next/no-img-element */
'use client'
import { FormFeedback, Input, Label } from "reactstrap";
import { Controller } from "react-hook-form";
import { axiosInstance2 } from "../api/axiosInstance";
import { handleError } from "../api/errorHandler";
import { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { isValidFileType } from "../api/isValidType";
import { message } from 'antd';
import imageCompression from "browser-image-compression";

const FormInputFile = ({ name, label, errors, clearErrors, directlyError, placeholder, setValue, isDoc = false }) => {
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [fileData, setFileData] = useState('');
    const [newFile, setNewFile] = useState(null);
    const imgFile = ['jpg', 'jpeg', 'png', 'svg']
    const imgDoc = ['docs', 'doc', 'pdf']
    const fileInputRef = useRef(null); // Reference for file input

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!isValidFileType(file, !isDoc ? imgFile : imgDoc)) {
            message.error(`Invalid file type, you can upload only ${!isDoc ? imgFile.join(', ') : imgDoc.join(', ')}`)
            return
        }
        setIsFileLoading(true)
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = isDoc ? file : await imageCompression(file, options);
        const formData = new FormData()
        formData.append('file', compressedFile)
        await axiosInstance2.post('uploads/file', formData)
            .then((result) => {
                if (result.data.success) {
                    const uploadedFileUrl = result.data.files[0]; // Adjust based on your API response
                    setFileData(uploadedFileUrl); // Set file data for preview
                    setValue(name, uploadedFileUrl); // Update React Hook Form's state
                    clearErrors(name)
                }
            }).catch((err) => {
                handleError(err)
            }).finally(() => (setIsFileLoading(false)))
    }
    return (
        <div className="col-span-6">
            <Label
                for={name}
                className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
                <div className="relative">
                    <button
                        type="button"
                        disabled={isFileLoading}
                        className="btn1 outline-primary border-0 py-1 px-5 mx-auto small-btn-2 rounded-1"
                        style={{ minHeight: 'auto' }}
                    >
                        {isFileLoading ? <Spinner size="sm" /> : 'Upload'}
                    </button>
                    <Input
                        // {...field}
                        id={name}
                        disabled={isFileLoading}
                        type="file"
                        style={{ position: 'absolute', inset: 0, opacity: 0 }}
                        placeholder={placeholder}
                        onChange={(e) => {
                            setNewFile(e)
                            handleUpload(e); // Handle the upload process
                        }}
                        invalid={!!errors[name]?.message || !!directlyError}
                    />
                </div>
                <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    {label}
                </span>
            </Label>
            {(directlyError || errors[name]?.message) && (<p className="text-xs text-danger">{directlyError || errors[name]?.message}</p>)}
            {fileData && <img src={fileData} alt="" className="h-24 w-24 object-cover rounded-3 mt-2" />}
        </div>

    );
};
export default FormInputFile