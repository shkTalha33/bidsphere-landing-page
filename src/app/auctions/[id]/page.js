"use client";
import { ChevronRight, Clock, Heart } from "react-feather";
import { Col, Container, Row } from "reactstrap";
import {
  auctionImage,
  car1,
  car2,
  car3,
  car4,
  car5,
} from "@/components/assets/icons/icon";
import TopSection from "@/components/common/TopSection";
import AuctionItems from "@/components/auction/auctionItems";
import Image from "next/image";

export default function Page() {
  const bidders = [
    {
      id: 1,
      name: "Ronald Richards",
      bid: "$24.5k",
      avatar: "/api/placeholder/32/32",
      timeAgo: "2m",
    },
    {
      id: 2,
      name: "Cameron Williamson",
      bid: "$20k",
      avatar: "/api/placeholder/32/32",
      timeAgo: "1m",
    },
    {
      id: 3,
      name: "Guy Hawkins",
      bid: "$18k",
      avatar: "/api/placeholder/32/32",
      timeAgo: "2m",
    },
  ];
  const button = {
    icon: <Heart className="w-5 h-5 text-white" />,
    onClick: () => console.log("Heart clicked!"),
    className:
      "w-10 h-10 bg-black rounded-full flex items-center justify-center",
  };

  const priceOptions = ["$20k", "$21k", "$22k", "$23k"];

  return (
    <main className="bg_mainsecondary p-4">
      <TopSection
        title={"Good morning, Adnan"}
        description={"Here are your auctions whom you can join."}
        button={button}
      />

      <Container className="bg_mainsecondary rounded-[9px] mt-4 px-0">
        <Row className="g-2">
          {/* First Column */}
          <Col md="4" className="h-full flex flex-col">
            <div className="bg_white rounded-[10px] mb-2 flex-grow">
              <Image
                src={car1}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
              />
            </div>
            <div className="flex gap-2 flex-grow">
              <div className="flex-1">
                <Image
                  src={car4}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Image
                  src={car2}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
                <Image
                  src={car3}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
              </div>
            </div>
          </Col>

          {/* Second Column */}
          <Col md="3" className="h-full flex">
            <div className="bg_white rounded-[10px] w-full flex-grow">
              <Image
                src={car5}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
              />
            </div>
          </Col>

          {/* Third Column */}
          <Col md="5" className="bg_white h-full">
            <div className="bg_primary pt-2 py-16 px-6 rounded-xl relative">
              <div className="flex items-start justify-between">
                <div>
                <p className="poppins_medium text-2xl text-white mb-0">Fortuner new model car</p>
                <p className="poppins_regular text-sm text-white mb-0">classic car auction</p>
                </div>
                <div>
                  <ChevronRight className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="w-[90%] mx-auto">
              <Row className="py-4">
                <Col md="6" >
                  
                </Col>
                <hr />
                <Col md="6"></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
