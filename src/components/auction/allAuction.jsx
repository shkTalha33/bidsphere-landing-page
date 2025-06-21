/* eslint-disable react-hooks/exhaustive-deps */
// Updated AllAuction.js with independent filtering for each tab
"use client";
import { Input, Tabs } from "antd";
import { useState, useMemo, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { getAllCategory, getAuctions, getSubcategory } from "../api/ApiFile";
import Breadcrumbs from "../common/Breadcrumbs";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import AuctionItems from "./auctionItems";
import { useTranslation } from "react-i18next";
import { FiFilter } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiFunction from "../api/apiFuntions";
import { useSelector } from "react-redux";
export default function AllAuction() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { get } = ApiFunction();
  const [allCategory, setAllCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const language = useSelector((state) => state.language?.language);

  // Independent filter states for each tab
  const [filters, setFilters] = useState({
    all: {
      categoryId: "",
      filterVersion: 0,
    },
    trending: {
      categoryId: "",
      filterVersion: 0,
    },
    popular: {
      categoryId: "",
      filterVersion: 0,
    },
  });

  // Independent pagination for each tab
  const [lastId, setLastId] = useState({
    all: 1,
    popular: 1,
    trending: 1,
  });

  useEffect(() => {
    handleAllCategory();
  }, []);

  // Define query parameters for all tabs with proper dependency tracking
  const allQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.all,
      params: filters.all.categoryId
        ? { subcategory: filters.all.categoryId }
        : {},
      filterVersion: filters.all.filterVersion,
    }),
    [lastId.all, filters.all]
  );

  const trendingQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.trending,
      params: {
        trending: true,
        ...(filters.trending.categoryId
          ? { subcategory: filters.trending.categoryId }
          : {}),
      },
      filterVersion: filters.trending.filterVersion,
    }),
    [lastId.trending, filters.trending]
  );

  const popularQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.popular,
      params: {
        popular: true,
        ...(filters.popular.categoryId
          ? { subcategory: filters.popular.categoryId }
          : {}),
      },
      filterVersion: filters.popular.filterVersion,
    }),
    [lastId.popular, filters.popular]
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

  const handleLoadMore = () => {
    setLastId((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 1,
    }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  // Get filter status for the current tab
  const isFiltered = useMemo(() => {
    return filters[activeTab].categoryId !== "";
  }, [filters, activeTab]);

  const items = [
    {
      key: "all",
      label: <div className="flex items-center">{t("allAuction.heading")}</div>,
      data: allResults.data,
      loading: allResults.isFetching,
    },
    {
      key: "trending",
      label: (
        <div className="flex items-center">{t("allAuction.heading2")}</div>
      ),
      data: trendingResults.data,
      loading: trendingResults.isFetching,
    },
    {
      key: "popular",
      label: (
        <div className="flex items-center">{t("allAuction.heading3")}</div>
      ),
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
        filtering={filtering}
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      subCategory: "",
    },
  });

  const selectedCategory = watch("category");

  // Set form values when opening modal based on current tab's filters
  const handleOpenFilter = () => {
    // If the current tab has filters, pre-populate the form
    const currentTabFilter = filters[activeTab];
    if (currentTabFilter.categoryId) {
      // Find the category and subcategory based on the stored subcategory ID
      // This would require an additional API call or lookup in your data
      // For now, just reset the form as we don't have the reverse lookup
      reset();
    } else {
      reset();
    }
    setShow(true);
  };

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
  }, [selectedCategory, setValue]);

  const onSubmit = (data) => {
    // Update only the current tab's filters
    setFilters((prev) => ({
      ...prev,
      [activeTab]: {
        categoryId: data.subCategory,
        filterVersion: prev[activeTab].filterVersion + 1,
      },
    }));
    setFiltering(true);

    setLastId((prev) => ({
      ...prev,
      [activeTab]: 1,
    }));

    handleClose();
  };

  // Function to clear filters for current tab only
  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      [activeTab]: {
        categoryId: "",
        filterVersion: prev[activeTab].filterVersion + 1,
      },
    }));

    setLastId((prev) => ({
      ...prev,
      [activeTab]: 1,
    }));

    reset();
    handleClose();
  };

  return (
    <>
      <Container
        dir={language === "ar" ? "rtl" : "ltr"}
        fluid="xxl"
        className="bg_white rounded-[9px] p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
      >
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("allAuction.pageTitle")} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {activeTab === "trending"
                ? t("allAuction.heading2")
                : activeTab === "popular"
                ? t("allAuction.heading3")
                : t("allAuction.heading")}
            </h3>
          </Col>
        </Row>
      </Container>

      <Container
        dir={language === "ar" ? "rtl" : "ltr"}
        fluid="xxl"
        className="bg_mainsecondary rounded-[9px] mt-4"
      >
        <Row>
          <Col md="12">
            <div className="w-full text-end">
              <div
                onClick={handleOpenFilter}
                className={`${language === "ar" ? "ml-auto" : "mr-auto"} mb-4 ${
                  isFiltered ? "bg_primary" : "bg-1"
                } w-[2.5rem] h-[2.5rem] rounded-full items-center justify-center flex sm:hidden cursor-pointer`}
              >
                <FiFilter className="text-white w-[1.5rem] h-[1.5rem]" />
              </div>
            </div>
          </Col>
          <Col md="12" className="!px-0">
            <div className="relative">
              <Tabs
                activeKey={activeTab}
                size="large"
                items={items}
                onChange={onChange}
              />
              <div
                onClick={handleOpenFilter}
                className={`${
                  language === "ar"
                    ? "absolute left-[15px]"
                    : "absolute right-[15px]"
                } top-[1.6rem]`}
              >
                <div
                  className={`${
                    isFiltered ? "bg_primary" : "bg-1"
                  } w-[2.5rem] h-[2.5rem] rounded-full items-center justify-center hidden sm:flex cursor-pointer`}
                >
                  <FiFilter className="text-white w-[1.5rem] h-[1.5rem]" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        centered
        backdrop="static"
        show={show}
        onHide={handleClose}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("allAuction.heading5")}{" "}
            {activeTab === "trending"
              ? t("allAuction.heading2")
              : activeTab === "popular"
              ? t("allAuction.heading3")
              : t("allAuction.heading")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="category"
                className={`poppins_regular ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("allAuction.heading6")}
              </label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={allCategory}
                    placeholder={t("allAuction.heading6")}
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
              <label
                htmlFor="subCategory"
                className={`poppins_regular ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("allAuction.heading7")}
              </label>

              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={subCategoryData}
                    placeholder={t("allAuction.heading7")}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                    value={subCategoryData.find(
                      (opt) => opt.value === field.value
                    )}
                    isDisabled={!selectedCategory}
                  />
                )}
              />

              {errors.subCategory && (
                <p className="text-red-500 text-[0.7rem]">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              {isFiltered && (
                <Button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 h-[3.5rem] !bg-gray-200 !hover:bg-gray-300 text-dark border-0"
                >
                  {t("allAuction.heading8")}
                </Button>
              )}
              <Button
                type="submit"
                className={`${
                  isFiltered ? "flex-1" : "w-full"
                } h-[3.5rem] bg_primary hover:bg-[#660000] border-0`}
              >
                {t("allAuction.heading9")}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
