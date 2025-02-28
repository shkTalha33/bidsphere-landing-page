/* eslint-disable @next/next/no-img-element */
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Form, Label, Row, Spinner } from "reactstrap";
import * as Yup from "yup";

import { handleError } from "@/components/api/errorHandler";
import { uploadFile } from "@/components/api/uploadFile";
import { pdfIcon, uploadfileIcon } from "@/components/assets/icons/icon";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const DocumentUpload = ({ setProgress, data, setData }) => {
  const [selectedData, setSelectedData] = useState(null);

  const [fileLoadingIdentity, setFileLoadingIdentity] = useState(false);
  const [fileLoadingFunds, setFileLoadingFunds] = useState(false);
  const [selectedIdentityFiles, setSelectedIdentityFiles] = useState([]);
  const [selectedFundsFiles, setSelectedFundsFiles] = useState([]);

  const schema = Yup.object().shape({
    identityPhotos: Yup.array()
      .min(1, "At least one identity proof photo is required")
      .required("Identity proof photos are required"),
    fundsPhotos: Yup.array()
      .min(1, "At least one proof of funds photo is required")
      .required("Proof of funds photos are required"),
  });

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      identityPhotos: [],
      fundsPhotos: [],
    },
  });

  useEffect(() => {
    if (selectedData) {
      if (selectedData?.identityPhotos?.length > 0) {
        setSelectedIdentityFiles(selectedData.identityPhotos);
        setValue("identityPhotos", selectedData.identityPhotos, {
          shouldValidate: true,
        });
      }
      if (selectedData?.fundsPhotos?.length > 0) {
        setSelectedFundsFiles(selectedData.fundsPhotos);
        setValue("fundsPhotos", selectedData.fundsPhotos, {
          shouldValidate: true,
        });
      }
      trigger(["identityPhotos", "fundsPhotos"]);
    }
  }, [selectedData, setValue, trigger]);

  function getFileDetails(filename) {
    let parts = filename.split(".");
    return {
      name: parts.slice(0, -1).join("."),
      extension: parts.pop(),
    };
  }

  const handleFileChange = async (event, type) => {
    console.log("selectedFundsFiles.length", selectedFundsFiles.length)
    console.log("selectedIdentityFiles.length", selectedIdentityFiles.length)
    // if ((selectedIdentityFiles.length || selectedFundsFiles.length) >= 5) {
    //   toast.error("You cannot upload more than 5 files")
    //   return
    // }
    let files = Array.from(event.target.files);
    if (type === "identity") {
      const totalFiles = selectedIdentityFiles.length + files.length
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files")
      }
    }
    if (type === "funds") {
      const totalFiles = selectedFundsFiles.length + files.length
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files")
      }
    }
    if (files.length === 0) return;
    const isIdentity = type === "identity";
    const setLoading = isIdentity
      ? setFileLoadingIdentity
      : setFileLoadingFunds;
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const currentFiles = isIdentity
      ? selectedIdentityFiles
      : selectedFundsFiles;
    const fieldName = isIdentity ? "identityPhotos" : "fundsPhotos";

    
    try {
      const uploadedUrls = [...currentFiles];
      let acceptPdf = true;
      setLoading(true);
      for (const file of files) {
        const { name, extension } = getFileDetails(file?.name);
        const response = await uploadFile(file, acceptPdf);
        const imageData = {
          name,
          extension,
          image: response.data.image,
        };
        uploadedUrls.push(imageData);
      }

      setFiles(uploadedUrls);
      setValue(fieldName, uploadedUrls, { shouldValidate: true });
      await trigger(fieldName);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleFileRemove = (index, type) => {
    const isIdentity = type === "identity";
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const currentFiles = isIdentity
      ? selectedIdentityFiles
      : selectedFundsFiles;
    const fieldName = isIdentity ? "identityPhotos" : "fundsPhotos";

    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue(fieldName, updatedFiles, { shouldValidate: true });
  };

  const handleRemoveAll = (type) => {
    const isIdentity = type === "identity";
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const fieldName = isIdentity ? "identityPhotos" : "fundsPhotos";

    setFiles([]);
    setValue(fieldName, [], { shouldValidate: true });
  };

  // File upload section component
  const FileUploadSection = ({
    type,
    title,
    subtitle,
    files,
    loading,
    errors,
  }) => (
    <Col md="6">
      <Label className="">{title}</Label>
      <p className="text-[#959595] text-[14px] poppins_regular">{subtitle}</p>
      <div
        className={`border-2 ${
          errors?.[type === "identity" ? "identityPhotos" : "fundsPhotos"]
            ? "border-red-500"
            : "border-dashed"
        } rounded-lg p-4 text-center`}
      >
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, type)}
          accept="image/*,.pdf"
          className="hidden"
          id={`fileUpload_${type}`}
        />
        <label htmlFor={`fileUpload_${type}`} className="cursor-pointer">
          <Image
            src={uploadfileIcon}
            alt="uploadfileIcon"
            width={80}
            height={80}
            className="mx-auto my-2 md:my-4 w-20 sm:w-24 md:w-32"
          />
          <p className="mb-2 text_darkprimary inter_bold text-base sm:text-lg md:text-xl">
            Select Files
          </p>
          <p className="mb-2 text-xs sm:text-sm md:text-base text-[#637381]">
            Drop files here or click{" "}
            <span className="text-[#24292E]">browse</span> through your machine
          </p>
        </label>

        {errors?.[type === "identity" ? "identityPhotos" : "fundsPhotos"] && (
          <p className="text-red-500 mt-2">
            {
              errors[type === "identity" ? "identityPhotos" : "fundsPhotos"]
                .message
            }
          </p>
        )}
      </div>
      <div className="mt-3 d-flex gap-2 flex-wrap">
        {files.map((file, index) => (
          <div key={index} className="position-relative">
            <>
              <Link href={file?.image} target="_blank">
                {file?.extension === "pdf" ? (
                  <Image
                    src={pdfIcon}
                    key={index}
                    width={96}
                    height={96}
                    alt={`Upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <Image
                    src={file?.image}
                    key={index}
                    width={96}
                    height={96}
                    alt={`Upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </Link>
              <button
                type="button"
                onClick={() => handleFileRemove(index, type)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6"
              >
                ×
              </button>
            </>
          </div>
        ))}
        {loading && (
          <div className="w-24 h-24 border border-gray-200 flex justify-center items-center rounded">
            <Spinner size="sm" color="red" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleRemoveAll(type)}
        className="border border-gray-200 text_primary px-3 ml-auto py-[10px] text-[15px] rounded-xl flex gap-2 items-center inter_semibold mt-3"
      >
        Remove All
      </button>
    </Col>
  );

  const onSubmit = async (data) => {
    setData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <Container className="bg_white rounded-[9px] mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-2 w-100"
      >
        <Row className="mb-[30px]">
          <FileUploadSection
            type="identity"
            title="Upload Identity Proof"
            subtitle="(Passport, Driver's License)"
            files={selectedIdentityFiles}
            loading={fileLoadingIdentity}
            errors={errors}
          />
          <FileUploadSection
            type="funds"
            title="Upload Proof of Funds"
            subtitle="(Bank Statement, Income Proof)"
            files={selectedFundsFiles}
            loading={fileLoadingFunds}
            errors={errors}
          />
        </Row>
        <Col md="6" className="text-end ml-auto">
          <button
            type="submit"
            disabled={fileLoadingFunds || fileLoadingIdentity}
            className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full sm:w-[50%] poppins_semibold text-base sm:text-[22px]"
          >
            Next
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default DocumentUpload;
