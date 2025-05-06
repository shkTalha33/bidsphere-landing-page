import { useSelector } from "react-redux";
import RegistrationReviewPage from "@/components/common/RegistrationReviewPage";

const ReviewAndSubmit = ({ progress }) => {
  const data = useSelector(
    (state) => state.auctionRegistration.auctionRegistrationData
  );

  return (
    <RegistrationReviewPage
      data={data}
      pageType="registration"
      progress={progress}
    />
  );
};

export default ReviewAndSubmit;
