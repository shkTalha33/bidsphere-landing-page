/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-autocomplete";
import { Button, message, Spin } from "antd";
import { TbCurrentLocation } from "react-icons/tb";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { BeatLoader } from "react-spinners";
import { Search } from "react-feather";
import { updateUser } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import { useDispatch } from "react-redux";
import { setLogin, setUserData } from "@/components/redux/loginForm";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Page = () => {
  const { put , GoogleApiKey} = ApiFunction();
  // const GoogleApiKey = "AIzaSyAF2ezYqZ_inMBvqDXYzHHi8cgDOEatnfA";

  const [sbLoading, setSbLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GoogleApiKey,
    libraries,
  });

  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        await fetchAddressFromLatLng(lat, lng);
      },
      () => message.error("Unable to fetch location"),
      { enableHighAccuracy: true }
    );
  }, []);

  const fetchAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleApiKey}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        message.error("Address not found!");
      }
    } catch (error) {
      message.error("Error fetching address!");
    }
  };

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setAddress(place.formatted_address);
    }
  };

  const handleMarkerDrag = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocation({ lat, lng });
    await fetchAddressFromLatLng(lat, lng);
  };

  const handleCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        await fetchAddressFromLatLng(lat, lng);
        setLoading(false);
      },
      () => {
        message.error("Unable to fetch location");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = () => {
    setSbLoading(true);
    const formattedData = {
      location: {
        type: "Point",
        coordinates: [parseFloat(location.lng), parseFloat(location.lat)],
      },
      address: address,
    };
    put(updateUser, formattedData)
      .then((res) => {
        if (res?.success) {
          dispatch(setUserData(res?.user));
          dispatch(setLogin(true));
          message.success(res?.message);
          router.push("/");
        }
        setSbLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setSbLoading(false);
      });
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <AuthLayout>
      <AuthHeading
        heading="Choose your Location"
        subHeading="Search or select your location on the map."
      />
      <section className="mt-4">
        <div className="relative">
          <Search
            className="absolute top-[10px] left-2 text_se*condary2"
            size={20}
          />
          <GooglePlacesAutocomplete
            apiKey={GoogleApiKey}
            onPlaceSelected={handlePlaceSelect}
            defaultValue={address}
            options={{ types: ["address"] }}
            className="w-full p-2 border rounded !pl-[2.2rem]"
          />
        </div>
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={15}
            place=""
          >
            <Marker
              position={location}
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
          </GoogleMap>
        </div>
        <div className="mt-4 flex flex-col pb-4 gap-2">
          <button
            icon={<TbCurrentLocation />}
            onClick={handleCurrentLocation}
            disabled={loading}
            className="flex-1 flex items-center justify-center px-4 py-3 gap-2 border-[1px] border-[#660000] text_primary rounded-lg"
          >
            <TbCurrentLocation size={20} />
            {loading ? <Spin size="small" /> : "Current Location"}
          </button>
          <button
            disabled={loading}
            type="default"
            onClick={handleSubmit}
            className="btn1 bg_primary text-white w-100"
          >
            {loading || sbLoading ? (
              <BeatLoader color="#fff" size={10} />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Page;
