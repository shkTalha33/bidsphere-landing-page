"use client";
import { setAuctionRegistrationData } from "@/components/redux/auctionRegistration";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { allCountries  } from "country-region-data";
import { useState } from "react";

const PersonalInfo = ({
  setProgress,
  setIsCompleted,
  isCompleted,
  setActive,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [regions, setRegions] = useState([]);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
  });

  const handleCountryChange = (e, field) => {
    const country = e.target.value;
    field.onChange(country);
    setSelectedCountry(country);

    const countryData = allCountries .find(
      ([name, code]) => code === country
    );
    setRegions(countryData ? countryData[2]?.map(([region]) => region) : []);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      country: "",
      region: "",
    },
  });

  const onSubmit = (formData) => {
    if (!isCompleted?.personal) {
      setProgress((prev) => parseInt(prev) + 33.3);
      setIsCompleted((prev) => ({ ...prev, personal: true }));
    }
    dispatch(setAuctionRegistrationData(formData));
    setActive("document");
  };

  return (
    <Container className="bg_white rounded-[9px] md:mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Row className="g-4">
          <Col md="6">
            <Label className="poppins_medium" for="fname">
              First Name
            </Label>
            <Controller
              name="fname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="fname"
                  placeholder="Enter Here"
                  invalid={!!errors.fname}
                />
              )}
            />
            {errors.fname && (
              <FormFeedback>{errors.fname.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="poppins_medium" for="lname">
              Last Name
            </Label>
            <Controller
              name="lname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lname"
                  placeholder="Enter Here"
                  invalid={!!errors.lname}
                />
              )}
            />
            {errors.lname && (
              <FormFeedback>{errors.lname.message}</FormFeedback>
            )}
          </Col>

          <Col md="6">
            <Label className="poppins_medium" for="email">
              Email Address
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter Here"
                  invalid={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="poppins_medium" for="phone">
              Phone Number
            </Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  placeholder="Enter Here"
                  invalid={!!errors.phone}
                />
              )}
            />
            {errors.phone && (
              <FormFeedback>{errors.phone.message}</FormFeedback>
            )}
          </Col>

          <Col md="6">
            <Label className="poppins_medium" for="country">
              Country
            </Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="country"
                  type="select"
                  placeholder="Select Country"
                  invalid={!!errors.country}
                  onChange={(e) => handleCountryChange(e, field)}
                >
                  <option value="">Select Country</option>
                  {allCountries ?.map(([name, code]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.country && (
              <FormFeedback>{errors.country.message}</FormFeedback>
            )}
          </Col>

          <Col md="6">
            <Label className="poppins_medium" for="region">
              Region
            </Label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="region"
                  type="select"
                  placeholder="Select Region"
                  invalid={!!errors.region}
                  disabled={!selectedCountry}
                >
                  <option value="">Select Region</option>
                  {regions?.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.region && (
              <FormFeedback>{errors.region.message}</FormFeedback>
            )}
          </Col>
        </Row>

        <Col md="6" className="text-end ml-auto">
          <button
            type="submit"
             className="bg_primary text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
          >
            Next
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PersonalInfo;
