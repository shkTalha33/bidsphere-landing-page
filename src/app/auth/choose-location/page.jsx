"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";
import { Form } from "reactstrap";
import { message, Modal } from "antd";
import * as Yup from "yup";
import { TbCurrentLocation } from "react-icons/tb";
import { Search } from "react-feather";
import { FaLocationPin } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";

const Page = () => {
    const router = useRouter();
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState({
        lat: 51.5074,
        lng: -0.1278
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GoogleApiKey,
        libraries: ['places']
    });

    const schema = Yup.object().shape({
        location: Yup.string().required("Location is required"),
        latitude: Yup.number().required("Latitude is required"),
        longitude: Yup.number().required("Longitude is required"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            location: "",
            latitude: "",
            longitude: ""
        }
    });

    const handlePlaceSelect = (place) => {
        if (place.geometry) {
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            };
            setSelectedLocation(location);
            setMapCenter(location);
            setValue("location", location.address);
            setValue("latitude", location.lat);
            setValue("longitude", location.lng);
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedLocation({ lat, lng });
        setValue("latitude", lat);
        setValue("longitude", lng);

        // Get address from coordinates using Geocoding service
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                setValue("location", results[0].formatted_address);
                setSelectedLocation({
                    lat,
                    lng,
                    address: results[0].formatted_address
                });
            }
        });
    };

    const onSubmit = (data) => {
        console.log("Form data:", data);
        message.success('Signup Successful');
        router.push('/');
    };


    return (
        <AuthLayout>
            <>
                <AuthHeading
                    heading="Choose your Location"
                    subHeading="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                />

                <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="relative">
                        <Search className="absolute top-[14px] left-4 text_secondary2" size={20} />
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.GoogleApiKey}
                                    onPlaceSelected={handlePlaceSelect}
                                    className={`w-full h-12 ps-5 pe-4 border rounded-lg ${errors.location ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Search location"
                                    defaultValue={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                        {errors.location && (
                            <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMapModalOpen(true)}
                        className="w-full flex items-center text_primary justify-center px-4 py-3 gap-2 border-[1px] border-[#21CD9D] rounded-lg"
                    >
                        <TbCurrentLocation size={20} />
                        Set Location on Map
                    </button>

                    {selectedLocation && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-4">Current Location</h3>
                            <div className="h-[200px] w-full rounded-lg overflow-hidden">
                                {isLoaded && (
                                    <GoogleMap
                                        zoom={15}
                                        center={mapCenter}
                                        mapContainerClassName="w-full h-full"
                                    >
                                        {selectedLocation && (
                                            <Marker
                                                icon={{
                                                    url: "/assets/locationmarker.png",
                                                    scaledSize: new window.google.maps.Size(32, 37)
                                                }}
                                                position={{
                                                    lat: selectedLocation.lat,
                                                    lng: selectedLocation.lng
                                                }}
                                            />
                                        )}
                                    </GoogleMap>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition((position) => {
                                            const location = {
                                                lat: position.coords.latitude,
                                                lng: position.coords.longitude
                                            };
                                            setSelectedLocation(location);
                                            setMapCenter(location);
                                            setValue("latitude", location.lat);
                                            setValue("longitude", location.lng);
                                            const geocoder = new window.google.maps.Geocoder();
                                            geocoder.geocode({ location }, (results, status) => {
                                                if (status === "OK" && results[0]) {
                                                    setValue("location", results[0].formatted_address);
                                                }
                                            });
                                        });
                                    }
                                }}
                                className="w-full mt-4 px-4 py-3 bg_primary text-white rounded-lg"
                            >
                                Use Current Location
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg_primary text-white rounded-lg"
                    >
                        Continue
                    </button>
                </Form>

                <Modal
                    open={isMapModalOpen}
                    footer={false}
                    centered
                    onCancel={() => setIsMapModalOpen(!isMapModalOpen)}
                >
                    <div className="sm:max-w-[600px] pt-3">
                        <div className="h-[300px] w-full">
                            {isLoaded && (
                                <GoogleMap
                                    zoom={15}
                                    center={mapCenter}
                                    mapContainerClassName="w-full h-full"
                                    onClick={handleMapClick}
                                >
                                    {selectedLocation && (
                                        <Marker
                                            icon={{
                                                url: "/assets/locationmarker.png",
                                                scaledSize: new window.google.maps.Size(32, 37)
                                            }}
                                            position={{
                                                lat: selectedLocation.lat,
                                                lng: selectedLocation.lng
                                            }}
                                            draggable={true}
                                            onDragEnd={(e) => handleMapClick(e)}
                                        />
                                    )}
                                </GoogleMap>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsMapModalOpen(false)}
                                className="px-4 py-2 bg_primary text-white rounded-lg"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        </AuthLayout>
    );
};

export default Page;