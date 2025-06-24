/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  selectProgress,
  selectRegisterData,
  setActiveStep,
  setRegisterData,
  setsliceProgress,
} from "@/components/redux/registrationSlice/resgiterSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { allCountries } from "country-region-data";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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

const PersonalInfo = ({ setIsCompleted, isCompleted }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [regions, setRegions] = useState([]);
  const dispatch = useDispatch();
  const formData = useSelector(selectRegisterData);
  const progress = useSelector(selectProgress);
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    fname: Yup.string().required(t("profil.heading13")),
    lname: Yup.string().required(t("profil.heading14")),
    email: Yup.string().required(t("auctionRegistration.heading9")),
    phone: Yup.string().required(t("auctionRegistration.heading10")),
    country: Yup.string().required(t("auctionRegistration.heading11")),
    region: Yup.string().required(t("auctionRegistration.heading12")),
  });

  const handleCountryChange = (e, field) => {
    const countryName = e.target.value;
    field.onChange(countryName);
    setSelectedCountry(countryName);

    const countryData = allCountries.find(([name]) => name === countryName);
    setRegions(countryData ? countryData[2]?.map(([region]) => region) : []);
  };

  const {
    handleSubmit,
    control,
    setValue,
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

  useEffect(() => {
    if (formData) {
      setValue("fname", formData?.fname);
      setValue("lname", formData?.lname);
      setValue("email", formData?.email);
      setValue("phone", formData?.phone);
      setValue("country", formData?.country);
      setValue("region", formData?.region);
      setSelectedCountry(formData?.country);
    }
  }, [formData, setValue]);

  const onSubmit = (formData) => {
    if (!isCompleted?.personal) {
      if (progress === 0) {
        dispatch(setsliceProgress(33));
      }
      setIsCompleted((prev) => ({ ...prev, personal: true }));
    }

    dispatch(setRegisterData(formData));
    dispatch(setActiveStep("document"));
    // dispatch(clearRegisterData())

    // setActive("document");
  };

  return (
    <Container
      className={`bg_white rounded-[9px] md:mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form`}
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Row className="g-4">
          <Col md="6">
            <Label className="poppins_medium" for="fname">
              {t("auctionRegistration.heading12")}
            </Label>
            <Controller
              name="fname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="fname"
                  placeholder={t("auctionRegistration.heading12")}
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
              {t("auctionRegistration.heading13")}
            </Label>
            <Controller
              name="lname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lname"
                  placeholder={t("auctionRegistration.heading13")}
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
              {t("auctionRegistration.heading14")}
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder={t("auctionRegistration.heading14")}
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
              {t("auctionRegistration.heading15")}
            </Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  placeholder={t("auctionRegistration.heading15")}
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
              {t("auctionRegistration.heading16")}
            </Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="country"
                  type="select"
                  placeholder={t("auctionRegistration.heading16")}
                  invalid={!!errors.country}
                  onChange={(e) => handleCountryChange(e, field)}
                >
                  <option value="">Select Country</option>
                  {allCountries?.map(([name]) => (
                    <option key={name} value={name}>
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
              {t("auctionRegistration.heading17")}
            </Label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="region"
                  type="select"
                  placeholder={t("auctionRegistration.heading17")}
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

        <Col md="6" className={"text-end ml-auto"}>
          <button
            type="submit"
            className="bg_primary text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
          >
            {t("auctionRegistration.heading18")}
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PersonalInfo;
