/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "reactstrap";
import {
  appleStore,
  appstore,
  AppStoreIcon,
  downloadApp,
  googlePlay,
  phones,
  playstore,
  PlayStoreIcon,
} from "../assets/icons/icon";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";

export default function DownloadSection() {
  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pt-[1.81rem] pb-4 md:pb-[3.81rem] bg-[#F3F3F9] overflow-hidden"
    >
      <Container>
        <Row>
          <Col md="6">
            <motion.div
              className=""
              variants={slideIn("up", "tween", 0.3, 0.8)}
            >
              <Row className="items-center justify-center h-full">
                <Col md="9" className="mx-auto">
                  <div className="flex gap-3 justify-center md:justify-start items-center  mb-[10px]">
                    <div className="w-8 h-2 bg_primary rounded-full"></div>
                    <h6 className="text-[#202020] poppins_semibold text-center text-xl capitalize">
                      enjoy our application
                    </h6>
                  </div>
                  <div className="my-3 md:my-7">
                    <h3 className="poppins_medium text_primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize">
                      Download our{" "}
                      <span className="text-black poppins_medium capitalize">
                        Mobile App
                      </span>
                    </h3>
                  </div>
                  <p className="poppins_regular text-xs text-center text-md-start text-[#767E94] mb-3 md:mb-7 capitalize">
                    Sed luctus nibh at consectetur tempor. Proin et ipsum
                    tincidunt, maximus turpis id, mollis lacus. Maecenas nec
                    risus a urna sollicitudin aliquet. Maecenas pretium
                    tristique sapien
                  </p>
                  <div className="flex justify-center md:justify-start gap-[1.145rem] mb-4 mb-md-0">
                    <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
                      <Image
                        alt="Play Store"
                        src={PlayStoreIcon}
                        className="h-[35px] w-[35px] object-contain"
                      />
                      <div className="flex flex-column">
                        <h5 className="color-0 poppins_regular text-[0.8rem]">
                          GET IT ON                        </h5>
                        <h4 className="poppins_medium text-[1.2rem] color-0">
                          Google Play
                        </h4>
                      </div>
                    </div>
                    <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
                      <Image
                        alt="Play Store"
                        src={AppStoreIcon}
                        className="h-[35px] w-[35px] object-contain"
                      />
                      <div className="flex flex-column">
                        <h5 className="color-0 poppins_regular text-[0.8rem]">
                          Download on the
                        </h5>
                        <h4 className="poppins_medium text-[1.2rem] color-0">
                          Apple Store
                        </h4>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </Col>
          <Col md="6">
            <motion.div variants={slideIn("up", "tween", 0.3, 0.8)}>
              <Image
                src={downloadApp}
                alt="Phones"
                className="max-h-[30rem] w-auto -auto h-full mb-3"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
