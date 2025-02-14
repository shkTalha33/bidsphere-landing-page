import React from "react";
import { Col, Container, Row } from "reactstrap";
import SectionHeadings from "../common/sectionHeadings";
import AuctionCard from "../common/AuctionCard";
import { image1, image2, image3, image4, image5 } from "../assets/icons/icon";

export default function ForYou() {
  
  const items =[
    {image: image1, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image2, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image3, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image4, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image5, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image1, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image2, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image3, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image4, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
    {image: image5, time: "Time left 4d 20h (Sat, 02:39 PM)", product: "Skating Rink", price: "$9.00", bids: "3 bids"},
  ]

  return (
    <>
      <main className="pb-[5rem] bg_white">
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
            <Col md="12">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              {items.map((item, index) => {
                return(
                  <AuctionCard item={item} index={index} />
                )
              })}
            </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
