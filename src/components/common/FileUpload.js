import React from "react";
import { Controller } from "react-hook-form";
import { Input, FormFeedback } from "reactstrap";
import { RiImage2Line } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import Image from "next/image";

const FileUpload = ({
  control,
  name,
  imageUrl,
  setImageUrl,
  fileLoading,
  handleFileChange,
  label,
  error,
  type = "image",
  isMultiple = false
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="file-upload w-full mb-3">
          <label
            htmlFor={`${name}Input`}
            style={{ cursor: "pointer", display: "flex" }}
            className="file-upload-label"
          >
            <div className="file-upload-preview rounded-lg w-full text_black relative flex gap-3 justify-start items-center">
              {fileLoading ? (
                <div className="file-upload-loading w-full h-[150px] border rounded-lg bg_light text_primary d-flex justify-content-center align-items-center">
                  <HashLoader size={24} color="#1857d2" />
                </div>
              ) : (
                <>
                  <div className="file-upload-image bg-[#F8F8FD] w-full h-[150px] text-sm rounded-lg flex justify-center items-center border border-dashed">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        className={` rounded-lg`}
                        style={{
                          objectFit: type === 'image' ? "cover" : 'contain',
                          height: "150px",
                          width: "100%"
                        }}
                      />
                    ) : (
                      <div className="file-upload-placeholder flex flex-col text-center m-2 justify-center items-center">
                        <RiImage2Line size={"20px"} />
                        <span className="text-xs poppins_regular my-2">
                          Click to replace <span className="text-[#7C8493]"> or drag and drop</span>
                        </span>
                        <span className="text-xs text-[#7C8493]">
                          {type === "image" ? "SVG, PNG, JPG or GIF (max. 400 x 400px)" : "PDF, DOC, DOCX, TXT(max. 400 x 400px)"}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </label>
          <Input
            type="file"
            draggable={true}
            name={name}
            id={`${name}Input`}
            multiple={isMultiple}
            accept={type === "image" ? "image/*" : ".pdf,.doc,.docx,.txt"}
            className={`visually-hidden ${error ? "is-invalid" : ""}`}
            onChange={(event) => {
              handleFileChange(event, setImageUrl);
              onChange(event.target.files);
            }}
          />
          {error && <FormFeedback style={{ display: "block" }}>{error.message}</FormFeedback>}
        </div>
      )}
    />
  );
};

export default FileUpload;
