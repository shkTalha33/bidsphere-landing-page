"use client";
import { updateUser } from "@/components/api/ApiRoutesFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { setLogin, setUserData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { message } from "antd";
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
  const GoogleApiKey = "AIzaSyAF2ezYqZ_inMBvqDXYzHHi8cgDOEatnfA";
  const router = useRouter();
  const { put } = ApiFunction();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 51.5074,
    lng: -0.1278,
  });

  const [locationLoading, setLocationLoading] = useState(true);
  const [mapExpanded, setMapExpanded] = useState(false);

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
        // Show success message when location is updated
        message.success("Location updated successfully");
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

  const toggleMapSize = () => {
    setMapExpanded(!mapExpanded);
  };

  const getCurrentLocation = () => {
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
              setSelectedLocation({
                ...location,
                address: results[0].formatted_address,
              });
              message.success("Current location updated");
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
  };

  return (
    <AuthLayout>
      <>
        <AuthHeading
          heading="Choose your Location"
          subHeading="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />

        <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 mb-4">
          <div className="relative">
            <Search
              className="absolute top-[14px] left-4 text_se*condary2"
              size={20}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <GooglePlacesAutocomplete
                  apiKey={GoogleApiKey}
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

          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Select Location on Map</h3>
              <button
                type="button"
                onClick={toggleMapSize}
                className="text-sm text_primary"
              >
                {mapExpanded ? "Collapse Map" : "Expand Map"}
              </button>
            </div>
            <div
              className={`${
                mapExpanded ? "h-[400px]" : "h-[250px]"
              } w-full rounded-lg overflow-hidden mb-4`}
            >
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
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <BeatLoader color="#21CD9D" size={10} />
                </div>
              )}
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="flex-1 flex items-center justify-center px-4 py-3 gap-2 border-[1px] border-[#21CD9D] text_primary rounded-lg"
              >
                <TbCurrentLocation size={20} />
                {locationLoading ? (
                  <BeatLoader color="#21CD9D" size={8} />
                ) : (
                  "Use Current Location"
                )}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              disabled={loading || locationLoading}
              type="submit"
              className="btn1 primary w-100"
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Continue"}
            </button>
          </div>
        </Form>
      </>
    </AuthLayout>
  );
};

export default Page;
