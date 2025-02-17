import { googlePay, paypal, stripe } from "@/components/assets/icons/icon";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Form, Row, Label, Input } from "reactstrap";
import * as Yup from "yup";

// Payment method data
const paymentMethods = [
  { name: "googlePay", label: "Google Play", email: "aaronramsdale@gmail.com", icon: googlePay },
  { name: "stripe", label: "Stripe", email: "aaronramsdale@gmail.com", icon: stripe },
  { name: "paypal", label: "PayPal", email: "aaronramsdale@gmail.com", icon: paypal }
];

const PaymentMethod = ({ method, currentMethod, onClick }) => (
  <div
    className={`border ${currentMethod === method.name ? "border-[#5B0F001C] bg-[#E7FAF4]" : "border-[#E7FAF4]"} rounded-2xl p-3 flex gap-4 cursor-pointer items-center`}
    onClick={() => onClick(method.name)}
  >
    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${currentMethod === method.name ? "bg-white" : "bg-[#E7FAF4]"}`}>
      <Image src={method.icon} alt={method.label} className="w-6 h-6" />
    </div>
    <div>
      <h6 className="text-[#0D0D12] poppins_medium mb-1">{method.label}</h6>
      <p className="text-[#818898] text-sm mb-0">{method.email}</p>
    </div>
  </div>
);

const PaymentDetail = ({ setProgress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMethod, setCurrentMethod] = useState("");

  const schema = Yup.object().shape({
    // payment: Yup.string().required("Payment Method is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setProgress(100);
    console.log(data);
  };

  return (
    <Container className="bg_white rounded-[9px] mt-2 p-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-2 w-100"
      >
        <Row className="g-8">
          <Col md="6">
            <Label>Deposit Amount</Label>
            <Input placeholder="Enter deposit amount for selected auction" className="py-3 px-2 border-[1px] border-[#D8DADC] rounded-[7px]" />
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label className="form-label" for="payment">Payment Method</Label>
              <div className="flex flex-col gap-2">
                {paymentMethods.map((method) => (
                  <PaymentMethod 
                    key={method.name} 
                    method={method} 
                    currentMethod={currentMethod} 
                    onClick={setCurrentMethod} 
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Col md="6" className="text-end ml-auto">
          <button
            type="submit"
            className="bg_primary text-white px-6 py-3 rounded-lg w-[50%] poppins_semibold text-[22px]"
          >
            Confirm Payment
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PaymentDetail;
