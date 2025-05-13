/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input, Tabs } from "antd";
import { useState, useMemo } from "react";
import { Col, Container, Row } from "reactstrap";
import { getAllCategory, getAuctions, getSubcategory } from "../api/ApiFile";
import Breadcrumbs from "../common/Breadcrumbs";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import AuctionItems from "./auctionItems";
import { useTranslation } from "react-i18next";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiFunction from "../api/apiFuntions";
import { useEffect } from "react";

export default function AllAuction() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { get } = ApiFunction();
  const [allCategory, setAllCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [lastId, setLastId] = useState({
    all: 1,
    popular: 1,
    trending: 1,
  });

  useEffect(() => {
    handleAllCategory();
  }, []);
  // Define query parameters for all tabs

  const allQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.all,
      params: { subcategory: categoryId },
    }),
    [lastId.all]
  );

  const trendingQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.trending,
      params: { trending: true },
    }),
    [lastId.trending]
  );

  const popularQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.popular,
      params: { popular: true },
    }),
    [lastId.popular]
  );

  // Use separate queries for each tab to ensure data isolation
  const allResults = useGetAuctionsQuery(allQueryParams);
  const trendingResults = useGetAuctionsQuery(trendingQueryParams);
  const popularResults = useGetAuctionsQuery(popularQueryParams);

  // Select the correct query results based on active tab
  const getActiveTabResults = () => {
    switch (activeTab) {
      case "trending":
        return trendingResults;
      case "popular":
        return popularResults;
      default:
        return allResults;
    }
  };

  const { data, isFetching } = getActiveTabResults();

  const handleLoadMore = () => {
    setLastId((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 1,
    }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "all",
      label: t("allAuction.heading"),
      data: allResults.data,
      loading: allResults.isFetching,
    },
    {
      key: "trending",
      label: t("allAuction.heading2"),
      data: trendingResults.data,
      loading: trendingResults.isFetching,
    },
    {
      key: "popular",
      label: t("allAuction.heading3"),
      data: popularResults.data,
      loading: popularResults.isFetching,
    },
  ].map((tab) => ({
    key: tab.key,
    label: tab.label,
    children: (
      <AuctionItems
        items={tab.data?.auctions || []}
        loading={tab.loading}
        count={tab.data?.count?.totalPage || 0}
        lastId={lastId[tab.key]}
        handleLoadMore={handleLoadMore}
      />
    ),
  }));

  // filter section start

  const schema = yup.object().shape({
    category: yup.string().required("Please select a category"),
    subCategory: yup.string().required("Please select Sub category"),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      subCategory: "",
    },
  });

  const selectedCategory = watch("category");
  const handleClose = () => {
    reset();
    setShow(false);
  };

  // handle all category get
  const handleAllCategory = () => {
    const api = getAllCategory;
    get(api)
      .then((res) => {
        if (res?.success && res?.categories?.length > 0) {
          const formattedOptions = res?.categories?.map((category) => ({
            value: category?._id,
            label: category?.name,
          }));
          setAllCategory(formattedOptions);
        } else {
          setAllCategory([{ label: "No category", value: "" }]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle subcategory based on category
  const handleSubcategory = () => {
    const api = `${getSubcategory}/?category=${selectedCategory}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.subCategories?.length > 0) {
          const formattedOptions = res?.subCategories?.map((category) => ({
            value: category?._id,
            label: category?.title,
          }));
          setSubCategoryData(formattedOptions);
        } else {
          setSubCategoryData([{ label: "No SubCategory", value: "" }]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedCategory) {
      handleSubcategory();
      setSubCategoryData([]);
      setValue("subCategory", "");
    }
  }, [selectedCategory]);

  const onSubmit = (data) => {
    setCategoryId(data?.subCategory);
    handleClose();
  };

  return (
    <>
      <Container className="bg_white rounded-[9px]  p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle="Auctions" />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("allAuction.heading")}
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className="bg_mainsecondary rounded-[9px] mt-4">
        <Row>
          <Col md="12" className="!px-0">
            {/* <div className="">
              elo jsdh
            </div> */}
            <div className="relative">
              <Tabs
                activeKey={activeTab}
                size="large"
                items={items}
                onChange={onChange}
              />
              <div
                onClick={handleShow}
                className="absolute right-[15px] top-[1.6rem]"
              >
                <div className="bg-1 w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center cursor-pointer">
                  <FiFilter className="text-white w-[1.5rem] h-[1.5rem]" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal centered backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="category" className="poppins_regular">
                Select Category
              </label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={allCategory}
                    placeholder="Select Category"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                    value={allCategory.find((opt) => opt.value === field.value)}
                  />
                )}
              />

              {errors.category && (
                <p className="text-red-500 text-[0.7rem]">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="subCategory" className="poppins_regular">
                Select Sub Category
              </label>

              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={subCategoryData}
                    placeholder="Select Sub Category"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                    value={subCategoryData.find(
                      (opt) => opt.value === field.value
                    )}
                  />
                )}
              />

              {errors.subCategory && (
                <p className="text-red-500 text-[0.7rem]">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-[3.5rem] mt-6 bg_primary border-0"
            >
              OK
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
