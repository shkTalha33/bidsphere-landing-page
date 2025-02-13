/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "reactstrap";
import { appstore, phones, playstore } from "../assets/icons/icon";
import Image from "next/image";

export default function DownloadSection() {
  return (
    <main className="pt-[1.81rem] pb-[2rem] md:pb-[3.81rem] bg-[#F3F3F9]">
      <Container>
        <Row>
          <Col md="6" className="flex items-center justify-center flex-col mt-2 mt-md-0">
            <div className="max-w-[30.375rem] flex justify-end items-center flex-col"
            >
              <h2 className="text-center plusJakara_bold text-[1.8rem] sm:text-[2.3rem]  md:text-[2.5rem] lg:text-[3.5rem]">
                Download our
                mobile app
              </h2>
              <p className="text-[#767E94] text-[0.8rem] mt-[0.5rem] md:mt-[1.9rem] mb-[1rem] md:mb-[1.47rem] leading-[1.5rem]">
                Sed luctus nibh at consectetur tempor. Proin et ipsum
                tincidunt, maximus turpis id, mollis lacus. Maecenas nec risus
                a urna sollicitudin aliquet. Maecenas pretium tristique sapien
              </p>
              <div className="flex gap-[1.145rem]">
                <Image src={appstore} alt="App Store" width={155} height={50} />
                <Image src={playstore} alt="Google Store" height={50} width={150} />
              </div>

            </div>
          </Col>
          <Col md="6">
            <div>

              <Image
                src={phones}
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
