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

export default function ForYou() {
  const currencies = useSelector((state) => state?.currency?.currencies);
  const { data, isLoading, error } = useGetAuctionsQuery({
    endpoint: `${getAuctions}/1`,
  });

  if (error) {
    return handleError(error);
  }

  return (
    <>
      <motion.main
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="pb-4 md:pb-[5rem]bg_white overflow-hidden"
      >
        <Container>
          <Row>
            <SectionHeadings
              title={"for you"}
              heading1={"ongoing"}
              heading2={"Auctions"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "
              }
            />
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonLayout2 index={index} />
                ))}
              </div>
            ) : (
              <Col md="12">
                <motion.div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                  {data?.auctions?.map((item, index) => {
                    return <AuctionCard item={item} index={index} />;
                  })}
                </motion.div>
              </Col>
            )}
          </Row>
        </Container>
      </motion.main>
    </>
  );
}
