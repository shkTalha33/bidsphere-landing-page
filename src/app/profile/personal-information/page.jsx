"use client";

import TabHeader from "@/components/tabHeader";
import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { Check, Edit2, X } from "react-feather";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/avatar.png");
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    fullName: "Jerome Bell",
    dateOfBirth: "1995-03-23",
    phoneNumber: "123456789",
    email: "Jeromebell@gmail.com",
  });

  const [formValues, setFormValues] = useState({ ...profileData });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formValues.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number (9-15 digits)";
    }
    if (!formValues.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setProfileData(formValues);
      setIsEditing(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      setFormErrors(validationErrors);
    }
  };

  const cancelEdit = () => {
    setFormValues({ ...profileData });
    setFormErrors({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (e) {
      return dateString;
    }
  };

  // Calculate age
  const calculateAge = (dateString) => {
    try {
      const birthDate = new Date(dateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return `(${age} y.o)`;
    } catch (e) {
      return "";
    }
  };

  return (
    <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <div className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-sm">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl poppins_semibold">
                Personal information
              </h1>
              <p className="text-gray-600">You can do management here.</p>
            </div>
            <button
              onClick={() => (isEditing ? cancelEdit() : setIsEditing(true))}
              className="ml-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-2 flex items-center justify-center"
              aria-label={isEditing ? "Cancel editing" : "Edit profile"}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="bg-white p-8 rounded-lg w-full shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-col md:flex-row items-start w-full">
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl poppins_semibold mb-2">
                    Profile Photo
                  </h2>
                  <p className="text-gray-700 poppins_medium">
                    This image will be shown publicly as your profile picture.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center gap-6 mt-6 md:mt-0">
                  <div className="min-w-24">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                      <Image
                        src={profileImage}
                        width={96}
                        height={96}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleImageClick}
                    className="w-full h-32 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div className="text-green-500 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <p className="text-green-500 font-medium">
                      Click to replace
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      or drag and drop
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {/* {showSuccessMessage && (
                            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
                                <Check size={18} className="mr-2" />
                                Profile updated successfully!
                            </div>
                        )} */}

            <div className="border-t pt-8 w-full mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <h2 className="text-2xl poppins_semibold mb-2">
                      Personal information
                    </h2>
                    <p className="text-gray-700 poppins_medium">
                      This info will be shown publicly as your personal
                      information.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-700 poppins_medium">
                        Full Name
                      </h3>
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded mt-1 ${
                              formErrors.fullName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.fullName && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 poppins_regular">
                          {profileData.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 poppins_medium">
                        Date of Birth
                      </h3>
                      {isEditing ? (
                        <div>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formValues.dateOfBirth}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded mt-1 ${
                              formErrors.dateOfBirth
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.dateOfBirth && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.dateOfBirth}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 poppins_regular">
                          {formatDate(profileData.dateOfBirth)}{" "}
                          {calculateAge(profileData.dateOfBirth)}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 poppins_medium">
                        Phone Number
                      </h3>
                      {isEditing ? (
                        <div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded mt-1 ${
                              formErrors.phoneNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.phoneNumber}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 poppins_regular">
                          {profileData.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 poppins_medium">
                        Email
                      </h3>
                      {isEditing ? (
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded mt-1 ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 poppins_regular">
                          {profileData.email}
                        </p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="bg-emerald-500 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-emerald-600 transition-colors"
                        >
                          <Check size={18} />
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
