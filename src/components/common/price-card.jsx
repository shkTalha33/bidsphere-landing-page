import { FaCheck } from "react-icons/fa";
import { Card, CardBody, Button } from "reactstrap";

const PricingCard = ({ title, price, description, features, isPopular = false, ctaText = "Get Started" }) => {
  
  return (
    <div className="w-full md:w-1/3 p-4 transform transition-transform duration-300 hover:-translate-y-2">
      <Card className={`relative rounded-2xl shadow-md overflow-hidden ${isPopular ? 'border-2 border-purple-500 bg-purple-50' : 'border border-gray-200 bg-white'}`}>
        {isPopular && (
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            Most Popular
          </div>
        )}
        <CardBody className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <div className="flex items-baseline text-3xl font-bold text-gray-900">
            {price}
            <span className="text-gray-500 text-sm ml-1">/month</span>
          </div>
          <p className="text-gray-600 my-4 leading-relaxed">{description}</p>
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FaCheck className={`w-5 h-5 ${feature?.included ? 'text-purple-500' : 'text-gray-300'}`} />
                <span className={`text-sm font-medium ${feature?.included ? 'text-gray-900' : 'text-gray-400'}`}>{feature?.text}</span>
              </li>
            ))}
          </ul>
          <Button 
            color={isPopular ? "primary" : "outline-primary"} 
            className={`w-full py-2.5 rounded-lg text-lg font-semibold transition-all duration-200 ${isPopular ? 'bg-purple-500 text-white' : 'border-purple-500 text-purple-500 hover:bg-purple-100'}`} 
            // href={`/auth/register?plan=${title}`}
            
          >
            {ctaText}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PricingCard;
