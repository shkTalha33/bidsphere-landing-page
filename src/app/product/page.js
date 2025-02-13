/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axiosInstance from '@/components/api/axiosInstance'
import AllFilterPages from '@/components/common/Filter/AllFilterPages'
import ProductCard from '@/components/common/product-card'
import { ProductCardSkeleton } from '@/components/common/productCardSkeleton'
import PageHeader from '@/components/Header/page-header'
import { useGetQuery } from '@/components/redux/apiSlice2'
import debounce from 'debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { Filter } from 'react-feather'
import { CiSearch } from 'react-icons/ci'
import { RxCrossCircled } from 'react-icons/rx'
import { Input } from 'reactstrap'
import Loading from '../loading'
import useFetchProductsAndFilters from '@/components/common/Filter/useFetchProductsAndFilters'

const ProductPage = () => {
    const [searchData, setSearchData] = useState('');
    const searcParams = useSearchParams()
    const router = useRouter()
    // const [products, setProducts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingFilter, setIsLoadingFilter] = useState(true);
    // const [filterData, setFilterData] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const params = new URLSearchParams(searcParams)

    const searchQuery = params.get('query') || ''
    const category = params.get('category') || ''
    const mainCat = params.get('mainCat') || ''
    const subCat = params.get('subCat') || ''
    const brand = params.get('brand') || ''
    const gender = params.get('gender') || ''
    const maxPrice = params.get('maxPrice') || ''
    const minPrice = params.get('minPrice') || ''
    const title = params.get('title') || ''
    const compId = params.get('compId') || ''
    const prod_id = params.get('prod_id') ? JSON.parse(params.get('prod_id')) : [] || []

    const filterQuery = useMemo(() => {
        return {
            category: category ? [category] : [],
            brand: brand ? [brand] : [],
            subCategoryL1: mainCat ? [mainCat] : [],
            subCategoryL2: subCat ? [subCat] : [],
            minPrice: Number(minPrice) || 0,
            maxPrice: Number(maxPrice) || 0,
            search_query: searchQuery || '',
            gender: gender ? [gender] : [],
            product_ids: prod_id ? prod_id : []
        };
    }, [category, mainCat, gender, searchQuery, subCat, brand, maxPrice, minPrice]);
    const handleSearch = (term) => {
        const params = new URLSearchParams(searcParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        router.push(`/product?${params.toString()}`)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch(searchData)
    }

    const { products, filterData, isLoading, } = useFetchProductsAndFilters(filterQuery, searchQuery);

    useEffect(() => {
        if (searchQuery) {
            setSearchData(searchQuery);
        }
    }, [searchQuery]);
    return (
        <section style={{ minHeight: 'calc(100vh - 200px)' }}>
            <PageHeader head={title ? title : 'Products'} />
            <Container fluid='xxl'>
                <section className=' sm:mt-6 pt-3'>
                    <div className='w-100 text-[#BFBFBF] max-w-[640px] mb-3 relative custom-form mx-auto sm:hidden'>
                        <form onSubmit={handleSubmit}>
                            <Input value={searchData} onChange={(e) => {
                                setSearchData(e.target.value)
                                if (!e.target.value) {
                                    handleSearch()
                                }
                            }} className='search-nav' placeholder='Search Search all products ' />
                            {searchData && <button type='button' onClick={() => {
                                setSearchData('')
                                handleSearch()
                            }} className='absolute left-auto top-0 bottom-0 right-9 flex place-items-center'><RxCrossCircled size={15} /> </button>}
                            <button type='submit' className='absolute left-auto top-0 bottom-0 right-4 flex place-items-center'><CiSearch size={18} /> </button>
                        </form>
                    </div>
                    <div
                        onClick={handleShow}
                        style={{ cursor: "pointer" }}
                        className="mb-3  d-lg-none d-flex align-items-center justify-content-end"
                    >
                        <Filter /> Filter
                    </div>
                    <Row>
                        <Col
                            sm="4"
                            xl='3'
                            lg="3"
                            className="collection-filter d-lg-block d-none"
                        >
                            <AllFilterPages filterData={filterData} />
                        </Col>
                        <Col
                            sm="12"
                            lg="9"
                            xl='9'
                            className=""
                        >
                            <div className="grid xl:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-3 max-[500px]:grid-cols-2">
                                {isLoading.products ? (
                                    Array.from({ length: 8 }).map((_, index) => (
                                        <Fragment key={index}>
                                            <ProductCardSkeleton />
                                        </Fragment>
                                    ))
                                ) : products?.length > 0 ? <>
                                    {(
                                        products.map((item, index) => (
                                            <Fragment key={index}>
                                                <ProductCard data={item} />
                                            </Fragment>
                                        ))
                                    )}
                                </> : (
                                    <div className="col-span-full my-5 text-center popins_regular text-gray-500">
                                        Products not found
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
            <Offcanvas show={show} style={{ maxWidth: '250px' }} onHide={handleClose}>
                <Offcanvas.Header className='pb-0' closeButton>
                    <Offcanvas.Title className='max-sm:text-base'> Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='pt-1'>
                    <AllFilterPages filterData={filterData} />
                </Offcanvas.Body>
            </Offcanvas>
        </section>
    )
}


const Page = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ProductPage />
            </Suspense>
        </>
    )
}

export default Page