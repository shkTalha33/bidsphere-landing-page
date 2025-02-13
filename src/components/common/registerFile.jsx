"use client"

import Image from "next/image";
import { Controller } from "react-hook-form";
import { LuCloudUpload } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import { deliveryicon } from "../assets/icons/icon";

// TabButtons.js
export const TabButtons = ({ activeTab, setActiveTab, isLastTab, onSubmit }) => {
    return (
        <div className="flex justify-between mt-6">
            {activeTab !== "1" && (
                <button
                    type="button"
                    onClick={() => setActiveTab(String(Number(activeTab) - 1))}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Previous
                </button>
            )}
            <button
                type="submit"
                onClick={onSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-auto hover:bg-blue-600 transition-colors"
            >
                {isLastTab ? "Submit" : "Next"}
            </button>
        </div>
    );
};


export // RegistrationFee.js
    const RegistrationFee = () => {
        return (
            <div className="max-w-xl mx-auto bg-white shadow-sm border rounded-lg p-3">
                <h2 className="text-2xl popins_semibold text-center">Delivery with SetofShops</h2>
                <p className="text-center text-gray-600 mb-3">
                    Earn money by delivering orders to customers in your area
                </p>

                {/* Icons */}
                <div className="flex justify-center items-center gap-4 mb-3">
                    <Image src={deliveryicon} width={200} alt="Smartphone" className="w-[200px] h-auto" />
                    {/* <span className="text-2xl">+</span>
                    <Image src="/scooter-icon.png" width={64} height={64} alt="Scooter" className="w-16 h-16" /> */}
                </div>

                {/* Fee Box */}
                <div className="bg-[#FFF9E7] p-3 rounded-lg mb-8">
                    <div className="text-center">
                        <h3 className="text-xl popins_medium mb-2">Registration Fee</h3>
                        <p className="text-xl popins_semibold">5000 USh</p>
                        <p className="text-sm text-gray-600 mt-2">One-time payment</p>
                    </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                    <h3 className="popins_semibold mb-4">Key Benefits:</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#00A082] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flexible working hours - Choose when you want to work</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#00A082] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Weekly payments directly to your bank account</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#00A082] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Earn up to 50,000 USh per day</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#00A082] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to the Glovo Courier App</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#00A082] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>24/7 support team availability</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

// VehicleDetails.js
export const VehicleDetails = ({ control, errors }) => {
    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-3">
                <Label className="mb-2">Vehicle Type</Label>
                <Controller
                    name="vehicle.type"
                    control={control}
                    render={({ field }) => (
                        <Input type="select" {...field} className="rounded-lg">
                            <option value="">Select Vehicle Type</option>
                            <option value="Motorbike">Motorbike</option>
                            <option value="Car">Car</option>
                            <option value="Bicycle">Bicycle</option>
                        </Input>
                    )}
                />
                {errors.vehicle?.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.vehicle.type.message}</p>
                )}
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label className="mb-2">Registration Number</Label>
                <Controller
                    name="vehicle.registrationNumber"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} className="rounded-lg" />
                    )}
                />
                {errors.vehicle?.registrationNumber && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.vehicle.registrationNumber.message}
                    </p>
                )}
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label className="mb-2">Insurance Details</Label>
                <Controller
                    name="vehicle.insuranceDetails"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} className="rounded-lg" />
                    )}
                />
                {errors.vehicle?.insuranceDetails && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.vehicle.insuranceDetails.message}
                    </p>
                )}
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label className="mb-2">License Number</Label>
                <Controller
                    name="vehicle.licenseNumber"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} className="rounded-lg" />
                    )}
                />
                {errors.vehicle?.licenseNumber && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.vehicle.licenseNumber.message}
                    </p>
                )}
            </div>
        </div>
    );
};

// Preferences.js
export const Preferences = ({ control, errors }) => {
    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
                <Label className="mb-2">Working Hours</Label>
                <Controller
                    name="preferences.workingHours"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} className="rounded-lg" placeholder="e.g., 9 AM - 6 PM" />
                    )}
                />
                {errors.preferences?.workingHours && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.preferences.workingHours.message}
                    </p>
                )}
            </div>

            <div className="col-span-6">
                <Label className="mb-2">Delivery Areas</Label>
                <Controller
                    name="preferences.deliveryAreas"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="select"
                            {...field}
                            multiple
                            className="rounded-lg"
                        >
                            <option value="area1">Area 1</option>
                            <option value="area2">Area 2</option>
                            <option value="area3">Area 3</option>
                            <option value="area4">Area 4</option>
                        </Input>
                    )}
                />
                {errors.preferences?.deliveryAreas && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.preferences.deliveryAreas.message}
                    </p>
                )}
            </div>
        </div>
    );
};

// LegalInformation.js
export const LegalInformation = ({ control, errors, watch }) => {
    const isAutoEntrepreneur = watch("legal.isAutoEntrepreneur");

    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
                <Controller
                    name="legal.isAutoEntrepreneur"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center gap-2">
                            <Input
                                type="checkbox"
                                {...field}
                                checked={field.value}
                            />
                            <Label>Are you an Auto Entrepreneur?</Label>
                        </div>
                    )}
                />
            </div>

            {isAutoEntrepreneur && (
                <div className="col-span-6">
                    <Label className="mb-2">Auto Entrepreneur Number</Label>
                    <Controller
                        name="legal.autoEntrepreneurNumber"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} className="rounded-lg" />
                        )}
                    />
                    {errors.legal?.autoEntrepreneurNumber && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.legal.autoEntrepreneurNumber.message}
                        </p>
                    )}
                </div>
            )}

            <div className="col-span-6">
                <Label className="mb-2">Police Clearance Number</Label>
                <Controller
                    name="legal.policeClearance"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} className="rounded-lg" />
                    )}
                />
                {errors.legal?.policeClearance && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.legal.policeClearance.message}
                    </p>
                )}
            </div>
        </div>
    );
};

// Documents.js
export const Documents = ({ control, errors, watch, handleFileUpload, fileUploads }) => {
    const renderUploadField = (fieldName, label) => (
        <div className="col-span-6 sm:col-span-3">
            <Label className="mb-2">{label}</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, `documents.${fieldName}`)}
                    className="hidden"
                    id={fieldName}
                />
                <label htmlFor={fieldName} className="cursor-pointer">
                    {fileUploads[`documents.${fieldName}`] ? (
                        <ClipLoader size={24} />
                    ) : watch(`documents.${fieldName}`) ? (
                        <div className="flex items-center justify-center gap-2">
                            <LuCloudUpload size={24} className="text-green-500" />
                            <span>File Uploaded</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <LuCloudUpload size={24} />
                            <span>Upload {label}</span>
                        </div>
                    )}
                </label>
            </div>
            {errors.documents?.[fieldName] && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.documents[fieldName].message}
                </p>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-6 gap-4">
            {renderUploadField("profilePhoto", "Profile Photo")}
            {renderUploadField("nationalId", "National ID")}
            {renderUploadField("drivingLicense", "Driving License")}
            {renderUploadField("vehicleRegistration", "Vehicle Registration")}
            {renderUploadField("policeClearance", "Police Clearance")}
            {watch("legal.isAutoEntrepreneur") &&
                renderUploadField(
                    "autoEntrepreneurCertificate",
                    "Auto Entrepreneur Certificate"
                )}
        </div>
    );
};