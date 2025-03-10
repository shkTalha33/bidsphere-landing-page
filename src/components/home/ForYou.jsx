/* eslint-disable react/jsx-key */
import debounce from "debounce";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import { getAuctions } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import AuctionCard from "../common/AuctionCard";
import SectionHeadings from "../common/sectionHeadings";
import SkeletonLayout2 from "../common/SkeletonLayout2";
import { setAuctionProduct } from "../redux/auctionProduct";
import { useDispatch, useSelector } from "react-redux";

export default function ForYou() {
  const { get } = ApiFunction();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state?.auctionProduct?.auctionProductData
  );

  const fetchAuctions = debounce(async () => {
    await get(`${getAuctions}1`)
      .then((result) => {
        if (result?.success) {
          dispatch(setAuctionProduct(result?.auctions));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    if (data.length === 0) {
      fetchAuctions();
    } else {
      setLoading(false);
    }
  }, [data]);

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
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonLayout2 index={index} />
                ))}
              </div>
            ) : (
              <Col md="12">
                <motion.div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                  {data?.map((item, index) => {
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
