/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import OrderDetails from "@/app/orders/detail/orderDetail";
import { GetOrders, orderGetbyid } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import ProductTable from "@/components/common/dataTables/productTable";
import TopSection from "@/components/common/TopSection";
import { getLanguage } from "@/components/redux/language/languageSlice";
import TabHeader from "@/components/tabHeader";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
/* eslint-disable @next/next/no-img-element */

const WonLots = () => {
  const { t } = useTranslation();
  const { get } = ApiFunction();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const urlId = urlParams.get("id");
  const [orderDetail, setOrderDetail] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const language = useSelector(getLanguage);

  // handle get all order
  const handleGetOrder = () => {
    setLoading(true);
    const api = `${GetOrders}/${lastId}?status=winner`;

    get(api)
      .then((res) => {
        if (res?.success && res?.applications?.length > 0) {
          setData(res?.applications);
          setCount(res?.count?.totalPage);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetOrder();
  }, [lastId, language]);

  // handle detail
  const handleDetail = (item) => {
    router.replace(`/profile/won-lots?id=${item?._id}`);
  };

  const columns = [
    {
      name: t("wonLots.columns.auctionName"),
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize gap-2">
          <img
            src={row?.auction?.images[0]}
            alt
            className="w-[2rem] h-[2rem] rounded-[6px]"
          />
          {row?.auction?.name || ""}
        </div>
      ),
    },
    {
      name: t("wonLots.columns.category"),
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.auction?.category?.name || ""}
        </div>
      ),
    },
    {
      name: t("wonLots.columns.startDate"),
      minWidth: "200px",
      maxWidth: "400px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {moment
            .utc(row?.auction?.start_date)
            .local()
            .format("DD MMMM, YYYY h:mm A")}
        </div>
      ),
    },
    {
      name: t("wonLots.columns.endDate"),
      minWidth: "200px",
      maxWidth: "400px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {moment
            .utc(row?.auction?.end_date)
            .local()
            .format("DD MMMM, YYYY h:mm A")}
        </div>
      ),
    },
    {
      name: t("wonLots.columns.status"),
      minWidth: "180px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`flex items-center justify-center capitalize fit-fit whitespace-nowrap rounded-[10px] cursor-pointer bg-[#EAF5F2] px-4 py-1 ${
            row?.status === "approved"
              ? "text-[#56CDAD] bg-[#EAF5F2]"
              : row.status === "pending"
              ? "text-[#4640DE] bg-[#E8E7F7]"
              : " bg-[#EAF5F2] text-[#6DC1FE]"
          } capitalize`}
        >
          {t(`wonLots.status.${row?.status}`) || row?.status}
        </div>
      ),
    },
    {
      name: t("wonLots.columns.action"),
      minWidth: "100px",
      maxWidth: "120px",
      cell: (row) => (
        <>
          <div
            className="text-center w-24 h-6 rounded-md flex items-center justify-center text-[10px] text_primary border-1 border-[#660000] poppins_medium capitalize cursor-pointer"
            onClick={() => {
              handleDetail(row);
            }}
          >
            {t("wonLots.actions.viewDetails")}
          </div>
        </>
      ),
    },
  ];

  // order get by id
  const handlegetOrderById = () => {
    setDetailLoading(true);
    const api = `${orderGetbyid}/${urlId}`;
    get(api)
      .then((res) => {
        if (res?.success) {
          setOrderDetail(res?.order);
        }
        setDetailLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDetailLoading(false);
      });
  };

  useEffect(() => {
    if (urlId) {
      handlegetOrderById();
    }
  }, [urlId, language]);

  // back to order list
  const backetoOrderList = () => {
    router.push("/orders");
    setOrderDetail("");
  };

  return (
    <main
      className="flex flex-col items-start"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="mx-auto p-2 p-md-4 flex flex-col lg:flex-row gap-3"
      >
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description={t("wonLots.description")}
            mt={"mt-0 md:mt-0"}
            title={t("wonLots.title")}
          />
          {urlId ? (
            <>
              <OrderDetails
                orderDetail={orderDetail}
                detailLoading={detailLoading}
                backrout={"/profile/won-lots"}
              />
            </>
          ) : (
            <>
              <div className="bg-white px-2 px-md-4 rounded-lg w-full shadow-sm">
                <ProductTable
                  rowHeading={t("wonLots.rowHeading")}
                  count={count}
                  loading={loading}
                  setCurrentPage={setPage}
                  currentPage={page}
                  columns={columns}
                  data={data}
                  setPageNumber={setPage}
                  type="search"
                  setLastId={setLastId}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
};

export default WonLots;
