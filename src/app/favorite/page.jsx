"use client"

import { auctionImage } from '@/components/assets/icons/icon';
import AuctionItems from '@/components/auction/auctionItems';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';

export default function Page() {
    const auctionItems = [
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
        { title: "Demon Blast", price: "200.000", image: auctionImage },
    ];

    return (
        <main className='bg_mainsecondary p-4'>
            <div className="container">
                <div className="bg_white rounded-[9px] mt-20 mb-4 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
                    <Row>
                        <Col md="12" className="">
                            <Breadcrumbs pageTitle={"Favourite"} />
                            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
                                Favourite Auctions
                            </h3>
                        </Col>
                    </Row>
                </div>
                <AuctionItems items={auctionItems} />
            </div>
        </main>
    )
}