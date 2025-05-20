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
import { setAuctionRegistrationData } from "@/components/redux/auctionRegistration";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { decryptData, encryptData } from "@/components/api/encrypted";
import {
  selectProgress,
  selectRegisterData,
  setActiveStep,
  setRegisterData,
  setsliceProgress,
} from "@/components/redux/registrationSlice/resgiterSlice";

const DocumentUpload = ({ setIsCompleted, isCompleted }) => {
  const [selectedData, setSelectedData] = useState(null);
  const dispatch = useDispatch();
  const [fileLoadingIdentity, setFileLoadingIdentity] = useState(false);
  const [fileLoadingFunds, setFileLoadingFunds] = useState(false);
  const [selectedIdentityFiles, setSelectedIdentityFiles] = useState([]);
  const [selectedFundsFiles, setSelectedFundsFiles] = useState([]);
  const formData = useSelector(selectRegisterData);
  const progress = useSelector(selectProgress);
  // //

  const schema = Yup.object().shape({
    id_proof: Yup.array()
      .min(1, "At least one identity proof photo is required")
      .required("Identity proof photos are required"),
    funds_proof: Yup.array()
      .min(1, "At least one proof of funds photo is required")
      .required("Proof of funds photos are required"),
  });


  console.log(formData , "formData");
  
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id_proof: [],
      funds_proof: [],
    },
  });

  const id_proof = watch("id_proof");
  const funds_proof = watch("funds_proof");
  console.log(id_proof , "id_proof");
  console.log(funds_proof , "funds_proof");

  useEffect(() => {
    if (
      (formData && formData?.id_proof?.length > 0) ||
      formData?.funds_proof?.length > 0
    ) {
      setValue("id_proof", formData?.id_proof, {
        shouldValidate: true,
      });
      setValue("funds_proof", formData?.funds_proof, {
        shouldValidate: true,
      });
      setSelectedIdentityFiles(formData?.id_proof || []);
      setSelectedFundsFiles(formData?.funds_proof || []);
      // dispatch(setRegisterData(formData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if (selectedData) {
      if (selectedData?.id_proof?.length > 0) {
        setSelectedIdentityFiles(selectedData?.id_proof);
        setValue("id_proof", selectedData?.id_proof, {
          shouldValidate: true,
        });
      }
      if (selectedData?.funds_proof?.length > 0) {
        setSelectedFundsFiles(selectedData?.funds_proof);
        setValue("funds_proof", selectedData?.funds_proof, {
          shouldValidate: true,
        });
      }
      trigger(["id_proof", "funds_proof"]);
    }
  }, [selectedData, setValue, trigger]);

  function getFileDetails(filename) {
    let parts = filename.split(".");
    return {
      title: parts.slice(0, -1).join("."),
      type: parts.pop(),
    };
  }

  const handleFileChange = async (event, type) => {
    let files = Array.from(event.target.files);
    if (type === "identity") {
      const totalFiles = selectedIdentityFiles?.length + files.length;
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files");
      }
    }
    if (type === "funds") {
      const totalFiles = selectedFundsFiles.length + files.length;
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files");
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
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

    try {
      const uploadedUrls = [...currentFiles];
      let acceptPdf = true;
      setLoading(true);
      for (const file of files) {
        const { title, type } = getFileDetails(file?.name);
        const response = await uploadFile(file, acceptPdf);
        const imageData = {
          title,
          type,
          url: response.data.image || response.data.video,
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
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue(fieldName, updatedFiles, { shouldValidate: true });
  };

  const handleRemoveAll = (type) => {
    const isIdentity = type === "identity";
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

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
      <Label >{title}</Label>
      <p className="text-[#959595] text-[14px] poppins_regular">{subtitle}</p>
      <div
        className={`border-2 ${
          errors?.[type === "identity" ? "id_proof" : "funds_proof"]
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

        {errors?.[type === "identity" ? "id_proof" : "funds_proof"] && (
          <p className="text-red-500 mt-2">
            {errors[type === "identity" ? "id_proof" : "funds_proof"].message}
          </p>
        )}
      </div>
      <div className="mt-3 d-flex gap-2 flex-wrap">
        {files?.map((file, index) => (
          <div key={index} className="position-relative">
            <>
              <Link href={file?.url || "#"} target="_blank">
                {file?.type === "pdf" ? (
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
                    src={file?.url}
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

  // /////

  const onSubmit = (data) => {
    if (!isCompleted?.document) {
      if (progress === 33) {
        dispatch(setsliceProgress(33));
      }
      setIsCompleted((prev) => ({ ...prev, document: true }));
    }

    const mergedData = {
      ...formData,
      ...data,
    };
    // Encrypt and encode
    dispatch(setRegisterData(mergedData));
    dispatch(setActiveStep("security"));
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
            className="bg_primary text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
          >
            Next
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default DocumentUpload;
