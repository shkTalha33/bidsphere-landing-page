/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "reactstrap";
import {
  appleStore,
  appstore,
  downloadApp,
  googlePlay,
  phones,
  playstore,
} from "../assets/icons/icon";
import Image from "next/image";

export default function DownloadSection() {
  return (
    <main className="pt-[1.81rem] pb-[2rem] md:pb-[3.81rem] bg-[#F3F3F9]">
      <Container>
        <Row>
          <Col md="6">
            <Row className="items-center justify-center h-full">
              <Col md="9" className="mx-auto">
                <div className="flex gap-3 justify-start items-center  mb-[10px]">
                  <div className="w-8 h-2 bg_primary rounded-full"></div>
                  <h6 className="text-[#202020] poppins_semibold text-xl capitalize">
                    enjoy our application
                  </h6>
                </div>
                <div className="my-7">
                  <h3 className="poppins_medium text_primary text-6xl capitalize">
                    Download our{" "}
                    <span className="text-black poppins_medium capitalize">
                      Mobile App
                    </span>
                  </h3>
                </div>
                <p className="poppins_regular text-xs text-[#767E94] mb-7 capitalize">
                  Sed luctus nibh at consectetur tempor. Proin et ipsum
                  tincidunt, maximus turpis id, mollis lacus. Maecenas nec risus
                  a urna sollicitudin aliquet. Maecenas pretium tristique sapien
                </p>
                <div className="flex gap-[1.145rem]">
                  <Image
                    src={googlePlay}
                    alt="Google Store"
                    width={175}
                    height={50}
                  />
                  <Image
                    src={appleStore}
                    alt="Apple Store"
                    height={50}
                    width={175}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div>
              <Image
                src={downloadApp}
                alt="Phones"
                className="max-h-[30rem] w-auto -auto h-full mb-3"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
