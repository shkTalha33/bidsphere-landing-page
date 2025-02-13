'use client'
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Col, } from 'reactstrap';

const Paginations = ({ setLastId, count = 0, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(0)

    // ** Function to handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page.selected);
        setLastId(page.selected)
    }
    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
                <span className='align-middle'>
                    <ChevronLeft style={{ height: "1.3rem" }} />
                </span>
            </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
                <span className='align-middle'> <ChevronRight style={{ height: "1.3rem" }} /> </span>
            </Fragment>
        )
    }

    return (
        <React.Fragment>
            <Col xs={12} className="mt-4 pt-2">
                <ReactPaginate
                    previousLabel={<Previous size={20} />}
                    nextLabel={<Next size={15} />}
                    forcePage={currentPage}
                    onPageChange={page => handlePagination(page)}
                    pageCount={Math.ceil(count / 10)}
                    breakLabel={'...'}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    nextClassName={'page-item next d-none d-sm-block  pe-1'}
                    previousClassName={'page-item prev d-none d-sm-block ps-2'}
                    previousLinkClassName={'page-link '}
                    pageLinkClassName={'page-link'}
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName={`pagination pagination-sm react-paginate  d-flex justify-content-center pe-1 mt-1 ${isLoading && 'visually'}`}
                />
            </Col>
        </React.Fragment>
    );
}

export default Paginations;