import { googlePay, paypal, stripe } from "@/components/assets/icons/icon";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Form, Row, Label } from "reactstrap"; // You can use Spinner from 'reactstrap' if you want, or create a custom one.
import * as Yup from "yup";


const PaymentDetail = ({ setProgress }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Separate states for each file upload section
  const [currentMethod, setCurrentMethod] = useState("");

  const schema = Yup.object().shape({
    payment: Yup.string().required("Payment Method is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setProgress(parseInt(100));
    console.log(data);
  };

  return (
    <Container className="bg_white rounded-[9px] mt-2 p-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-2 w-100"
      >
        <Row>
          <Col md="12" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label className="form-label" for="payment">
                Payment Method
              </Label>
              <div className="flex flex-col gap-2">
                <div
                  className={`border ${
                    currentMethod === "googlePay"
                      ? "border-[#5B0F001C] border-1 bg-[#EDE5E3]"
                      : "border-[#ECEFF3]"
                  } rounded-2xl p-3 flex gap-4 cursor-pointer items-center`}
                  onClick={() => setCurrentMethod("googlePay")}
                >
                  <div className="flex items-center justify-center bg_secondary h-12 w-12 rounded-full">
                    <Image src={googlePay} alt="google pay" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h6 className="text-[#0D0D12] poppins_medium mb-1">
                      Google Play
                    </h6>
                    <p className="text-[#818898] text-sm mb-0">
                      aaronramsdale@gmail.com
                    </p>
                  </div>
                </div>
                <div
                  className={`border ${
                    currentMethod === "stripe"
                      ? "border-[#5B0F001C] border-1 bg-[#EDE5E3]"
                      : "border-[#ECEFF3]"
                  } rounded-2xl p-3 flex gap-4 cursor-pointer items-center`}
                  onClick={() => setCurrentMethod("stripe")}
                >
                  <div className="flex items-center justify-center bg_secondary h-12 w-12 rounded-full">
                    <Image src={stripe} alt="stripe" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h6 className="text-[#0D0D12] poppins_medium mb-1">
                      Google Play
                    </h6>
                    <p className="text-[#818898] text-sm mb-0">
                      aaronramsdale@gmail.com
                    </p>
                  </div>
                </div>
                <div
                  className={`border ${
                    currentMethod === "paypal"
                      ? "border-[#5B0F001C] border-1 bg-[#EDE5E3]"
                      : "border-[#ECEFF3]"
                  } rounded-2xl p-3 flex gap-4 cursor-pointer items-center`}
                  onClick={() => setCurrentMethod("paypal")}
                >
                  <div className="flex items-center justify-center bg_secondary h-12 w-12 rounded-full">
                    <Image src={paypal} alt="paypal" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h6 className="text-[#0D0D12] poppins_medium mb-1">
                      Google Play
                    </h6>
                    <p className="text-[#818898] text-sm mb-0">
                      aaronramsdale@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Col md="6" className="text-end ml-auto">
          <button
            type="submit"
            className="bg_primary text-white px-6 py-3 rounded-lg w-[50%] poppins_semibold text-[22px]"
          >
            Continue
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PaymentDetail;
