/* eslint-disable react/jsx-key */
import { motion } from "framer-motion";
import { Col, Container, Row } from "reactstrap";
import { getAuctions } from "../api/ApiFile";
import { handleError } from "../api/errorHandler";
import AuctionCard from "../common/AuctionCard";
import SectionHeadings from "../common/sectionHeadings";
import SkeletonLayout2 from "../common/SkeletonLayout2";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { StaticImage } from "../assets/icons/icon";

export default function ForYou() {
  const currencies = useSelector((state) => state?.currency?.currencies);
  const { data, isLoading, error } = useGetAuctionsQuery({
    endpoint: `${getAuctions}/1`,
  });
  const { t } = useTranslation();

  if (error) {
    return handleError(error);
  }



  return (
    <>
      <motion.main
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="pb-4 md:pb-[4rem] bg_white overflow-hidden"
      >
        <Container>
          <Row>
            <SectionHeadings
              title={t("ongoing.foryou")}
              heading1={t("ongoing.ongoing")}
              heading2={t("nav.auction")}
              description={t("ongoing.heading")}
            />
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonLayout2 key={index} index={index} />
                ))}
              </div>
            ) : data?.auctions?.length === 0 ? (
              <Col md="12">
                <div className="flex justify-center items-center h-[15rem] w-full">
                  <div className="text-center flex justify-center items-center flex-col gap-2">
                    <Image
                      className="w-[5rem] h-[5rem]"
                      src={StaticImage}
                      alt="No Auction Events"
                    />

                    <h1 className="text-2xl font-bold mb-0">
                      {t("ongoing.heading2")}
                    </h1>
                    <p className="mb-0"> {t("ongoing.heading3")}</p>
                  </div>
                </div>
              </Col>
            ) : (
              <Col md="12">
                <motion.div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                  {data?.auctions?.map((item, index) => (
                    <AuctionCard key={index} item={item} index={index} />
                  ))}
                </motion.div>
              </Col>
            )}
          </Row>
        </Container>
      </motion.main>
    </>
  );
}
