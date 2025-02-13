import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'
import { Progress } from 'reactstrap'

const ReviewsProgress = () => {
    const ratings = [
        { stars: 5, percentage: 45, count: 4015 },
        { stars: 4, percentage: 5, count: 419 },
        { stars: 3, percentage: 4, count: 384 },
        { stars: 2, percentage: 4, count: 359 },
        { stars: 1, percentage: 42, count: 3733 },
    ];
    return (
        <>
            <Row className='py-[30px] mb-3  sm:px-[1.5rem] max-sm:px-[.7rem] bg_primary rounded text-white min-h-[#297px]'>
                <Col sm={4} xs={6} className='flex flex-col justify-center'>
                    <h1 className='md:text-4xl text-3xl  '>4.7<span>/</span><span className=' md:text-2xl text-xl'>5</span> </h1>
                    <p className='mt-2 max-sm:text-xs'>Based on 134 Reviews</p>
                    <div className='mt-2 flex gap-[4px] me-1 text-[#B89BFC]'><FaStar size={35} /> <FaStar size={35} /> <FaStar size={35} /> <FaStar size={35} /> <FaStar className='text-[#E3E1E7]' size={35} /></div>
                </Col>
                <Col sm={8} xs={6}>
                    <div className="rating-breakdown flex flex-col gap-3">
                        {ratings.map((rating) => (
                            <div key={rating.stars} className="rating-row flex items-center gap-2">
                                <span className=" popins_regular max-sm:text-xs whitespace-nowrap">{rating.stars} stars</span>
                                <Progress
                                    value={rating.percentage}
                                    className="rating-bar w-100"
                                />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ReviewsProgress