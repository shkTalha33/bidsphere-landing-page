import Image from "next/image";
import { Col } from "reactstrap";

export default function PlansCard({ plan, index, mdVal = "6", lgVal = "4" }) {
  return (
    <Col className="flex flex-col items-center bg-white py-[4rem] px-6 h-full rounded-[15px] shadow-[0px_3px_45px_0px_rgba(0,0,0,0.09)]">

      {/* Icon Container */}
      <div className="flex justify-center items-center">
        <Image src={plan.icon} alt="Plan Icon" width={80} height={80} />
      </div>
      {/* Text Content */}
      <div className="m-auto max-w-[18rem] text-center">
        <h6 className="font-bold text-[1rem] md:text-[1.20rem] text-[#2F3932] capitalize my-7">
          {plan?.title || "Default Title"}
        </h6>
        <p className="mb-0 text-[#828282] text-[0.75rem]">
          {plan?.description || "Default description"}
        </p>
      </div>
    </Col>
  );
}
