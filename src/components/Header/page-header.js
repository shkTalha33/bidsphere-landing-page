/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'

const PageHeader = ({ head, mainTitle = 'Product' }) => {
    return (
        <>
            <section className='bg-[#F6F6F6] border-t border-b border-[#E4E4E4] max-sm:hidden'>
                <Container fluid='sm' className='min-h-[100px] py-4 '>
                    <div className='flex justify-between gap-2 items-center'>
                        <div>
                            <div>
                                <Link className='text_primary' href={'/'}>Home/</Link><span className='text-[#ADADAD]'>{mainTitle}</span>
                            </div>
                            <h6 className='popins_medium text-2xl'>
                                {head}
                            </h6>
                        </div>
                        <div>
                            <img src='/assets/frame.svg' alt='frame' />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default PageHeader