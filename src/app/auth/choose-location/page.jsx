"use client";
import { updateUser } from "@/components/api/ApiRoutesFile";
import ApiFunction from "@/components/api/apiFuntions";
import { GoogleApiKey } from "@/components/api/axiosInstance";
import { handleError } from "@/components/api/errorHandler";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { setLogin, setUserData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "react-feather";
import GooglePlacesAutocomplete from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";
import { TbCurrentLocation } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Form } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const router = useRouter();
  const { put } = ApiFunction();
  const [loading, setloading] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 51.5074,
    lng: -0.1278,
  });
  const [locationLoading, setLocationLoading] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GoogleApiKey,
    libraries: ["places"],
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
      longitude: "",
    },
  });

  useEffect(() => {
    // Request location permission as soon as the component mounts
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(location);
          setMapCenter(location);
          setValue("latitude", location.lat);
          setValue("longitude", location.lng);

          // Get address from coordinates using geocoding
          if (isLoaded && window.google) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location }, (results, status) => {
              if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                setValue("location", address);
                setSelectedLocation({
                  ...location,
                  address,
                });
              }
            });
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          message.error(
            "Could not get your location. Please allow location access."
          );
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
      setLocationLoading(false);
    }
  }, [isLoaded, setValue]);

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
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
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setValue("location", results[0].formatted_address);
        setSelectedLocation({
          lat,
          lng,
          address: results[0].formatted_address,
        });
      }
    });
  };

  const onSubmit = async (data) => {
    const formattedData = {
      location: {
        type: "Point",
        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
      },
      address: data.location,
    };
    setloading(true);
    try {
      const response = await put(updateUser, formattedData);
      if (response.success) {
        dispatch(setUserData(response?.user));
        dispatch(setLogin(true));
        message.success("You have successfully Logged in");
        router.push("/");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setloading(false);
    }
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
            <Search
              className="absolute top-[14px] left-4 text_secondary2"
              size={20}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <GooglePlacesAutocomplete
                  apiKey={process.env.GoogleApiKey}
                  onPlaceSelected={handlePlaceSelect}
                  className={`w-full h-12 ps-5 pe-4 border rounded-lg ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={
                    locationLoading
                      ? "Getting your location..."
                      : "Search location"
                  }
                  defaultValue={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">
                {errors.location.message}
              </p>
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

          {(selectedLocation || locationLoading) && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Current Location</h3>
              <div className="h-[200px] w-full rounded-lg overflow-hidden">
                {isLoaded ? (
                  locationLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <BeatLoader color="#21CD9D" size={10} />
                    </div>
                  ) : (
                    <GoogleMap
                      zoom={15}
                      center={mapCenter}
                      mapContainerClassName="w-full h-full"
                    >
                      {selectedLocation && (
                        <Marker
                          icon={{
                            url: "/assets/locationmarker.png",
                            scaledSize: new window.google.maps.Size(32, 37),
                          }}
                          position={{
                            lat: selectedLocation.lat,
                            lng: selectedLocation.lng,
                          }}
                        />
                      )}
                    </GoogleMap>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <BeatLoader color="#21CD9D" size={10} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocationLoading(true);
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const location = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
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
                          setLocationLoading(false);
                        });
                      },
                      (error) => {
                        console.error("Error getting location:", error);
                        message.error(
                          "Could not get your location. Please allow location access."
                        );
                        setLocationLoading(false);
                      }
                    );
                  }
                }}
                className="w-full mt-4 px-4 py-3 bg_primary text-white rounded-lg"
              >
                {locationLoading ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  "Use Current Location"
                )}
              </button>
            </div>
          )}
          <button
            disabled={loading || locationLoading}
            type="submit"
            className="btn1 primary w-100"
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Continue"}
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
                        scaledSize: new window.google.maps.Size(32, 37),
                      }}
                      position={{
                        lat: selectedLocation.lat,
                        lng: selectedLocation.lng,
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
