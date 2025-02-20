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

const PersonalInfo = ({ setProgress }) => {
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      region: "",
    },
  });

  const onSubmit = (data) => {
    setProgress(parseInt(33));
    console.log(data);
    dispatch(
      setAuctionRegistrationData({
        personal: data,
      })
    );
  };

  return (
    <Container className="bg_white rounded-[9px] md:mt-2 p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Row className="g-4">
          <Col md="6">
            <Label className="poppins_medium" for="firstName">
              First Name
            </Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="firstName"
                  placeholder="Enter Here"
                  invalid={!!errors.firstName}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="poppins_medium" for="lastName">
              Last Name
            </Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Enter Here"
                  invalid={!!errors.lastName}
                />
              )}
            />
            {errors.lastName && (
              <FormFeedback>{errors.lastName.message}</FormFeedback>
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
            <Label className="poppins_medium" for="phoneNumber">
              Phone Number
            </Label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phoneNumber"
                  placeholder="Enter Here"
                  invalid={!!errors.phoneNumber}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
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
                  placeholder="Enter Here"
                  invalid={!!errors.country}
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  {/* Add more countries as needed */}
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
                  placeholder="Enter Here"
                  invalid={!!errors.region}
                >
                  <option value="">Select Region</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
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
            className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full sm:w-[50%] poppins_semibold text-base sm:text-[22px]"
          >
            Continue
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PersonalInfo;
